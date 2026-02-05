import { CollectionConfig } from 'payload/types';
import { isAdmin, isPublic } from '../access/isAdmin';

const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'relatedService', 'status'],
    description: 'Manage installation reviews and project showcases',
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
        description: 'Review title (max 200 characters)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly version of the title (auto-generated)',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' || operation === 'update') {
              if (data?.title && !data?.slug) {
                // Auto-generate slug from title
                data.slug = data.title
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, '') // Remove special characters
                  .replace(/\s+/g, '-') // Replace spaces with hyphens
                  .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
                  .trim();
              }
            }
            return data?.slug;
          },
        ],
      },
    },
    {
      name: 'header',
      type: 'text',
      required: true,
      label: 'Header',
      admin: {
        description: 'Review header or subtitle',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 500,
      label: 'Description',
      admin: {
        description: 'Review description (max 500 characters)',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
      admin: {
        description: 'Main image for the review',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      admin: {
        description: 'Additional images showcasing the installation project',
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
      name: 'relatedService',
      type: 'relationship',
      relationTo: 'services',
      required: false,
      label: 'Related Service',
      admin: {
        description: 'Link this review to a related service (optional)',
        position: 'sidebar',
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
        description: 'Review publication status',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true, // Automatically add createdAt and updatedAt fields
};

export default Reviews;
