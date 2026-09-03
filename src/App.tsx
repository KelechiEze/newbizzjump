/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { FooterSection } from './components/FooterSection';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { StartProjectModal } from './components/StartProjectModal';
import { OurApproachModal } from './components/OurApproachModal';
import { JournalModal } from './components/JournalModal';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { ProjectsArchiveModal } from './components/ProjectsArchiveModal';
import { PROJECTS } from './data/projectsData';
import { Project } from './types';

// Scroll to top helper on every page navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function MainAppLayout() {
  // Modal state managers
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isStartProjectOpen, setIsStartProjectOpen] = useState(false);
  const [initialPlan, setInitialPlan] = useState<string | undefined>(undefined);
  const [isOurApproachOpen, setIsOurApproachOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProjectsArchiveOpen, setIsProjectsArchiveOpen] = useState(false);

  const handleOpenStartProject = (plan?: string) => {
    setInitialPlan(plan);
    setIsStartProjectOpen(true);
  };

  // Keyboard navigation & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setIsStartProjectOpen(false);
        setIsOurApproachOpen(false);
        setIsJournalOpen(false);
        setIsAboutOpen(false);
        setIsContactOpen(false);
        setIsProjectsArchiveOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-neutral-950 flex flex-col justify-between relative overflow-x-hidden font-sans">
      <ScrollToTop />

      {/* Top Main Navigation */}
      <Header
        onOpenStartProject={() => handleOpenStartProject()}
      />

      {/* Main Content Area Routing */}
      <main className="flex-1 flex flex-col justify-start">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onSelectProject={(proj) => setSelectedProject(proj)}
                onOpenStartProject={handleOpenStartProject}
                onOpenOurApproach={() => setIsOurApproachOpen(true)}
                onOpenAbout={() => setIsAboutOpen(true)}
                onOpenJournal={() => setIsJournalOpen(true)}
                onOpenProjectsArchive={() => setIsProjectsArchiveOpen(true)}
                onOpenContact={() => setIsContactOpen(true)}
              />
            }
          />
          <Route
            path="/about"
            element={
              <AboutPage
                onOpenStartProject={handleOpenStartProject}
              />
            }
          />
          <Route
            path="/projects"
            element={
              <ProjectsPage
                onSelectProject={(proj) => setSelectedProject(proj)}
                onOpenStartProject={handleOpenStartProject}
              />
            }
          />
          <Route
            path="/services"
            element={
              <ServicesPage
                onOpenStartProject={handleOpenStartProject}
                onOpenContact={() => setIsContactOpen(true)}
              />
            }
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          {/* Fallback route */}
          <Route
            path="*"
            element={
              <HomePage
                onSelectProject={(proj) => setSelectedProject(proj)}
                onOpenStartProject={handleOpenStartProject}
                onOpenOurApproach={() => setIsOurApproachOpen(true)}
                onOpenAbout={() => setIsAboutOpen(true)}
                onOpenJournal={() => setIsJournalOpen(true)}
                onOpenProjectsArchive={() => setIsProjectsArchiveOpen(true)}
                onOpenContact={() => setIsContactOpen(true)}
              />
            }
          />
        </Routes>
      </main>

      {/* BIZZJUMP Giant Display Navy Footer */}
      <FooterSection
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Interactive Case Study Lightbox / Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        allProjects={PROJECTS}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onOpenStartProject={() => handleOpenStartProject()}
      />

      {/* Start Project Interactive Brief Modal */}
      <StartProjectModal
        isOpen={isStartProjectOpen}
        onClose={() => setIsStartProjectOpen(false)}
        initialPlan={initialPlan}
      />

      {/* Our Approach Framework Modal */}
      <OurApproachModal
        isOpen={isOurApproachOpen}
        onClose={() => setIsOurApproachOpen(false)}
        onOpenStartProject={() => handleOpenStartProject()}
      />

      {/* Studio Journal Modal */}
      <JournalModal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
      />

      {/* About Berlin Studio & 23 Creators Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenStartProject={() => handleOpenStartProject()}
      />

      {/* Direct Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onOpenStartProject={() => handleOpenStartProject()}
      />

      {/* Full Projects Archive Modal */}
      <ProjectsArchiveModal
        isOpen={isProjectsArchiveOpen}
        onClose={() => setIsProjectsArchiveOpen(false)}
        projects={PROJECTS}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainAppLayout />
    </BrowserRouter>
  );
}
