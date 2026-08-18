import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { DonatePageContent } from '@/components/sections/DonatePageContent';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support Prince Asamany Foundation via Paystack, bank transfer, or MTN MoMo. Every gift directly funds clean water access, environmental projects, and capacity-building for communities in Ejisu, Ghana.',
};

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <PageHeader
        overline="Support Our Work"
        title="Support Prince Asamany Foundation"
        description="Donate via bank transfer or MoMo — every gift makes a difference."
        bgImage="/donate-visual.png"
      />

      <DonatePageContent />
    </>
  );
}