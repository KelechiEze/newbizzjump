import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { WhoWeAreSection } from '../components/WhoWeAreSection';
import { ProjectsGridSection } from '../components/ProjectsGridSection';
import { ServicesSection } from '../components/ServicesSection';
import { CarouselSection } from '../components/CarouselSection';
import { FlowAndStudioSection } from '../components/FlowAndStudioSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { PricingSection } from '../components/PricingSection';
import { FAQSection } from '../components/FAQSection';
import { Project } from '../types';
import { PROJECTS } from '../data/projectsData';

interface HomePageProps {
  onSelectProject: (project: Project) => void;
  onOpenStartProject: (plan?: string) => void;
  onOpenOurApproach: () => void;
  onOpenAbout: () => void;
  onOpenJournal: () => void;
  onOpenProjectsArchive: () => void;
  onOpenContact: () => void;
}

export const HomePage = ({
  onSelectProject,
  onOpenStartProject,
  onOpenOurApproach,
  onOpenAbout,
  onOpenJournal,
  onOpenProjectsArchive,
  onOpenContact,
}: HomePageProps) => {
  return (
    <div className="w-full">
      <HeroSection
        onOpenStartProject={() => onOpenStartProject()}
        onOpenOurApproach={onOpenOurApproach}
        onOpenAbout={onOpenAbout}
        onOpenContact={onOpenContact}
      />

      <CarouselSection
        projects={PROJECTS}
        onSelectProject={onSelectProject}
      />

      <WhoWeAreSection
        onOpenProjects={onOpenProjectsArchive}
        onOpenOurApproach={onOpenOurApproach}
      />

      <ProjectsGridSection
        projects={PROJECTS}
        onSelectProject={onSelectProject}
        onOpenProjectsArchive={onOpenProjectsArchive}
      />

      <ServicesSection
        onOpenStartProject={() => onOpenStartProject()}
      />

      <FlowAndStudioSection
        onOpenAbout={onOpenAbout}
        onOpenProjectsArchive={onOpenProjectsArchive}
      />

      <TestimonialsSection
        onOpenStartProject={() => onOpenStartProject()}
      />

      <PricingSection
        onOpenStartProject={(plan) => onOpenStartProject(plan)}
      />

      <FAQSection
        onOpenContact={onOpenContact}
      />
    </div>
  );
};
