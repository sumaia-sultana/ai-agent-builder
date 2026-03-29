import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgentContext } from '../Context'
import type { AgentData, SavedAgent } from '../types/agentData'

interface AgentProviderProps {
  children: React.ReactNode
}

export default function AgentProvider({ children }: AgentProviderProps) {
  const [data, setData] = useState<AgentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedProfile, setSelectedProfile] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLayers, setSelectedLayers] = useState<string[]>([])
  const [selectedProvider, setSelectedProvider] = useState('')

  const [agentName, setAgentName] = useState('')
  const [savedAgents, setSavedAgents] = useState<SavedAgent[]>([])
  const latestAgentNameRef = useRef('')

  useEffect(() => {
    const saved = localStorage.getItem('savedAgents')

    if (!saved) return

    try {
      const parsed = JSON.parse(saved) as Array<Partial<SavedAgent>>
      const normalized = parsed.map((agent, index) => ({
        id: agent.id || `legacy-${Date.now()}-${index}`,
        name: agent.name || 'Untitled Agent',
        profileId: agent.profileId || '',
        skillIds: agent.skillIds || [],
        layerIds: agent.layerIds || [],
        provider: agent.provider || '',
      }))

      setSavedAgents(normalized)
    } catch (e) {
      console.error('Failed to parse saved agents', e)
    }
  }, [])

  const persistSavedAgents = useCallback((agents: SavedAgent[]) => {
    setSavedAgents(agents)
    localStorage.setItem('savedAgents', JSON.stringify(agents))
  }, [])

  useEffect(() => {
    latestAgentNameRef.current = agentName
  }, [agentName])

  useEffect(() => {
    const analyticsInterval = setInterval(() => {
      if (latestAgentNameRef.current !== '') {
        console.log(`[Analytics Heartbeat] User is working on agent named: "${latestAgentNameRef.current}"`)
      } else {
        console.log('[Analytics Heartbeat] User is working on an unnamed agent draft...')
      }
    }, 8000)

    return () => clearInterval(analyticsInterval)
  }, [])

  const fetchAPI = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/data.json')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const jsonData: AgentData = await response.json()
      setData(jsonData)
    } catch (err: unknown) {
      console.error('Error fetching data:', err)

      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to fetch agent data')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAPI()
  }, [fetchAPI])

  const handleSaveAgent = useCallback(() => {
    const missingFields: string[] = []

    if (!agentName.trim()) missingFields.push('Agent Name')
    if (!selectedProfile) missingFields.push('Base Profile')
    if (!selectedProvider) missingFields.push('AI Provider')
    if (selectedSkills.length === 0) missingFields.push('at least one Skill')
    if (selectedLayers.length === 0) missingFields.push('at least one Personality Layer')

    if (missingFields.length > 0) {
      alert(`Please complete: ${missingFields.join(', ')}`)
      return
    }

    const newAgent: SavedAgent = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      name: agentName,
      profileId: selectedProfile,
      skillIds: selectedSkills,
      layerIds: selectedLayers,
      provider: selectedProvider,
    }

    const updatedAgents = [...savedAgents, newAgent]
    persistSavedAgents(updatedAgents)
    setAgentName('')
    alert(`Agent "${newAgent.name}" saved successfully!`)
  }, [agentName, persistSavedAgents, savedAgents, selectedLayers, selectedProfile, selectedProvider, selectedSkills])

  const handleLoadAgent = useCallback((agent: SavedAgent) => {
    setSelectedProfile(agent.profileId || '')
    setSelectedSkills(agent.skillIds || [])
    setSelectedLayers([...(agent.layerIds || [])])
    setAgentName(agent.name)
    setSelectedProvider(agent.provider || '')
  }, [])

  const handleDeleteAgent = useCallback(
    (agentId: string) => {
      const updatedAgents = savedAgents.filter((agent) => agent.id !== agentId)
      persistSavedAgents(updatedAgents)
    },
    [persistSavedAgents, savedAgents],
  )

  const clearSavedAgents = useCallback(() => {
    persistSavedAgents([])
  }, [persistSavedAgents])

  const value = useMemo(
    () => ({
      data,
      loading,
      error,
      selectedProfile,
      selectedSkills,
      selectedLayers,
      selectedProvider,
      agentName,
      savedAgents,
      setSelectedProfile,
      setSelectedProvider,
      setSelectedSkills,
      setSelectedLayers,
      setAgentName,
      setSavedAgents,
      fetchAPI,
      handleSaveAgent,
      handleLoadAgent,
      handleDeleteAgent,
      clearSavedAgents,
    }),
    [
      agentName,
      clearSavedAgents,
      data,
      error,
      fetchAPI,
      handleDeleteAgent,
      handleLoadAgent,
      handleSaveAgent,
      loading,
      savedAgents,
      selectedLayers,
      selectedProfile,
      selectedProvider,
      selectedSkills,
    ],
  )

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
}
