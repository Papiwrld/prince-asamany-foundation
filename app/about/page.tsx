import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/ui/PageHeader';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Prince Asamany Foundation is a non-governmental organization located at Akyawkrom in Ejisu Municipal Assembly. Learn about our mission, vision, values, and strategic objectives.',
};

const values = [
  { title: 'Service beyond self.', desc: 'We put the needs of our communities before our own comfort, acting always in the interest of the people we serve.' },
  { title: 'Integrity.', desc: 'We are transparent, honest, and accountable in every action and decision we make.' },
  { title: 'Responsibility.', desc: 'We take ownership of our commitments to communities, partners, and beneficiaries.' },
];

const objectives = [
  'Capacity building.',
  'Training for community empowerment.',
  'Fundraising and resource mobilization for sustainability.',
  'Collaboration with stakeholders for collective impact.',
];

const programs = [
  { title: 'Providing Access to Clean Water.', image: '/program-water.png', alt: 'A Ghanaian woman at a community borehole, clean water access program in Ejisu' },
  { title: 'Environmental Project.', image: '/program-environment.png', alt: 'Community volunteers planting trees in Ashanti Region Ghana, environmental program' },
  { title: 'Capacity Building.', image: '/program-capacity.png', alt: 'Community workshop in Ghana, capacity-building training session by Prince Asamany Foundation' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <PageHeader
        overline="Our Foundation"
        title="About Prince Asamany Foundation"
        description="The Prince Asamany Foundation stands as a bridge between need and compassion. If you have a heart to uplift the less privileged, join hands with us."
        bgImage="/about-community.png"
      />

      {/* About intro */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red">About Us</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mt-2 mb-6 leading-tight">
                Who we are
              </h2>
              <p className="font-body text-lg text-brand-navy/75 leading-relaxed mb-5">
                Prince Asamany Foundation is a non-governmental organization located at Akyawkrom
                in Ejisu Municipal Assembly. We stand for Hope, Development and Opportunity for all.
                Our objective is to assist in the process of social integration and personal
                realization of the underprivileged.
              </p>
              <p className="font-body text-lg text-brand-navy/75 leading-relaxed">
                Registered as an LBG (Limited by Guarantee) with the Government of Ghana, the
                Foundation operates with transparency, accountability, and a deep commitment to the
                dignity of every person we serve.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* Vision */}
              <div className="border-l-4 border-brand-gold pl-6">
                <h3 className="font-display text-xl font-bold text-brand-red mb-2">Vision</h3>
                <p className="font-body text-lg text-brand-navy/75 leading-relaxed italic">
                  Our Work aims to break the vicious cycle of poverty &amp; social isolation and to
                  restore hope for a better future.
                </p>
              </div>

              {/* Mission */}
              <div className="border-l-4 border-brand-navy pl-6">
                <h3 className="font-display text-xl font-bold text-brand-red mb-2">Mission</h3>
                <p className="font-body text-lg text-brand-navy/75 leading-relaxed italic">
                  Work for social development and integration of the underprivileged individuals,
                  groups and communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Objectives & Core Values */}
      <section className="bg-brand-cream section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Strategic Objectives */}
            <div>
              <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red">Strategy</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mt-2 mb-8 leading-tight">
                Strategic Objectives
              </h2>
              <ul className="flex flex-col gap-4 list-none m-0 p-0" role="list">
                {objectives.map((obj) => (
                  <li key={obj} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-brand-red shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="font-body text-base text-brand-navy/80 leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Values */}
            <div>
              <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red">Our Values</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mt-2 mb-8 leading-tight">
                Core Values
              </h2>
              <div className="flex flex-col gap-6">
                {values.map((v, i) => (
                  <div key={v.title} className="flex gap-5">
                    <div className="font-display text-4xl font-black text-brand-gold/30 leading-none shrink-0 w-8">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-brand-navy">{v.title}</h3>
                      <p className="font-body text-sm text-brand-navy/65 mt-1 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Program Areas */}
      <section className="bg-brand-navy section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-12 text-center">
            <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">Programs</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 leading-tight">
              Key Program Areas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((p) => (
              <div key={p.title} className="relative rounded-card-lg overflow-hidden group" style={{ minHeight: '280px' }}>
                <Image src={p.image} alt={p.alt} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-bold text-white leading-tight">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Key Program Areas list */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl text-left">
            {[
              'Analysis and assessment of needs.',
              'Developing programmes and strategies for development.',
              'Empowering and developing local communities.',
              'Interaction with stakeholders.',
            ].map((item) => (
              <div key={item} className="bg-white/5 border border-white/10 rounded-card p-4">
                <p className="font-body text-sm text-white/75 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
