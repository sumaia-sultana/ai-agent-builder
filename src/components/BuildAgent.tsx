import { RefreshCw, User, Zap, Layers, Cpu, AlertCircle } from 'lucide-react'
import { useAgent } from '../Context'

export default function BuildAgent() {
  const {
    data,
    loading,
    error,
    selectedProfile,
    selectedProvider,
    handleLayerSelect,
    handleSkillSelect,
    setSelectedProfile,
    setSelectedProvider,
    fetchAPI,
  } = useAgent()

  return (
    <section className="fade-in-up lg:col-span-5 flex flex-col gap-6">
      <div className="panel-card overflow-hidden rounded-2xl">
        <div className="panel-header px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">Configuration Options</h2>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {loading && !data && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <RefreshCw className="mb-4 h-8 w-8 animate-spin text-teal-600" />
              <p>Loading configuration data...</p>
            </div>
          )}

          {!data && !loading && !error && (
            <p className="py-8 text-center text-slate-500">No data loaded.</p>
          )}

          {data && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="profile-select"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  Base Profile
                </label>
                <select
                  id="profile-select"
                  value={selectedProfile}
                  onChange={(e) => {
                    setSelectedProfile(e.target.value)
                    fetchAPI()
                  }}
                  className="select-elevated block w-full rounded-lg p-2.5 text-sm"
                >
                  <option value="">-- Select a Profile --</option>
                  {data.agentProfiles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="skill-select"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <Zap className="h-4 w-4 text-slate-400" />
                  Add Skill
                </label>
                <select
                  id="skill-select"
                  onChange={handleSkillSelect}
                  value=""
                  className="select-elevated block w-full rounded-lg p-2.5 text-sm"
                >
                  <option value="" disabled>
                    -- Select a Skill to Add --
                  </option>
                  {data.skills.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="layer-select"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <Layers className="h-4 w-4 text-slate-400" />
                  Add Personality Layer
                </label>
                <select
                  id="layer-select"
                  onChange={handleLayerSelect}
                  value=""
                  className="select-elevated block w-full rounded-lg p-2.5 text-sm"
                >
                  <option value="" disabled>
                    -- Select a Layer to Add --
                  </option>
                  {data.layers.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="provider-select"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <Cpu className="h-4 w-4 text-slate-400" />
                  AI Provider
                </label>
                <select
                  id="provider-select"
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="select-elevated block w-full rounded-lg p-2.5 text-sm"
                >
                  <option value="">-- Select an AI Provider --</option>
                  {['Gemini', 'ChatGPT', 'Kimi', 'Claude', 'DeepSeek'].map((provider) => (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
