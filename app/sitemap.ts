import type { MetadataRoute } from 'next';
import { stories } from '@/lib/content';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');

  const staticPages: MetadataRoute.Sitemap = [
    { path: '/', priority: 1 },
    { path: '/about', priority: 0.8 },
    { path: '/programs', priority: 0.8 },
    { path: '/stories', priority: 0.8 },
    { path: '/get-involved', priority: 0.8 },
    { path: '/contact', priority: 0.8 },
    { path: '/donate', priority: 0.8 },
  ].map(({ path, priority }) => ({
    url: `${base}${path}`,
    changeFrequency: 'monthly',
    priority,
  }));

  const storyPages: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${base}/stories/${story.id}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...storyPages];
}
