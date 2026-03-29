import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useCallback } from 'react'
import Header from './components/Header'
import BuildAgent from './built-agent/BuildAgent'
import Preview from './built-agent/Preview'
import SaveAgent from './built-agent/SaveAgent'
import { useAgent } from './Context'
import type { DragEndEvent } from '@dnd-kit/core'
import type { DragMeta } from './built-agent/LayerDrop'
 
import './App.css'
import Footer from './components/Footer'

export default function App() {
  const { savedAgents, setSelectedLayers, setSelectedProfile, setSelectedProvider, setSelectedSkills } =
    useAgent()
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!over) return

      const meta = active.data.current as DragMeta | undefined

      if (!meta) return

      if (over.id === 'drop:profile' && meta.kind === 'profile') {
        setSelectedProfile(meta.value)
        return
      }

      if (over.id === 'drop:provider' && meta.kind === 'provider') {
        setSelectedProvider(meta.value)
        return
      }

      if (over.id === 'drop:skills' && meta.kind === 'skill') {
        setSelectedSkills((prev) => (prev.includes(meta.value) ? prev : [...prev, meta.value]))
        return
      }

      if (over.id === 'drop:layers' && meta.kind === 'layer') {
        setSelectedLayers((prev) => (prev.includes(meta.value) ? prev : [...prev, meta.value]))
      }
    },
    [setSelectedLayers, setSelectedProfile, setSelectedProvider, setSelectedSkills],
  )

  return (
    <div className="app-shell min-h-screen text-slate-900 flex flex-col">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_15%_20%,rgba(45,212,191,0.2),transparent_40%),radial-gradient(circle_at_85%_0%,rgba(251,146,60,0.18),transparent_35%)]" />
      <Header />
      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col gap-8">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <BuildAgent />
            <Preview />
          </div>
        </DndContext>

        {savedAgents.length > 0 && <SaveAgent />}
      </main>
      <Footer/>
    </div>
  )
}
