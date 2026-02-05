import { FieldHook } from 'payload/types';

/**
 * Hook to auto-generate URL-friendly slugs from title
 * Converts Thai and English text to lowercase, replaces spaces with hyphens
 * Removes special characters except hyphens
 */
export const formatSlug = (val: string): string => {
  return val
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\u0E00-\u0E7F-]+/g, '') // Remove special chars, keep Thai chars
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Remove leading hyphens
    .replace(/-+$/, ''); // Remove trailing hyphens
};

/**
 * Payload field hook to auto-generate slug from title
 * Only generates if slug is not provided
 */
export const slugifyHook: FieldHook = ({ data, operation, value }) => {
  // If slug is already provided, use it (formatted)
  if (value) {
    return formatSlug(value);
  }

  // Auto-generate from title on create or update
  if (operation === 'create' || operation === 'update') {
    if (data?.title) {
      return formatSlug(data.title);
    }
  }

  return value;
};
