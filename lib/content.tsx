import React from 'react';

export interface Program {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export const programs: Program[] = [
  {
    title: 'Providing Access to Clean Water',
    description:
      'Working with communities to identify water access gaps and develop sustainable solutions, from borehole projects to community water management training.',
    href: '/programs#clean-water',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    title: 'Environmental Project',
    description:
      'Mobilizing community volunteers for tree-planting and environmental education to restore the natural environment and build awareness of sustainable land use.',
    href: '/programs#environment',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" />
      </svg>
    ),
  },
  {
    title: 'Capacity Building',
    description:
      'Running skills training and empowerment workshops that equip community members, especially women and youth, with tools for economic independence and community leadership.',
    href: '/programs#capacity-building',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" />
      </svg>
    ),
  },
];

export interface Story {
  id: string;
  name: string;
  location: string;
  role: string;
  tag: string;
  tagColor: string;
  image: string;
  imageAlt: string;
  quote: string;
  body: string[];
}

export const stories: Story[] = [
  {
    id: 'joy-to-the-street',
    name: 'Joy to the Street Campaign',
    location: 'Ejisu Municipality',
    role: 'Annual Welfare Initiative',
    tag: 'Social Welfare',
    tagColor: 'bg-brand-navy text-white',
    image: '/story-welfare-v2.png',
    imageAlt: 'Joy to the Street distribution event in Ejisu, supporting vulnerable families',
    quote: 'Rather than offering isolated charity, this project is structured as a movement designed to foster social solidarity and provide children with baseline educational tools.',
    body: [
      'The foundation\'s hallmark welfare campaign is the annual "Joy to the Street" program. This strategic initiative focuses heavily on the homeless, low-income families, and vulnerable children across the Ejisu Municipality.',
      'The campaign operates as a community donation drive that crowdsources funding and physical goods. It directly supplies less-privileged families with food staples, clothing, essential toiletries, and critical school materials.',
      'The initiative was born out of a localized need to counter extreme poverty in rural and peri-urban parts of the Ejisu Municipality.',
      'Rather than offering isolated charity, the project is structured as a "movement" designed to foster social solidarity and provide children with the baseline educational tools needed to stay in school.'
    ],
  },
  {
    id: 'cervical-cancer-screening',
    name: 'Preventive Healthcare',
    location: 'Mansa Memorial Hospital',
    role: 'Medical Outreach Partnership',
    tag: 'Healthcare',
    tagColor: 'bg-brand-red text-white',
    image: '/story-healthcare-web-v2.png',
    imageAlt: 'Free health screening van bringing medical access to rural communities',
    quote: 'Through community engagement and health education, the initiative empowered women with life-saving knowledge and promoted preventive healthcare.',
    body: [
      'The Prince Asamany Foundation is committed to improving the health and well-being of underserved communities through impactful outreach and strategic partnerships.',
      'One of its notable initiatives focused on cervical cancer awareness and prevention, where the Foundation collaborated with Mansa Memorial Hospital and the Ejisu Municipal Health Directorate of the Ghana Health Service to educate women on the importance of early detection and regular screening.',
      'Through community engagement and health education, the initiative empowered women with life-saving knowledge, promoted preventive healthcare, and strengthened access to essential screening services.',
      'The Foundation continues to support efforts that create healthier, more informed, and resilient communities through collaboration and compassionate service.'
    ],
  },
  {
    id: 'district-upskilling',
    name: 'District Upskilling',
    location: 'Ashanti Region',
    role: 'Economic Empowerment',
    tag: 'Economic Literacy',
    tagColor: 'bg-brand-gold text-brand-navy',
    image: '/story-1-v2.png',
    imageAlt: 'Community skills training driving economic empowerment',
    quote: 'Sustainable human advancement starts by delivering targeted resources and structural aid to help marginalized individuals secure independent livelihoods.',
    body: [
      'The foundational philosophy of the organization is heavily tied to its leadership\'s professional experience in strategic development. Founded by Prince Pepe Asamany, the organization\'s self-stated mission is to drive sustainable human advancement.',
      'Through Economic Literacy and District Upskilling programs, the foundation focuses on delivering training, targeted resources, and structural aid.',
      'This helps marginalized individuals secure independent, sustainable livelihoods rather than relying purely on short-term relief.',
      'By explicitly centering its workflow within the Ejisu Municipal layout, the foundation works directly with local assemblies, chiefs, and existing networks to ensure their volunteer campaigns do not duplicate state efforts but fill critical execution gaps.'
    ],
  },
];
