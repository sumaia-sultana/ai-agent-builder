import { useEffect, useState } from 'react'
import { Bot, Clock, RefreshCw } from 'lucide-react'
import { useAgent } from '../Context'

export default function Header() {
  const { loading, fetchAPI } = useAgent()
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="lg:flex md:flex items-center gap-3">
              <div className="rounded-xl bg-linear-to-br from-teal-600 to-cyan-500 p-2.5 shadow-lg shadow-teal-700/30">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className=" lg:text-xl font-bold tracking-tight text-slate-900">AI Agent Builder</h1>
                <p className="text-xs text-slate-500">Design your custom AI personality</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4 lg:gap-4">
              <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>{sessionTime}s</span>
              </div>
              <button
                onClick={fetchAPI}
                disabled={loading}
                className="cta-btn inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Fetching...' : 'Reload Data'}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
