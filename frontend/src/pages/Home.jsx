import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import TrustStrip from '../components/TrustStrip.jsx'
import About from '../components/About.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import HybridAI from '../components/HybridAI.jsx'
import ExplainableAI from '../components/ExplainableAI.jsx'
import ResultsPreview from '../components/ResultsPreview.jsx'
import Features from '../components/Features.jsx'
import Research from '../components/Research.jsx'
import FAQ from '../components/FAQ.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import CTA from '../components/CTA.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <HowItWorks />
        <HybridAI />
        <ExplainableAI />
        <ResultsPreview />
        <Features />
        <Research />
        <FAQ />
        <Disclaimer />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
