import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', 
      allow: '/', 
      disallow: [
        '/api/', 
        '/admin/', 
        '/dashboard/', 
      ], 
    },
    // Ini penting banget buat ngasih tau Google peta situs lu (kalau lu udah bikin sitemap)
    sitemap: 'https://ixiera.id/sitemap.xml', 
  };
}