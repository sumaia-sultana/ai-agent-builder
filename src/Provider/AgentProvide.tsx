import { useEffect, useState } from 'react'
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

  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('savedAgents')

    if (saved) {
      try {
        setSavedAgents(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse saved agents', e)
      }
    }
  }, [])

  useEffect(() => {
    const analyticsInterval = setInterval(() => {
      if (agentName !== '') {
        console.log(`[Analytics Heartbeat] User is working on agent named: "${agentName}"`)
      } else {
        console.log('[Analytics Heartbeat] User is working on an unnamed agent draft...')
      }
    }, 8000)

    return () => clearInterval(analyticsInterval)
  }, [agentName])

  const fetchAPI = async () => {
    setLoading(true)
    setError(null)

    try {
      const delay = Math.floor(Math.random() * 2000) + 1000
      await new Promise((resolve) => setTimeout(resolve, delay))

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
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  const handleLayerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const layerId = e.target.value

    if (layerId && !selectedLayers.includes(layerId)) {
      setSelectedLayers((prev) => [...prev, layerId])
    }

    e.target.value = ''
    fetchAPI()
  }

  const handleSkillSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skillId = e.target.value

    if (skillId && !selectedSkills.includes(skillId)) {
      setSelectedSkills((prev) => [...prev, skillId])
    }

    e.target.value = ''
    fetchAPI()
  }

  const handleSaveAgent = () => {
    if (!agentName.trim()) {
      alert('Please enter a name for your agent.')
      return
    }

    const newAgent: SavedAgent = {
      name: agentName,
      profileId: selectedProfile,
      skillIds: selectedSkills,
      layerIds: selectedLayers,
      provider: selectedProvider,
    }

    const updatedAgents = [...savedAgents, newAgent]
    setSavedAgents(updatedAgents)
    localStorage.setItem('savedAgents', JSON.stringify(updatedAgents))
    setAgentName('')
    alert(`Agent "${newAgent.name}" saved successfully!`)
  }

  const handleLoadAgent = (agent: SavedAgent) => {
    setSelectedProfile(agent.profileId || '')
    setSelectedSkills(agent.skillIds || [])
    setSelectedLayers([...(agent.layerIds || [])])
    setAgentName(agent.name)
    setSelectedProvider(agent.provider || '')
  }

  const handleDeleteAgent = (indexToRemove: number) => {
    const updatedAgents = savedAgents.filter((_, index) => index !== indexToRemove)
    setSavedAgents(updatedAgents)
    localStorage.setItem('savedAgents', JSON.stringify(updatedAgents))
  }

  const clearSavedAgents = () => {
    setSavedAgents([])
    localStorage.removeItem('savedAgents')
  }

  const value = {
    data,
    loading,
    error,
    sessionTime,
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
    handleLayerSelect,
    handleSkillSelect,
    handleSaveAgent,
    handleLoadAgent,
    handleDeleteAgent,
    clearSavedAgents,
  }

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
}
