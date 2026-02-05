import { buildConfig } from 'payload/config';
import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';
import Media from './collections/Media';
import Articles from './collections/Articles';
import Services from './collections/Services';
import Reviews from './collections/Reviews';
import Leads from './collections/Leads';

export default buildConfig({
  // Server URL for media files
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',

  // Admin panel configuration
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Solar Cell CMS',
      favicon: '/assets/favicon.ico',
      ogImage: '/assets/og-image.jpg',
    },
  },

  // Editor configuration
  editor: slateEditor({}),

  // Collections will be added here
  collections: [
    // Users collection for authentication
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    // Media collection for file uploads
    Media,
    // Articles collection for blog posts
    Articles,
    // Services collection for solar cell services
    Services,
    // Reviews collection for installation reviews
    Reviews,
    // Leads collection for contact form submissions
    Leads,
  ],

  // Database configuration
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/solar-cell-cms',
  }),

  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  // GraphQL configuration (optional)
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },

  // CORS configuration
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://your-site.vercel.app',
    'https://*.vercel.app', // สำหรับ preview deployments
    'http://localhost:3001', // สำหรับ local development
  ],

  // CSRF protection
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://your-site.vercel.app',
    'https://*.vercel.app',
    'http://localhost:3001',
  ],
});
