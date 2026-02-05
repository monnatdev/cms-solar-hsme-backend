import { CollectionConfig } from 'payload/types';
import { isAdmin, isPublic } from '../access/isAdmin';
import { slugifyHook } from '../hooks/slugify';

const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate', 'status'],
    description: 'Manage blog articles and content',
  },
  access: {
    read: () => true, // Allow all
    create: () => true, // Allow all
    update: () => true, // Allow all
    delete: () => true, // Allow all
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 200,
      label: 'Title',
      admin: {
        description: 'Article title (max 200 characters)',
      },
    },
    {
      name: 'header',
      type: 'text',
      required: true,
      label: 'Header',
      admin: {
        description: 'Article header or subtitle',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly version of title (auto-generated if not provided)',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [slugifyHook],
      },
      index: true, // Add index for faster queries by slug
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 200,
      label: 'Excerpt',
      admin: {
        description: 'Short summary of the article (max 200 characters)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
      admin: {
        description: 'Full article content with rich text formatting',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
      admin: {
        description: 'Main image for the article',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'Published Date',
      defaultValue: () => new Date().toISOString(),
      admin: {
        description: 'Date when the article was/will be published',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      label: 'Status',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      admin: {
        description: 'Article publication status',
        position: 'sidebar',
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Metadata',
      admin: {
        description: 'Search engine optimization metadata',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          maxLength: 60,
          label: 'Meta Title',
          admin: {
            description: 'SEO title (max 60 characters, leave empty to use article title)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          label: 'Meta Description',
          admin: {
            description: 'SEO description (max 160 characters, leave empty to use excerpt)',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Keywords',
          admin: {
            description: 'Comma-separated keywords for SEO',
          },
        },
      ],
    },
  ],
  timestamps: true, // Automatically add createdAt and updatedAt fields
};

export default Articles;
