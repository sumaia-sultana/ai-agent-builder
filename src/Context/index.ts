import { createContext, useContext } from 'react'
import type { AgentData, SavedAgent } from '../types/agentData'

export interface AgentContextValue {
  data: AgentData | null
  loading: boolean
  error: string | null
  sessionTime: number
  selectedProfile: string
  selectedSkills: string[]
  selectedLayers: string[]
  selectedProvider: string
  agentName: string
  savedAgents: SavedAgent[]
  setSelectedProfile: (value: string) => void
  setSelectedProvider: (value: string) => void
  setSelectedSkills: (skills: string[]) => void
  setSelectedLayers: (layers: string[]) => void
  setAgentName: (name: string) => void
  setSavedAgents: React.Dispatch<React.SetStateAction<SavedAgent[]>>
  fetchAPI: () => Promise<void>
  handleLayerSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleSkillSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleSaveAgent: () => void
  handleLoadAgent: (agent: SavedAgent) => void
  handleDeleteAgent: (indexToRemove: number) => void
  clearSavedAgents: () => void
}

const AgentContext = createContext<AgentContextValue | undefined>(undefined)

const useAgent = () => {
  const context = useContext(AgentContext)

  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider')
  }

  return context
}

export { AgentContext, useAgent }
