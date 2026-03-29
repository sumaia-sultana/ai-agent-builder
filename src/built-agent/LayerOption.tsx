import { memo, useMemo } from 'react'
import { Layers, X } from 'lucide-react'
import type { Layer } from '../types/agentData'
import { DraggableToken, DropZone } from './LayerDrop'
import type { DragMeta } from './LayerDrop'

interface LayerOptionProps {
  layers: Layer[]
  selectedLayers: string[]
  onAddLayer: (layerId: string) => void
  onRemoveLayer: (layerId: string) => void
  variant?: 'source' | 'target'
}

function LayerOption({
  layers,
  selectedLayers,
  onAddLayer,
  onRemoveLayer,
  variant = 'source',
}: LayerOptionProps) {
  const selectedLayerSet = useMemo(() => new Set(selectedLayers), [selectedLayers])
  const layerById = useMemo(() => new Map(layers.map((layer) => [layer.id, layer])), [layers])

  if (variant === 'source') {
    return (
      <article className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          <Layers className="h-4 w-4 text-indigo-500" />
          Personality Layers
        </h3>

        <div className="space-y-2">
          {layers.map((layer) => (
            <DraggableToken
              key={layer.id}
              id={`drag:layer:${layer.id}`}
              label={layer.name}
              detail={layer.type}
              tone="amber"
              data={{ kind: 'layer', value: layer.id } satisfies DragMeta}
              disabled={selectedLayerSet.has(layer.id)}
              onClick={() => onAddLayer(layer.id)}
            />
          ))}
        </div>
      </article>
    )
  }

  return (
    <div>
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Layers className="h-4 w-4 text-indigo-500" />
        Personality Layers
      </h3>
      <DropZone id="drop:layers" title="Drag layers here" helper="Accepts multiple items" tone="amber">
        {selectedLayers.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedLayers.map((layerId) => {
              const layer = layerById.get(layerId)
              if (!layer) return null

              return (
                <span
                  key={layer.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-800"
                >
                  {layer.name}
                  <button
                    type="button"
                    onClick={() => onRemoveLayer(layer.id)}
                    className="rounded p-0.5 text-orange-500 transition hover:bg-orange-100 hover:text-orange-700"
                    aria-label={`Remove ${layer.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              )
            })}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-slate-500">Drop one or more layers here.</p>
        )}
      </DropZone>
    </div>
  )
}

export default memo(LayerOption)
