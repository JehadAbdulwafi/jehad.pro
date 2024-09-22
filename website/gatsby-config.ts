import type { GatsbyConfig } from "gatsby"
const path = require(`path`)
const siteUrl = process.env.URL || `https://jehad.pro`
const config: GatsbyConfig = {
  siteMetadata: {
    title: `Jehad.Pro`,
    description: `Experts from all your network providers integrated into one powerful platform.`,
    author: `@jehadabdulwafi`,
    email: `hello@jehad.pro`,
    siteUrl: `https://jehad.pro`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-optimize-svgs`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fonts`,
        path: `${__dirname}/src/assets/fonts/`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jehad.Pro`,
        short_name: `jehad.pro`,
        start_url: `/`,
        background_color: `#02021e`,
        theme_color: `#02021e`,
        display: `minimal-ui`,
        icon: `static/icon.png`,
        description: `Experts from all your network providers integrated into one powerful platform.`,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@src': 'src',
          '@components': 'src/components',
          '@pages': 'src/pages',
          '@scenes': 'src/scenes',
          '@hooks': 'src/hooks',
          '@assets': 'src/assets',
          '@contexts': 'src/contexts',
          '@services': 'src/services',
          '@helpers': 'src/helpers',
          '@types': 'src/types',
          '@styles': 'src/styles',
          '@functions': 'src/styles/functions',
          '@constants': 'src/constants',
        },
        extensions: ['js', 'ts', 'tsx', 'jsx', 'json', 'css', 'sass', 'scss'],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://jehad.pro',
        policy: [{ userAgent: '*', allow: ['/'] }]
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://jehad.pro`,
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
        }
      `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
        }) => {
          return allPages.map(page => {
            return { ...page, path: page.path }
          })
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
            changefreq: `daily`,
            priority: 0.7,
          }
        },
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [
          `/`,
          `/portfolio/`,
          `/services/`,
          `/blog/`,
          `/blog/*`,
          `/contacts/`,
          `/thanks/`,
          `/404/`,
        ],
      },
    },
  ],
}

export default config
