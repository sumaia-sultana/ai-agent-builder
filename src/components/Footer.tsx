import { FileText } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer-shell relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <p className="footer-note">All rights reserved by Vivasoft & developed by Sumaia.</p>
          <a
            href="/Sumaia-Frontend-thinker.pdf"
            target="_blank"
            rel="noreferrer"
            className="footer-resume-btn inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 font-semibold"
          >
            <FileText className="h-4 w-4" />
            Open Resume
          </a>
        </div>
      </footer>
  )
}
