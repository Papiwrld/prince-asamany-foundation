import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { LeadershipRecognition } from '@/components/sections/LeadershipRecognition';
import { PressSection } from '@/components/sections/PressSection';
import { CTABanner } from '@/components/sections/CTABanner';
import { blurProps } from '@/lib/media';

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
  { title: 'Preventive Healthcare.', image: '/media/opt/IMG_8259.webp', alt: 'Health workers and foundation team posing by a free cervical cancer screening banner', href: '/programs#health-screenings' },
  { title: 'Social Welfare & Relief.', image: '/media/opt/IMG_6851.webp', alt: 'Foundation volunteers handing relief items to mothers and children during a Joy to the Street outreach in Kumasi', href: '/programs#social-welfare' },
  { title: 'Economic Empowerment.', image: '/media/opt/IMG_8208.webp', alt: 'Foundation volunteers standing beside the foundation mission and vision banner during a community capacity-building event', href: '/programs#economic-empowerment' },
];

const achievements = [
  {
    title: 'Healthcare Initiatives',
    text: 'Partnered with healthcare providers to deliver annual cervical cancer screenings, ensuring women in underserved communities receive lifesaving care.',
  },
  {
    title: 'Joy to the Street Program',
    text: 'A flagship initiative that restores dignity and provides support to people living on the margins, reminding them they are not forgotten.',
  },
  {
    title: 'Youth Empowerment',
    text: "Invested in capacity-building programs that equip young people with skills and opportunities to thrive in today's world.",
  },
  {
    title: 'Women\u2019s Economic Empowerment',
    text: 'Supported market women to establish businesses, fostering financial independence and stability.',
  },
  {
    title: 'Community Health',
    text: 'Organized regular medical screenings to safeguard the health and well-being of vulnerable populations.',
  },
  {
    title: 'National Recognition',
    text: 'In 2025, honored with the Social Change Advocate Award by the Advocate for Fair Legal Access Ghana (AFLAG), acknowledging our role in championing justice and driving social transformation.',
  },
];

