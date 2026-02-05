import { CollectionConfig } from 'payload/types';
import { isAdmin, isPublic } from '../access/isAdmin';
import { slugifyHook } from '../hooks/slugify';

const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status'],
    description: 'Manage solar cell services offered by the business',
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
        description: 'Service title (max 200 characters)',
      },
    },
    {
      name: 'header',
      type: 'text',
      required: true,
      label: 'Header',
      admin: {
        description: 'Service header or subtitle',
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
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Description',
      admin: {
        description: 'Full service description with rich text formatting',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
      admin: {
        description: 'Main image for the service',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      admin: {
        description: 'Additional images showcasing the service',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
      ],
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
        description: 'Service publication status',
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
            description: 'SEO title (max 60 characters, leave empty to use service title)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          label: 'Meta Description',
          admin: {
            description: 'SEO description (max 160 characters)',
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

export default Services;
