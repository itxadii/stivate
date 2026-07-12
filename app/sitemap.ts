import { MetadataRoute } from 'next'
import { solutions } from './solutions/solutionsData'
import { industries } from './industries/industriesData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stivate.com'
  // Static modification date representing the latest site update (2026-07-13)
  const lastModified = new Date('2026-07-13')
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
    },
    {
      url: `${baseUrl}/work`,
      lastModified,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
    },
    {
      url: `${baseUrl}/websites`,
      lastModified,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified,
    },
  ];

  const caseStudyPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/work/i3pl`,
      lastModified,
    },
    {
      url: `${baseUrl}/work/cre-crm`,
      lastModified,
    },
  ];

  const solutionPages: MetadataRoute.Sitemap = solutions.map((sol) => ({
    url: `${baseUrl}/solutions/${sol.slug}`,
    lastModified,
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${baseUrl}/industries/${ind.slug}`,
    lastModified,
  }));

  return [...staticPages, ...caseStudyPages, ...solutionPages, ...industryPages];
}
