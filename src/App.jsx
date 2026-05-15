import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import EmailGate from './components/EmailGate';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import Market from './components/Market';
import BusinessModel from './components/BusinessModel';
import CompetitiveAdvantage from './components/CompetitiveAdvantage';
import Technology from './components/Technology';
import Traction from './components/Traction';
import Team from './components/Team';
import PitchDeckHub from './components/PitchDeckHub';
import ExecutiveSummary from './components/ExecutiveSummary';
import SAFEAgreement from './components/SAFEAgreement';
import CapTable from './components/CapTable';
import Investment from './components/Investment';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AdminPortal from './pages/AdminPortal';

function MainSite() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Market />
        <BusinessModel />
        <CompetitiveAdvantage />
        <Technology />
        <Traction />
        <Team />
        <PitchDeckHub />
        <ExecutiveSummary />
        <SAFEAgreement />
        <CapTable />
        <Investment />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

const GATE_EXPIRY_DAYS = 30;

function gateIsValid() {
  try {
    const raw = localStorage.getItem('havesta_gate_passed');
    if (!raw) return false;
    const { passedAt } = JSON.parse(raw);
    const elapsed = (Date.now() - new Date(passedAt).getTime()) / 86400000;
    return elapsed < GATE_EXPIRY_DAYS;
  } catch {
    return false;
  }
}

function GatedSite() {
  const [passed, setPassed] = useState(gateIsValid);
  if (!passed) return <EmailGate onPass={() => setPassed(true)} />;
  return <MainSite />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="*" element={<GatedSite />} />
      </Routes>
    </BrowserRouter>
  );
}
