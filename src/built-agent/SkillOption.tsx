import { memo, useMemo } from 'react'
import { X, Zap } from 'lucide-react'
import type { Skill } from '../types/agentData'
import { DraggableToken, DropZone } from './LayerDrop'
import type { DragMeta } from './LayerDrop'

interface SkillOptionProps {
  skills: Skill[]
  selectedSkills: string[]
  onAddSkill: (skillId: string) => void
  onRemoveSkill: (skillId: string) => void
  variant?: 'source' | 'target'
}

function SkillOption({
  skills,
  selectedSkills,
  onAddSkill,
  onRemoveSkill,
  variant = 'source',
}: SkillOptionProps) {
  const selectedSkillSet = useMemo(() => new Set(selectedSkills), [selectedSkills])
  const skillById = useMemo(() => new Map(skills.map((skill) => [skill.id, skill])), [skills])

  if (variant === 'source') {
    return (
      <article className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          <Zap className="h-4 w-4 text-amber-500" />
          Skills
        </h3>

        <div className="space-y-2">
          {skills.map((skill) => (
            <DraggableToken
              key={skill.id}
              id={`drag:skill:${skill.id}`}
              label={skill.name}
              detail={skill.category}
              tone="teal"
              data={{ kind: 'skill', value: skill.id } satisfies DragMeta}
              disabled={selectedSkillSet.has(skill.id)}
              onClick={() => onAddSkill(skill.id)}
            />
          ))}
        </div>
      </article>
    )
  }

  return (
    <div>
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Zap className="h-4 w-4 text-amber-500" />
        Skills
      </h3>
      <DropZone id="drop:skills" title="Drag skills here" helper="Accepts multiple items" tone="teal">
        {selectedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skillId) => {
              const skill = skillById.get(skillId)
              if (!skill) return null

              return (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-800"
                >
                  {skill.name}
                  <button
                    type="button"
                    onClick={() => onRemoveSkill(skill.id)}
                    className="rounded p-0.5 text-teal-500 transition hover:bg-teal-100 hover:text-teal-700"
                    aria-label={`Remove ${skill.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              )
            })}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-slate-500">Drop one or more skills here.</p>
        )}
      </DropZone>
    </div>
  )
}

export default memo(SkillOption)
