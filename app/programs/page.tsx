import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { CTABanner } from '@/components/sections/CTABanner';
import { blurProps } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Explore Prince Asamany Foundation\'s key programs: clean water access, environmental projects, and capacity building for communities in Ejisu, Ashanti Region, Ghana.',
};

interface ProgramBlock {
  id: string;
  tag: string;
  title: string;
  description: string;
  approach: string[];
  image: string;
  imageAlt: string;
  image2?: string;
  image2Alt?: string;
  color: string;
}

const programs: ProgramBlock[] = [
  {
    id: 'health-screenings',
    tag: 'Healthcare',
    title: 'Preventive Healthcare & Screenings',
    description:
      'We believe that access to basic healthcare and timely health information should be available to everyone. We partner with local institutions like Mansa Memorial Hospital to organize free health screenings, focusing on early detection of critical illnesses such as cervical cancer to prevent fatalities.',
    approach: [
      'Free cervical cancer screening for women in rural communities',
      'Health education to remove fear and misconceptions',
      'Collaboration with qualified health professionals',
      'Promotion of early detection to improve treatment outcomes',
    ],
    image: '/media/opt/IMG_8098.webp',
    imageAlt: 'Women seated under a canopy awaiting free health screenings beside a Prince Asamany Foundation banner in Ejisu',
    image2: '/media/opt/IMG_8116.webp',
    image2Alt: 'Health educator presenting a cervical cancer awareness atlas to seated women at a community screening outreach',
    color: 'brand-red',
  },
  {
    id: 'social-welfare',
    tag: 'Social Welfare',
    title: 'Social Welfare & Relief',
    description:
      'We believe in providing immediate, tangible support to the most vulnerable. Through initiatives like our annual "Joy to the Street" campaign, we supply less-privileged families, street children, and marginalized individuals with essential food, clothing, and support.',
    approach: [
      'Annual community donation drives',
      'Direct provision of food and essential goods',
      'Support for the homeless and mentally ill',
      'Fostering social solidarity in the municipality',
    ],
    image: '/media/opt/IMG_6928.webp',
    imageAlt: 'Mother in a white headscarf with her children holding food packages after a Joy to the Street relief distribution in Kumasi',
    color: 'brand-navy',
  },
  {
    id: 'economic-empowerment',
    tag: 'Empowerment',
    title: 'Economic Empowerment',
    description:
      'Sustainable human advancement starts by delivering targeted resources and structural aid. Our district upskilling efforts focus on equipping individuals with the tools and training they need to secure independent livelihoods and break the cycle of poverty.',
    approach: [
      'Targeted resource distribution for local businesses',
      'Structural aid and capacity building',
      'Promoting economic literacy',
      'Collaboration with local assemblies and chiefs',
    ],
    image: '/media/opt/IMG_8277.webp',
    imageAlt: 'Community member participating in an economic empowerment session',
    color: 'brand-green',
  },
];

const colorMap: Record<string, string> = {
  'brand-navy': 'bg-brand-navy',
  'brand-green': 'bg-brand-green',
  'brand-red': 'bg-brand-red',
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        overline="What We Do"
        title="Core Programs"
        description="The Prince Asamany Foundation stands as a bridge between need and compassion. Our interventions are focused on these three core pillars."
      />

      {/* Program details */}
      {programs.map((program, i) => {
        const image2 = program.image2;
        const image2Alt = program.image2Alt ?? '';
        return (
        <section
          key={program.id}
          id={program.id}
          className={`section-padding ${i % 2 === 0 ? 'bg-white' : 'bg-brand-cream'}`}
          aria-labelledby={`program-${program.id}-heading`}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>

              {/* Image — editorial stack when a secondary photo exists */}
              <div className="relative">
                <div className="relative rounded-card-lg overflow-hidden aspect-[4/3] group">
                  <Image
                    src={program.image}
                    alt={program.imageAlt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    {...blurProps(program.image)}
                  />
                  <div className={`absolute top-5 left-5 px-3 py-1.5 rounded-btn text-xs font-body font-bold uppercase tracking-wider ${colorMap[program.color]} text-white`}>
                    {program.tag}
                  </div>
                </div>

                {image2 && (
                  <>
                    {/* Overlapping inset on desktop */}
                    <div className="hidden lg:block absolute -bottom-10 -right-6 w-44 xl:w-56 rounded-card-lg overflow-hidden border-4 border-white shadow-xl z-10">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={image2}
                          alt={image2Alt}
                          fill
                          className="object-cover object-center"
                          sizes="224px"
                          {...blurProps(image2)}
                        />
                      </div>
                    </div>
                    {/* Stacked below on mobile/tablet */}
                    <div className="lg:hidden mt-4 relative rounded-card-lg overflow-hidden aspect-[16/9]">
                      <Image
                        src={image2}
                        alt={image2Alt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        {...blurProps(image2)}
                      />
                    </div>
                    {/* Spacer so the overlapping inset doesn't clip into the next section */}
                    <div className="hidden lg:block h-12" aria-hidden="true" />
                  </>
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-6">
                <div className="text-center lg:text-left">
                  <span className={`font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark`}>
                    {program.tag}
                  </span>
                  <h2
                    id={`program-${program.id}-heading`}
                    className="font-display text-3xl md:text-4xl font-bold text-brand-navy mt-2 leading-tight"
                  >
                    {program.title}
                  </h2>
                </div>
                <p className="font-body text-lg text-brand-navy/70 leading-relaxed">
                  {program.description}
                </p>
                <div>
                  <h3 className="font-body text-sm font-bold uppercase tracking-wider text-brand-navy mb-4">Our Approach</h3>
                  <ul className="flex flex-col gap-3 list-none m-0 p-0" role="list">
                    {program.approach.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-2" aria-hidden="true" />
                        <span className="font-body text-sm text-brand-navy/70 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/donate"
                  className="inline-flex items-center font-body text-sm font-semibold text-brand-red-dark border-b-2 border-brand-gold pb-1 transition-colors duration-200 self-start"
                >
                  Support this program →
                </Link>
              </div>
            </div>
          </div>
        </section>
        );
      })}

      <CTABanner />
    </>
  );
}
