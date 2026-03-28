import { Save, X } from 'lucide-react'
import { useAgent } from '../Context'

export default function Preview() {
  const {
    data,
    selectedProfile,
    selectedSkills,
    selectedLayers,
    selectedProvider,
    agentName,
    setSelectedSkills,
    setSelectedLayers,
    setAgentName,
    handleSaveAgent,
  } = useAgent()

  return (
    <section className="fade-in-up lg:col-span-7 flex flex-col gap-6">
      <div className="panel-card flex h-full flex-col overflow-hidden rounded-2xl">
        <div className="panel-header px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">Current Agent Configuration</h2>
        </div>

        <div className="p-6 flex-1 flex flex-col gap-8">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">Profile</h3>
            {selectedProfile && data ? (
              <div className="rounded-lg border border-teal-100 bg-teal-50 p-4">
                <p className="font-semibold text-teal-900">
                  {data.agentProfiles.find((p) => p.id === selectedProfile)?.name}
                </p>
                <p className="mt-1 text-sm text-teal-700">
                  {data.agentProfiles.find((p) => p.id === selectedProfile)?.description}
                </p>
              </div>
            ) : (
              <p className="text-sm italic text-slate-500">No profile selected.</p>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">Skills</h3>
            {selectedSkills.length > 0 && data ? (
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skillId) => {
                  const skill = data.skills.find((s) => s.id === skillId)

                  return (
                    <span
                      key={skillId}
                      className="soft-tag inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium"
                    >
                      {skill?.name}
                      <button
                        onClick={() => setSelectedSkills(selectedSkills.filter((id) => id !== skillId))}
                        className="text-teal-400 hover:text-teal-600 focus:outline-none"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm italic text-slate-500">No skills added.</p>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">Personality Layers</h3>
            {selectedLayers.length > 0 && data ? (
              <div className="flex flex-wrap gap-2">
                {selectedLayers.map((layerId) => {
                  const layer = data.layers.find((l) => l.id === layerId)

                  return (
                    <span
                      key={layerId}
                      className="warm-tag inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium"
                    >
                      {layer?.name}
                      <button
                        onClick={() => setSelectedLayers(selectedLayers.filter((id) => id !== layerId))}
                        className="text-orange-400 hover:text-orange-600 focus:outline-none"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm italic text-slate-500">No layers added.</p>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">Provider</h3>
            {selectedProvider ? (
              <span className="inline-flex items-center rounded-md border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-800">
                {selectedProvider}
              </span>
            ) : (
              <p className="text-sm italic text-slate-500">No provider selected.</p>
            )}
          </div>

          <div className="mt-auto border-t border-slate-200 pt-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Save This Agent</h3>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Enter agent name..."
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="input-elevated block w-full rounded-lg p-2.5 text-sm"
              />
              <button
                onClick={handleSaveAgent}
                className="cta-btn inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
              >
                <Save className="w-4 h-4" />
                Save Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
