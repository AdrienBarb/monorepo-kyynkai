/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.kyynk.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/*'],
  additionalPaths: async (config) => [await config.transform(config, '/')],
};
