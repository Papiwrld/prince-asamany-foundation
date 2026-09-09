/**
 * Events Data Service & Google Sheets Integration
 *
 * Fetches events directly from a published Google Sheet.
 * If no sheet ID is provided or fetch fails, falls back gracefully to starter foundation events.
 */

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO format YYYY-MM-DD or readable string
  time?: string; // e.g. "9:00 AM – 3:00 PM GMT"
  location: string;
  category: string;
  description: string;
  imageUrl?: string;
  registrationUrl?: string;
  featured?: boolean;
  status: 'Published' | 'Draft' | 'Cancelled';
  isPast: boolean;
}

export interface EventsResponse {
  upcoming: EventItem[];
  past: EventItem[];
  all: EventItem[];
  source: 'google_sheets' | 'fallback';
}

/**
 * Normalizes an image link. If the user pasted a Google Drive share link,
 * converts it to a direct, high-res embeddable link.
 */
export function normalizeImageUrl(url?: string): string | undefined {
  if (!url || !url.trim()) return undefined;
  // If multiple files were uploaded, pick the first one
  const firstItem = url.split(',')[0].trim();

  // Pattern 1: drive.google.com/file/d/FILE_ID or /file/u/0/d/FILE_ID
  const driveFileMatch = firstItem.match(/drive\.google\.com\/file\/(?:u\/\d+\/)?d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}`;
  }

  // Pattern 2: drive.google.com/open?id=FILE_ID or uc?id=FILE_ID (standard Google Forms file upload format)
  const driveIdMatch = firstItem.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveIdMatch && driveIdMatch[1] && firstItem.includes('drive.google.com')) {
    return `https://lh3.googleusercontent.com/d/${driveIdMatch[1]}`;
  }

  return firstItem;
}

/**
 * Robust CSV parser that handles quoted cells, commas within quotes,
 * and multi-line strings.
 */
