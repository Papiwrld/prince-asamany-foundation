import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Explore Prince Asamany Foundation\'s key programs: clean water access, environmental projects, and capacity building for communities in Ejisu, Ashanti Region, Ghana.',
};

const programs = [
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
    image: '/media/IMG_8259.jpg.jpeg',
    imageAlt: 'Health workers and foundation team posing by a free cervical cancer screening banner',
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
    image: '/media/IMG_6899_1.jpg',
    imageAlt: 'Prince Asamany handing out supplies to a marginalized individual in the street',
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
    image: '/media/IMG_8277.jpg.jpeg',
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
      {programs.map((program, i) => (
        <section
          key={program.id}
          id={program.id}
          className={`section-padding ${i % 2 === 0 ? 'bg-white' : 'bg-brand-cream'}`}
          aria-labelledby={`program-${program.id}-heading`}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>

              {/* Image */}
              <div className="relative rounded-card-lg overflow-hidden aspect-[4/3] group">
                <Image
                  src={program.image}
                  alt={program.imageAlt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className={`absolute top-5 left-5 px-3 py-1.5 rounded-btn text-xs font-body font-bold uppercase tracking-wider ${colorMap[program.color]} text-white`}>
                  {program.tag}
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-6">
                <div>
                  <span className={`font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red`}>
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
                  className="inline-flex items-center font-body text-sm font-semibold text-brand-red border-b-2 border-brand-gold pb-1 hover:text-brand-red-dark transition-colors duration-200 self-start"
                >
                  Support this program →
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      <CTABanner />
    </>
  );
}
