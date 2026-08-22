import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/Hero';
import { ProgramIconRow } from '@/components/sections/ProgramIconRow';
import { AsymmetricCards } from '@/components/sections/AsymmetricCards';
import { FounderHighlight } from '@/components/sections/FounderHighlight';
import { PhotoCollage } from '@/components/sections/PhotoCollage';
import { StoryGrid } from '@/components/sections/StoryGrid';
import { MapImpact } from '@/components/sections/MapImpact';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'A registered NGO based in Akyawkrom, Ejisu Municipal Assembly, Ashanti Region, Ghana. We work for social development, clean water access, environmental projects, and capacity building for underprivileged communities.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProgramIconRow />
      <AsymmetricCards />
      <FounderHighlight />
      <PhotoCollage />
      <StoryGrid />
      <MapImpact />
      <CTABanner />
    </>
  );
}