function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // Skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentCell.trim());
      if (currentRow.some((c) => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Starter fallback events representing real Prince Asamany Foundation initiatives.
 */
export const fallbackEvents: EventItem[] = [
  {
    id: 'cervical-cancer-screening-2026',
    title: 'Free Community Health Screening & Deworming Outreach',
    date: '2026-10-24',
    time: '8:30 AM - 3:30 PM GMT',
    location: 'Ejisu Community Health Centre, Ashanti Region',
    category: 'Healthcare',
    description:
      'Providing free preventive cervical cancer screenings, blood pressure checks, diabetes screening, and medication administration to over 150 community members and students.',
    imageUrl: '/media/opt/WhatsApp Image 2026-08-26 at 00.41.26.webp',
    registrationUrl: '/contact',
    featured: true,
    status: 'Published',
    isPast: false,
  },
  {
    id: 'joy-to-the-street-dec-2026',
    title: 'Joy to the Street: Annual Festive Relief Drive',
    date: '2026-12-19',
    time: '10:00 AM - 4:00 PM GMT',
    location: 'Akyawkrom & Ejisu Municipal District',
    category: 'Social Welfare',
    description:
      'Distributing food packages, hygiene kits, school supplies, and clothing to vulnerable children, single mothers, and elderly persons across our local communities.',
    imageUrl: '/media/opt/award-night-poster.webp',
    registrationUrl: '/get-involved#volunteer',
    featured: true,
    status: 'Published',
    isPast: false,
  },
  {
    id: 'farmers-empowerment-workshop-nov-2026',
    title: 'Smallholder Farmers Skills Workshop & Tools Distribution',
    date: '2026-11-14',
    time: '9:00 AM - 1:00 PM GMT',
    location: 'Akyawkrom Farmers Cooperative Hall',
    category: 'Economic Empowerment',
    description:
      'Hands-on training in sustainable agricultural methods, preserving harvested crops, and distribution of essential farming gear for local cooperative members.',
    imageUrl: '/media/opt/IMG-20260713-WA0030.webp',
    registrationUrl: '/contact',
    featured: false,
    status: 'Published',
    isPast: false,
  },
  {
    id: 'forestry-deworming-past',
    title: 'Forestry Commission Student Health Initiative',
    date: '2026-07-27',
    time: '9:00 AM - 2:00 PM GMT',
    location: 'Forestry Commission Training Centre, Ejisu',
    category: 'Healthcare',
    description:
      'Organized a targeted health outreach and deworming exercise for 84 students of the Certificate in Natural Resources Management programme.',
    imageUrl: '/media/opt/IMG-20260727-WA0008.webp',
    registrationUrl: '/stories#free-deworming-exercise',
    featured: false,
    status: 'Published',
    isPast: true,
  },
];

/**
 * Default branded images based on category so that non-technical staff
 * never have to worry about broken images or finding a flyer link.
 */
export function getCategoryFallbackImage(category: string): string {
  const lower = category.toLowerCase();
  if (lower.includes('health') || lower.includes('screen') || lower.includes('deworm')) {
    return '/media/opt/WhatsApp Image 2026-08-26 at 00.41.26.webp';
  }
  if (lower.includes('welfare') || lower.includes('relief') || lower.includes('joy') || lower.includes('street')) {
    return '/media/opt/IMG_4403_2.webp';
  }
  if (lower.includes('farm') || lower.includes('empower') || lower.includes('economic') || lower.includes('work')) {
    return '/media/opt/IMG-20260713-WA0030.webp';
  }
  return '/media/opt/IMG-20260727-WA0008.webp';
}

/**
 * Super forgiving human date parser.
 * Handles:
 * - "2026-10-24" (ISO)
 * - "24/10/2026" or "24-10-2026" (DD/MM/YYYY - Ghana standard)
 * - "10/24/2026" (MM/DD/YYYY)
 * - "24th October 2026" or "October 24, 2026"
 * - "Oct 24 2026"
 */
export function parseHumanDate(dateStr?: string): Date | null {
  if (!dateStr || !dateStr.trim()) return null;
  const clean = dateStr.trim();

  // Strip ordinal suffixes: "24th" -> "24", "1st" -> "1", etc.
  const sanitized = clean.replace(/(\d+)(st|nd|rd|th)/gi, '$1');

  // Try standard parse
  const standard = new Date(sanitized);
  if (!isNaN(standard.getTime())) {
    return standard;
  }

  // Handle DD/MM/YYYY or DD-MM-YYYY
  const slashParts = clean.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
  if (slashParts) {
    const p1 = parseInt(slashParts[1], 10);
    const p2 = parseInt(slashParts[2], 10);
    const year = parseInt(slashParts[3], 10);
    if (p1 > 12) {
      // Must be DD/MM/YYYY
      return new Date(year, p2 - 1, p1);
    } else if (p2 > 12) {
      // Must be MM/DD/YYYY
      return new Date(year, p1 - 1, p2);
    } else {
      // Default to DD/MM/YYYY (Ghana standard)
      return new Date(year, p2 - 1, p1);
    }
  }

  return null;
}

/**
 * Checks whether a given date string is in the past compared to today (end of day).
 */
export function isDatePast(dateStr: string): boolean {
  const parsed = parseHumanDate(dateStr);
  if (!parsed) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(parsed);
  eventDate.setHours(23, 59, 59, 999);

  return eventDate < today;
}

/**
 * Builds a Google Calendar link for a given event.
 */
export function getGoogleCalendarUrl(event: EventItem): string {
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(`${event.description}\n\nOrganized by Prince Asamany Foundation`);
  const location = encodeURIComponent(event.location);

  // Simple date format YYYYMMDD
  const cleanDate = event.date.replace(/[^0-9]/g, '');
  const dates = cleanDate.length === 8 ? `${cleanDate}/${cleanDate}` : '';

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}${dates ? `&dates=${dates}` : ''}`;
}

/**
 * Fetches events from Google Sheets or returns fallback starter events.
 */
export async function getEvents(): Promise<EventsResponse> {
  const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_EVENTS_ID || process.env.GOOGLE_SHEETS_EVENTS_ID;

  if (!sheetId) {
    // Return sorted fallback events
    const upcoming = fallbackEvents
      .filter((e) => !e.isPast && e.status === 'Published')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const past = fallbackEvents
      .filter((e) => e.isPast && e.status === 'Published')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      upcoming,
      past,
      all: fallbackEvents,
      source: 'fallback',
    };
  }

  try {
    // Google Sheets public CSV export URL
    const csvUrl = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=out:csv`;

    const res = await fetch(csvUrl, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      console.warn(`[Events] Failed to fetch Google Sheet (${res.status}): Falling back to starter data.`);
      return {
        upcoming: fallbackEvents.filter((e) => !e.isPast),
        past: fallbackEvents.filter((e) => e.isPast),
        all: fallbackEvents,
        source: 'fallback',
      };
    }

    const csvText = await res.text();
    const rows = parseCSV(csvText);

    if (rows.length <= 1) {
      // Empty sheet or only header row
      return {
        upcoming: [],
        past: [],
        all: [],
        source: 'google_sheets',
      };
    }

    // Parse header to map columns dynamically - works with both manual sheets and Google Forms
    const header = rows[0].map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const colIndex = {
      title: header.findIndex((h) => !h.includes('timestamp') && (h.includes('title') || h.includes('name') || h.includes('event'))),
      date: header.findIndex((h) => !h.includes('timestamp') && (h.includes('date') || h.includes('when') || h.includes('day'))),
      time: header.findIndex((h) => !h.includes('timestamp') && (h.includes('time') || h.includes('hour') || h.includes('duration'))),
      location: header.findIndex((h) => h.includes('location') || h.includes('venue') || h.includes('where') || h.includes('place')),
      category: header.findIndex((h) => h.includes('category') || h.includes('type') || h.includes('tag') || h.includes('initiative')),
      description: header.findIndex((h) => h.includes('desc') || h.includes('detail') || h.includes('about') || h.includes('summary')),
      image: header.findIndex((h) => h.includes('image') || h.includes('flyer') || h.includes('photo') || h.includes('poster') || h.includes('picture') || h.includes('banner') || h.includes('upload')),
      registration: header.findIndex((h) => h.includes('reg') || h.includes('rsvp') || h.includes('link') || h.includes('url') || h.includes('form') || h.includes('contact')),
      featured: header.findIndex((h) => h.includes('feat')),
      status: header.findIndex((h) => h.includes('status')),
    };

    const parsedEvents: EventItem[] = [];

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const title = (colIndex.title !== -1 ? row[colIndex.title] : row[0]) || '';
      if (!title.trim()) continue; // Skip blank rows

      const rawDate = (colIndex.date !== -1 ? row[colIndex.date] : row[1]) || '';
      const time = colIndex.time !== -1 ? row[colIndex.time] : undefined;
      const location = (colIndex.location !== -1 ? row[colIndex.location] : row[3]) || 'Ejisu Municipal District, Ghana';
      const category = (colIndex.category !== -1 ? row[colIndex.category] : row[4]) || 'Community';
      const description = (colIndex.description !== -1 ? row[colIndex.description] : row[5]) || '';
      const rawImage = colIndex.image !== -1 ? row[colIndex.image] : undefined;
      const registrationUrl = colIndex.registration !== -1 ? row[colIndex.registration] : undefined;
      const featuredVal = colIndex.featured !== -1 ? row[colIndex.featured]?.toLowerCase() : '';
      const featured = featuredVal === 'true' || featuredVal === 'yes' || featuredVal === '1';
      const rawStatus = colIndex.status !== -1 ? row[colIndex.status]?.trim() : 'Published';

      let status: EventItem['status'] = 'Published';
      if (rawStatus.toLowerCase().includes('draft')) status = 'Draft';
      if (rawStatus.toLowerCase().includes('cancel')) status = 'Cancelled';

      // Determine if past
      const isPast = isDatePast(rawDate);

      // If user uploaded or linked an image, normalize it; otherwise give them a stunning branded category visual
      const normalizedImage = normalizeImageUrl(rawImage);
      const finalImage = normalizedImage || getCategoryFallbackImage(category);

      parsedEvents.push({
        id: `event-${r}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`,
        title: title.trim(),
        date: rawDate.trim(),
        time: time?.trim() || undefined,
        location: location.trim(),
        category: category.trim(),
        description: description.trim(),
        imageUrl: finalImage,
        registrationUrl: registrationUrl?.trim() || undefined,
        featured,
        status,
        isPast,
      });
    }

    const visibleEvents = parsedEvents.filter((e) => e.status !== 'Draft');

    const upcoming = visibleEvents
      .filter((e) => !e.isPast)
      .sort((a, b) => {
        const tA = new Date(a.date).getTime();
        const tB = new Date(b.date).getTime();
        if (isNaN(tA) || isNaN(tB)) return 0;
        return tA - tB;
      });

    const past = visibleEvents
      .filter((e) => e.isPast)
      .sort((a, b) => {
        const tA = new Date(a.date).getTime();
        const tB = new Date(b.date).getTime();
        if (isNaN(tA) || isNaN(tB)) return 0;
        return tB - tA; // Most recent past first
      });

    return {
      upcoming,
      past,
      all: visibleEvents,
      source: 'google_sheets',
    };
  } catch (err) {
    console.error('[Events] Error loading Google Sheet events:', err);
    return {
      upcoming: fallbackEvents.filter((e) => !e.isPast),
      past: fallbackEvents.filter((e) => e.isPast),
      all: fallbackEvents,
      source: 'fallback',
    };
  }
}
