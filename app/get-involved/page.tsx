import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { GetInvolvedContent } from '@/components/sections/GetInvolvedContent';

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    'Volunteer with Prince Asamany Foundation in Ejisu, Ghana. Explore volunteer opportunities in community outreach, skills training, environmental work, and communications.',
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        overline="Take Action"
        title="Get Involved"
        description="If you have a heart to uplift the less privileged, join hands with us. There are many ways to contribute, choose the one that fits your skills and time."
        className="!bg-brand-green"
      />

      <GetInvolvedContent />
    </>
  );
}
