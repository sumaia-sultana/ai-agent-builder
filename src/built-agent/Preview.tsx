import { useCallback, useMemo } from 'react'
import { Save } from 'lucide-react'
import { useAgent } from '../Context'
import LayerOption from './LayerOption'
import ProfileOption from './ProfileOption'
import ProviderOption from './ProviderOption'
import SkillOption from './SkillOption'

const PROVIDERS = ['Gemini', 'ChatGPT', 'Kimi', 'Claude', 'DeepSeek']
const NOOP = () => undefined

export default function Preview() {
  const {
    data,
    selectedProfile,
    selectedSkills,
    selectedLayers,
    selectedProvider,
    agentName,
    setSelectedProfile,
    setSelectedProvider,
    setSelectedSkills,
    setSelectedLayers,
    setAgentName,
    handleSaveAgent,
  } = useAgent()

  const providers = useMemo(() => PROVIDERS, [])

  const clearProfile = useCallback(() => {
    setSelectedProfile('')
  }, [setSelectedProfile])

  const clearProvider = useCallback(() => {
    setSelectedProvider('')
  }, [setSelectedProvider])

  const removeSkill = useCallback((skillId: string) => {
    setSelectedSkills((prev) => prev.filter((existingId) => existingId !== skillId))
  }, [setSelectedSkills])

  const removeLayer = useCallback((layerId: string) => {
    setSelectedLayers((prev) => prev.filter((existingId) => existingId !== layerId))
  }, [setSelectedLayers])

  return (
    <section className="fade-in-up lg:col-span-7 flex flex-col gap-6">
      <div className="panel-card flex h-full flex-col overflow-hidden rounded-2xl">
        <div className="panel-header px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">Current Agent Configuration</h2>
        </div>

        <div className="p-6 flex-1 flex flex-col gap-6">
          {data && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ProfileOption
                  variant="target"
                  profiles={data.agentProfiles}
                  selectedProfile={selectedProfile}
                  onSelectProfile={clearProfile}
                />
                <ProviderOption
                  variant="target"
                  providers={providers}
                  selectedProvider={selectedProvider}
                  onSelectProvider={clearProvider}
                />
              </div>

              <SkillOption
                variant="target"
                skills={data.skills}
                selectedSkills={selectedSkills}
                onAddSkill={NOOP}
                onRemoveSkill={removeSkill}
              />

              <LayerOption
                variant="target"
                layers={data.layers}
                selectedLayers={selectedLayers}
                onAddLayer={NOOP}
                onRemoveLayer={removeLayer}
              />
            </div>
          )}

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
