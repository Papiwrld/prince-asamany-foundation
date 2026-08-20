import React from 'react';

export interface Program {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export const programs: Program[] = [
  {
    title: 'Preventive Healthcare & Screenings',
    description:
      'Partnering with local institutions to organize free health screenings, focusing on early detection of critical illnesses such as cervical cancer.',
    href: '/programs#health-screenings',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: 'Social Welfare & Relief',
    description:
      'Providing immediate, tangible support to the most vulnerable through initiatives like the annual "Joy to the Street" campaign.',
    href: '/programs#social-welfare',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Economic Empowerment',
    description:
      'Running skills training and district upskilling efforts that equip community members with tools for economic independence.',
    href: '/programs#economic-empowerment',
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
    image: '/media/IMG_6928.jpg',
    imageAlt: 'Three young girls looking at the camera during a foundation outreach event',
    quote: 'Rather than offering isolated charity, this project is structured as a movement designed to foster social solidarity and provide children with baseline educational tools.',
    body: [
      'The foundation\'s hallmark welfare campaign is the annual "Joy to the Street" program. This strategic initiative focuses heavily on the homeless, low-income families, and vulnerable children across the Ejisu Municipality.',
      'On Christmas Day, December 26th, 2024, the Prince Asamany Foundation spread holiday cheer to over 800 street children, mentally ill persons, refugees, and other marginalized individuals in Kumasi (Amakom, WAEC Street, Asafo, and Jubilee Park).',
      'The campaign directly supplied less-privileged families with food staples, clothing, essential toiletries, and critical support worth millions of cedis.',
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
    image: '/media/IMG_8203.jpg.jpeg',
    imageAlt: 'Foundation team and health workers posing with a banner at a free cervical cancer screening event',
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
    image: '/media/IMG_4488.jpg',
    imageAlt: 'A black and white portrait of a child looking into the camera during a community visit',
    quote: 'Sustainable human advancement starts by delivering targeted resources and structural aid to help marginalized individuals secure independent livelihoods.',
    body: [
      'The foundational philosophy of the organization is heavily tied to its leadership\'s professional experience in strategic development. Founded by Prince Pepe Asamany, the organization\'s self-stated mission is to drive sustainable human advancement.',
      'Through Economic Literacy and District Upskilling programs, the foundation focuses on delivering training, targeted resources, and structural aid.',
      'This helps marginalized individuals secure independent, sustainable livelihoods rather than relying purely on short-term relief.',
      'By explicitly centering its workflow within the Ejisu Municipal layout, the foundation works directly with local assemblies, chiefs, and existing networks to ensure their volunteer campaigns do not duplicate state efforts but fill critical execution gaps.'
    ],
  },
];
