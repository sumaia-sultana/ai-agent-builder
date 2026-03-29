import { createContext, useContext } from 'react'
import type { AgentData, SavedAgent } from '../types/agentData'

export interface AgentContextValue {
  data: AgentData | null
  loading: boolean
  error: string | null
  selectedProfile: string
  selectedSkills: string[]
  selectedLayers: string[]
  selectedProvider: string
  agentName: string
  savedAgents: SavedAgent[]
  setSelectedProfile: React.Dispatch<React.SetStateAction<string>>
  setSelectedProvider: React.Dispatch<React.SetStateAction<string>>
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>
  setSelectedLayers: React.Dispatch<React.SetStateAction<string[]>>
  setAgentName: React.Dispatch<React.SetStateAction<string>>
  setSavedAgents: React.Dispatch<React.SetStateAction<SavedAgent[]>>
  fetchAPI: () => Promise<void>
  handleSaveAgent: () => void
  handleLoadAgent: (agent: SavedAgent) => void
  handleDeleteAgent: (agentId: string) => void
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