const futurePlans = [
  {
    title: 'Expanding Reach',
    text: 'Extending programs to more rural and underserved communities across Ghana.',
  },
  {
    title: 'Building Bridges of Opportunity',
    text: 'Creating pathways for youth to embrace entrepreneurship, digital skills, and leadership.',
  },
  {
    title: 'Strengthening Partnerships',
    text: 'Collaborating with NGOs, policymakers, and international organizations to amplify impact.',
  },
  {
    title: 'Inspiring Service',
    text: 'Encouraging more young people to embrace the spirit of giving, ensuring kindness continues to ripple through society.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <PageHeader
        overline="Our Foundation"
        title="About Prince Asamany Foundation"
        description="The Prince Asamany Foundation stands as a bridge between need and compassion. If you have a heart to uplift the less privileged, join hands with us."
        bgImage="/media/opt/IMG_6885.webp"
      />

      {/* About intro */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">About Us</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mt-2 leading-tight">
              Who we are
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="font-body text-lg text-brand-navy/75 leading-relaxed mb-5">
                The Prince Asamany Foundation was born out of a moment of compassion. While driving
                with his daughter, Prince Douglas Asamany encountered a beggar asking for food. His
                daughter&rsquo;s innocent plea, &ldquo;Daddy, why are they begging for food?
                Let&rsquo;s take them home and give them something to eat,&rdquo; sparked the vision
                to create a platform where kindness meets action.
              </p>
              <blockquote className="border-l-4 border-brand-gold pl-6 mb-5">
                <p className="font-display text-xl text-brand-navy italic leading-snug">
                  We stand for hope, Development and opportunity for all.
                </p>
              </blockquote>
              <p className="font-body text-lg text-brand-navy/75 leading-relaxed mb-5">
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
                <h3 className="font-display text-xl font-bold text-brand-red-dark mb-2">Vision</h3>
                <p className="font-body text-lg text-brand-navy/75 leading-relaxed italic">
                  Our Work aims to break the vicious cycle of poverty &amp; social isolation and to
                  restore hope for a better future.
                </p>
              </div>

              {/* Mission */}
              <div className="border-l-4 border-brand-navy pl-6">
                <h3 className="font-display text-xl font-bold text-brand-red-dark mb-2">Mission</h3>
                <p className="font-body text-lg text-brand-navy/75 leading-relaxed italic">
                  Work for social development and integration of the underprivileged individuals,
                  groups and communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-brand-cream section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">
              Milestones
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mt-2 leading-tight">
              Achievements
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <div key={item.title} className="bg-white rounded-card-lg border border-brand-navy/10 p-8">
                <h3 className="font-display text-xl font-bold text-brand-navy mb-3">{item.title}</h3>
                <p className="font-body text-brand-navy/70 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Plans */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">
              What&rsquo;s next
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mt-2 leading-tight">
              Future Plans
            </h2>
            <p className="font-body text-lg text-brand-navy/70 mt-4">
              Looking ahead, the Prince Asamany Foundation envisions:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futurePlans.map((item) => (
              <div key={item.title} className="bg-brand-cream rounded-card-lg border border-brand-navy/10 p-8">
                <h3 className="font-display text-xl font-bold text-brand-navy mb-3">{item.title}</h3>
                <p className="font-body text-brand-navy/70 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founder — editorial profile */}
      <section className="bg-brand-cream section-padding overflow-hidden" aria-labelledby="founder-heading">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">Leadership</span>
            <h2 id="founder-heading" className="font-display text-3xl md:text-4xl font-bold text-brand-navy mt-2 leading-tight">
              See the Recognition
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Photo stack: portrait + field shot */}
            <div className="relative">
              <div className="relative rounded-card-lg overflow-hidden aspect-[4/5] shadow-xl max-w-md mx-auto lg:max-w-none">
                <Image
                  src="/media/opt/IMG_6965.webp"
                  alt="Portrait of Prince Douglas Asamany, Founder and President of the Prince Asamany Foundation, seated outdoors in a foundation T-shirt"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  {...blurProps('/media/opt/IMG_6965.webp')}
                />
              </div>
              <div className="relative mt-6 lg:mt-0 lg:absolute lg:-bottom-10 lg:-right-4 xl:-right-10 lg:w-56 xl:w-64 rounded-card-lg overflow-hidden border-4 border-white shadow-lg z-10">
                <div className="relative aspect-[5/6]">
                  <Image
                    src="/media/opt/IMG_6899_1.webp"
                    alt="Prince Asamany bending to greet an elderly woman during a community relief visit in Kumasi"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 256px"
                    {...blurProps('/media/opt/IMG_6899_1.webp')}
                  />
                </div>
              </div>
              <div className="hidden lg:block h-28" aria-hidden="true" />
            </div>

            {/* Narrative */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 mt-8 lg:mt-0">
              <p className="font-display text-xl md:text-2xl text-brand-navy font-semibold">
                Prince Douglas Asamany
              </p>
              <p className="font-body text-lg text-brand-navy/75 leading-relaxed max-w-xl text-left">
                A chemist by training and an advocate by calling, Prince founded the Prince Asamany
                Foundation to stand in the gap for underprivileged communities across the Ejisu
                Municipal Assembly, from street children in Kumasi to women in need of preventive
                healthcare.
              </p>
              <p className="font-body text-lg text-brand-navy/75 leading-relaxed max-w-xl text-left">
                Whether he is handing relief packages at the annual &ldquo;Joy to the Street&rdquo; campaign or
                championing Green Chemistry education, his approach is the same: show up in person,
                listen first, and build solutions the community owns. In recognition of that work, he
                was named the 2025 Social Change Advocate by AFLAG.
              </p>
            </div>

          </div>
        </div>
      </section>

      <LeadershipRecognition />

      <PressSection />

      {/* Strategic Objectives & Core Values */}
      <section className="bg-brand-cream section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Strategic Objectives */}
            <div>
              <div className="text-center mb-8">
                <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">Strategy</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mt-2 leading-tight">
                  Strategic Objectives
                </h2>
              </div>
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
              <div className="text-center mb-8">
                <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">Our Values</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mt-2 leading-tight">
                  Core Values
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                {values.map((v, i) => (
                  <div key={v.title} className="flex gap-5">
                    <div className="font-display text-4xl font-black text-brand-gold/30 leading-none shrink-0 w-8">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-brand-navy">{v.title}</h3>
                      <p className="font-body text-sm text-brand-navy/70 mt-1 leading-relaxed">{v.desc}</p>
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
              <Link
                key={p.title}
                href={p.href}
                aria-label={`${p.title}: read more on the Programs page`}
                className="relative rounded-card-lg overflow-hidden group min-h-[400px] lg:min-h-[480px] block focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-4"
              >
                <Image 
                  src={p.image} 
                  alt={p.alt} 
                  fill 
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                  sizes="(max-width: 768px) 100vw, 33vw" 
                  {...blurProps(p.image)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Key Program Areas list */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
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
