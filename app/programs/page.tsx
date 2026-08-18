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
    id: 'clean-water',
    tag: 'Water Access',
    title: 'Providing Access to Clean Water',
    description:
      'Access to clean water is a fundamental right. The Prince Asamany Foundation works directly with communities in Ejisu Municipal Assembly to identify water access gaps and develop sustainable solutions, from borehole projects to community water management training.',
    approach: [
      'Community needs assessment for water access',
      'Borehole and water infrastructure development',
      'Water management training for community members',
      'Ongoing monitoring and maintenance support',
    ],
    image: '/program-water.png',
    imageAlt: 'A Ghanaian woman collecting clean water from a community borehole in Ejisu, Ashanti Region, Prince Asamany Foundation water access program',
    color: 'brand-navy',
  },
  {
    id: 'environment',
    tag: 'Environment',
    title: 'Environmental Project',
    description:
      'The Foundation\'s environmental work addresses the growing challenge of deforestation and environmental degradation in the Ashanti Region. We mobilize community volunteers to restore the natural environment and build awareness of sustainable land use.',
    approach: [
      'Community tree-planting initiatives',
      'Environmental education and awareness',
      'Sustainable land use advocacy',
      'Collaboration with local and national environmental bodies',
    ],
    image: '/program-environment.png',
    imageAlt: 'Ghanaian community volunteers tree-planting in Ashanti Region, Prince Asamany Foundation environmental program',
    color: 'brand-green',
  },
  {
    id: 'capacity-building',
    tag: 'Capacity Building',
    title: 'Capacity Building',
    description:
      'Training and knowledge are the most powerful tools for lasting change. The Foundation runs capacity-building workshops that equip community members, especially women and youth, with skills for economic independence, community leadership, and personal development.',
    approach: [
      'Vocational and skills training workshops',
      'Community leadership development',
      'Women and youth economic empowerment',
      'Stakeholder collaboration for program delivery',
    ],
    image: '/program-capacity.png',
    imageAlt: 'A community training workshop in Ghana, adults learning skills through the Prince Asamany Foundation capacity-building program',
    color: 'brand-red',
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
