/**
 * Centralized site configuration.
 *
 * Single source of truth for contact details, addresses, and social links so
 * they are consistent across the whole site. Update values here once.
 */

export interface SiteConfig {
    name: string;
    tagline: string;
    year: number;
    url: string;
    phone: { display: string; tel: string };
    email: string;
    address: { box: string; line1: string; line2: string; city: string };
    social: Record<string, string>;
    donation: {
        bank: {
            name: string;
            branch: string;
            accountName: string;
            accounts: { label: string; value: string }[];
        };
        momo: {
            name: string;
            subtitle: string;
            number: string;
            accountName: string;
            merchantId: string;
        };
    };
}

export const siteConfig: SiteConfig = {
    name: 'Prince Asamany Foundation',
    tagline: 'Hope, Development & Opportunity for All',
    year: 2026,
    // Base URL used for metadata / Open Graph. Update to your real deployed domain.
    url: 'https://princeasamanyfoundation.org',

    phone: {
        // Display format shown to visitors
        display: '(+233) 55 304 5832',
        // Value used in tel: links (no leading 0 after country code)
        tel: '+233553045832',
    },

    // NOTE: verify this address is correct — it is used for the contact form /
    // footer email. If you use a different inbox, update it here.
    email: 'pasamanyfoundation@gmail.com',

    address: {
        box: 'P. O. Box EJ 488',
        line1: 'Akyawkrom, Ejisu Municipal Assembly',
        line2: 'Ashanti Region, Ghana',
        city: 'Akyawkrom',
    },

    // Leave blank (empty string) to hide a social link. Add real URLs when known.
    social: {
        facebook: 'https://www.facebook.com/share/1DLhECoCuQ/?mibextid=wwXIfr',
        twitter: '',
        instagram: '',
    },

    // Donation details shown on the donate page
    donation: {
        bank: {
            name: 'Guaranty Trust Bank',
            branch: 'Ahodwo Branch',
            accountName: 'Prince Asamany Foundation LBG',
            accounts: [
                { label: 'Cedis Account No', value: '3306001000541' },
                { label: 'Dollar Account No', value: '3306002000569' },
                { label: 'Pound Account No', value: '3306003000541' },
                { label: 'Euro Account No', value: '3306004000569' },
            ],
        },
        momo: {
            name: 'MTN MoMo',
            subtitle: 'Mobile Money Transfer',
            number: '+233 55 304 5832',
            accountName: 'Prince Asamany Foundation LBG',
            merchantId: '518033',
        },
    },
};

/** Shared navigation links (Donate is rendered separately as a CTA) */
export const navLinks: { label: string; href: string }[] = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Stories', href: '/stories' },
    { label: 'Get Involved', href: '/get-involved' },
    { label: 'Contact', href: '/contact' },
];

/** Render-only phone display, e.g. "(+233) 55 304 5832" */
export const PHONE_DISPLAY = siteConfig.phone.display;

/** tel: href value, e.g. "+233553045832" */
export const PHONE_TEL = siteConfig.phone.tel;

/** mailto: href value */
export const EMAIL = siteConfig.email;
