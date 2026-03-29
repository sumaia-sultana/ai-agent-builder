import { memo, useMemo } from 'react'
import { User, X } from 'lucide-react'
import type { AgentProfile } from '../types/agentData'
import { DraggableToken, DropZone } from './LayerDrop'
import type { DragMeta } from './LayerDrop'

interface ProfileOptionProps {
  profiles: AgentProfile[]
  selectedProfile: string
  onSelectProfile: (profileId: string) => void
  variant?: 'source' | 'target'
}

function ProfileOption({
  profiles,
  selectedProfile,
  onSelectProfile,
  variant = 'source',
}: ProfileOptionProps) {
  const selected = useMemo(
    () => profiles.find((profile) => profile.id === selectedProfile),
    [profiles, selectedProfile],
  )

  if (variant === 'source') {
    return (
      <article className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          <User className="h-4 w-4 text-teal-500" />
          Profiles
        </h3>

        <div className="space-y-2">
          {profiles.map((profile) => (
            <DraggableToken
              key={profile.id}
              id={`drag:profile:${profile.id}`}
              label={profile.name}
              detail={profile.description}
              tone="teal"
              data={{ kind: 'profile', value: profile.id } satisfies DragMeta}
              onClick={() => onSelectProfile(profile.id)}
            />
          ))}
        </div>
      </article>
    )
  }

  return (
    <div>
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <User className="h-4 w-4 text-teal-500" />
        Base Profile
      </h3>
      <DropZone id="drop:profile" title="Drag a profile here" helper="Accepts 1 item" tone="teal">
        {selected ? (
          <div className="flex items-start justify-between gap-3 rounded-lg border border-teal-200 bg-teal-50 p-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-teal-900">{selected.name}</p>
              <p className="mt-1 text-xs text-teal-700">{selected.description}</p>
            </div>
            <button
              type="button"
              onClick={() => onSelectProfile('')}
              className="rounded p-1 text-teal-700 transition hover:bg-teal-100"
              aria-label="Clear profile"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-slate-500">Drop a profile here.</p>
        )}
      </DropZone>
    </div>
  )
}

export default memo(ProfileOption)
