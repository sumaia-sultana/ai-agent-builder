import Header from './components/Header'
import BuildAgent from './components/BuildAgent'
import Preview from './components/Preview'
import SaveAgent from './components/SaveAgent'
import { useAgent } from './Context'
 
import './App.css'
import Footer from './components/Footer'

export default function App() {
  const { savedAgents } = useAgent()

  return (
    <div className="app-shell min-h-screen text-slate-900 flex flex-col">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_15%_20%,rgba(45,212,191,0.2),transparent_40%),radial-gradient(circle_at_85%_0%,rgba(251,146,60,0.18),transparent_35%)]" />
      <Header />
      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <BuildAgent />
          <Preview />
        </div>

        {savedAgents.length > 0 && <SaveAgent />}
      </main>
      <Footer/>
    </div>
  )
}
