import { useCallback, useMemo } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { useAgent } from '../Context'
import LayerOption from './LayerOption'
import ProviderOption from './ProviderOption'
import ProfileOption from './ProfileOption'
import SkillOption from './SkillOption'

const PROVIDERS = ['Gemini', 'ChatGPT', 'Kimi', 'Claude', 'DeepSeek']

export default function BuildAgent() {
  const {
    data,
    loading,
    error,
    selectedProfile,
    selectedSkills,
    selectedLayers,
    selectedProvider,
    setSelectedProfile,
    setSelectedSkills,
    setSelectedLayers,
    setSelectedProvider,
  } = useAgent()

  const providers = useMemo(() => PROVIDERS, [])

  const addSkill = useCallback((skillId: string) => {
    setSelectedSkills((prev) => (prev.includes(skillId) ? prev : [...prev, skillId]))
  }, [setSelectedSkills])

  const removeSkill = useCallback((skillId: string) => {
    setSelectedSkills((prev) => prev.filter((existingId) => existingId !== skillId))
  }, [setSelectedSkills])

  const addLayer = useCallback((layerId: string) => {
    setSelectedLayers((prev) => (prev.includes(layerId) ? prev : [...prev, layerId]))
  }, [setSelectedLayers])

  const removeLayer = useCallback((layerId: string) => {
    setSelectedLayers((prev) => prev.filter((existingId) => existingId !== layerId))
  }, [setSelectedLayers])

  return (
    <section className="fade-in-up lg:col-span-5 flex flex-col gap-6 lg:min-h-[78vh]">
      <div className="panel-card overflow-hidden rounded-2xl lg:h-full lg:flex lg:flex-col">
        <div className="panel-header px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">Draggable Options</h2>
        </div>

        <div className="p-7 lg:flex-1 lg:min-h-0">
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
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 lg:max-h-[80vh]">
              <ProfileOption
                variant="source"
                profiles={data.agentProfiles}
                selectedProfile={selectedProfile}
                onSelectProfile={setSelectedProfile}
              />

              <ProviderOption
                variant="source"
                providers={providers}
                selectedProvider={selectedProvider}
                onSelectProvider={setSelectedProvider}
              />

              <SkillOption
                variant="source"
                skills={data.skills}
                selectedSkills={selectedSkills}
                onAddSkill={addSkill}
                onRemoveSkill={removeSkill}
              />

              <LayerOption
                variant="source"
                layers={data.layers}
                selectedLayers={selectedLayers}
                onAddLayer={addLayer}
                onRemoveLayer={removeLayer}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
