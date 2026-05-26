export const siteName = 'Active Growth Groups'
export const siteDescription =
  'A modern nonprofit landing page for Active Growth Groups focused on youth empowerment, community development, and practical support programs.'
export const siteUrl = 'https://activegrowthgroups.com.ng'
export const seoImagePath = '/seo-image.jpg'
export const seoImageUrl = new URL(seoImagePath, siteUrl).href
export const seoImageAlt =
  'Active Growth Groups social preview with the brand logo and a community support workspace image.'
export const seoImageWidth = 886
export const seoImageHeight = 1280

export const pageUrl = (path = '/') => new URL(path, siteUrl).href
