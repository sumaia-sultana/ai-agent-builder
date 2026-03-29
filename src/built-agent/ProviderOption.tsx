import { memo } from 'react'
import { Cpu, X } from 'lucide-react'
import { DraggableToken, DropZone } from './LayerDrop'
import type { DragMeta } from './LayerDrop'

interface ProviderOptionProps {
  providers: string[]
  selectedProvider: string
  onSelectProvider: (provider: string) => void
  variant?: 'source' | 'target'
}

function ProviderOption({
  providers,
  selectedProvider,
  onSelectProvider,
  variant = 'source',
}: ProviderOptionProps) {
  if (variant === 'source') {
    return (
      <article className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          <Cpu className="h-4 w-4 text-cyan-500" />
          Providers
        </h3>

        <div className="space-y-2">
          {providers.map((provider) => (
            <DraggableToken
              key={provider}
              id={`drag:provider:${provider}`}
              label={provider}
              tone="cyan"
              data={{ kind: 'provider', value: provider } satisfies DragMeta}
              onClick={() => onSelectProvider(provider)}
            />
          ))}
        </div>
      </article>
    )
  }

  return (
    <div>
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Cpu className="h-4 w-4 text-cyan-500" />
        AI Provider
      </h3>
      <DropZone id="drop:provider" title="Drag a provider here" helper="Accepts 1 item" tone="cyan">
        {selectedProvider ? (
          <span className="inline-flex items-center gap-2 rounded-md border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-800">
            {selectedProvider}
            <button
              type="button"
              onClick={() => onSelectProvider('')}
              className="rounded p-0.5 text-cyan-600 transition hover:bg-cyan-100 hover:text-cyan-800"
              aria-label="Clear provider"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ) : (
          <p className="py-6 text-center text-sm text-slate-500">Drop a provider here.</p>
        )}
      </DropZone>
    </div>
  )
}

export default memo(ProviderOption)
