import { useCallback, useMemo } from 'react'
import { User, Zap, Layers, Trash2, FolderOpen } from 'lucide-react'
import { useAgent } from '../Context'

export default function SaveAgent() {
  const { savedAgents, data, handleLoadAgent, handleDeleteAgent, clearSavedAgents } = useAgent()
  const profileById = useMemo(
    () => new Map((data?.agentProfiles || []).map((profile) => [profile.id, profile])),
    [data?.agentProfiles],
  )

  const handleClearAll = useCallback(() => {
    if (confirm('Are you sure you want to clear all saved agents?')) {
      clearSavedAgents()
    }
  }, [clearSavedAgents])

  return (
    <section className="panel-card fade-in-up overflow-hidden rounded-2xl">
      <div className="panel-header flex items-center justify-between gap-3 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">Saved Agents</h2>
        <button
          onClick={handleClearAll}
          className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedAgents.map((agent) => (
            <div
              key={agent.id}
              className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="truncate pr-2 text-lg font-bold text-slate-900">{agent.name}</h3>
                  {agent.provider && (
                    <span className="inline-flex shrink-0 items-center rounded px-2 py-0.5 text-xs font-semibold text-cyan-800 bg-cyan-100">
                      {agent.provider}
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="truncate">
                      {profileById.get(agent.profileId)?.name || 'No Profile'}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-slate-400" />
                    <span>{agent.skillIds?.length || 0} Skills</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-slate-400" />
                    <span>{agent.layerIds?.length || 0} Layers</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 border-t border-slate-200 bg-slate-50 px-5 py-3">
                <button
                  onClick={() => handleLoadAgent(agent)}
                  className="subtle-btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <FolderOpen className="w-4 h-4" />
                  Load
                </button>
                <button
                  onClick={() => handleDeleteAgent(agent.id)}
                  className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                  title="Delete Agent"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
