# Services Collection

## Overview

The Services collection manages solar cell services offered by the business. It provides a comprehensive content management system for service information, including descriptions, images, and SEO metadata.

## Features

### Fields

1. **title** (text, required)
   - Service title
   - Max 200 characters
   - Used as the display title

2. **header** (text, required)
   - Service header or subtitle
   - Provides additional context

3. **slug** (text, required, unique)
   - URL-friendly version of the title
   - Auto-generated from title if not provided
   - Can be manually overridden
   - Indexed for fast queries

4. **description** (richText, required)
   - Full service description
   - Supports rich text formatting (bold, italic, lists, links, etc.)
   - Allows detailed service information

5. **featuredImage** (upload, required)
   - Main image for the service
   - Relationship to Media collection
   - Used in service cards and detail pages

6. **gallery** (array)
   - Additional images showcasing the service
   - Each item contains an image upload
   - Optional field for multiple service photos

7. **status** (select, required)
   - Publication status: 'draft' or 'published'
   - Default: 'draft'
   - Controls visibility on frontend

8. **seo** (group)
   - SEO metadata for search engine optimization
   - Fields:
     - **metaTitle**: SEO title (max 60 characters)
     - **metaDescription**: SEO description (max 160 characters)
     - **keywords**: Comma-separated keywords

### Access Control

- **Read**: Public (anyone can read published services via API)
- **Create**: Admin only
- **Update**: Admin only
- **Delete**: Admin only

### Hooks

- **beforeValidate**: Slug auto-generation hook
  - Automatically generates URL-friendly slug from title
  - Formats existing slugs to be URL-safe
  - Supports both Thai and English characters

### Timestamps

- **createdAt**: Automatically added when service is created
- **updatedAt**: Automatically updated when service is modified

## Usage

### Creating a Service

1. Log in to Payload CMS admin panel
2. Navigate to Services collection
3. Click "Create New"
4. Fill in required fields:
   - Title
   - Header
   - Description (rich text)
   - Featured Image
5. Optionally add:
   - Gallery images
   - Custom slug (or let it auto-generate)
   - SEO metadata
6. Set status to 'published' when ready
7. Save

### Slug Auto-Generation

The slug is automatically generated from the title:
- Converts to lowercase
- Replaces spaces with hyphens
- Removes special characters (except hyphens)
- Supports Thai characters (Unicode range U+0E00-U+0E7F)

Example:
- Title: "Solar Panel Installation" → Slug: "solar-panel-installation"
- Title: "ติดตั้งโซล่าเซลล์" → Slug: "ติดตั้งโซล่าเซลล์"

### API Endpoints

The Services collection exposes the following REST API endpoints:

```
GET    /api/services              - List all services
GET    /api/services/:id          - Get service by ID
GET    /api/services/slug/:slug   - Get service by slug
POST   /api/services              - Create new service (Admin only)
PATCH  /api/services/:id          - Update service (Admin only)
DELETE /api/services/:id          - Delete service (Admin only)
```

### Query Examples

**Get all published services:**
```javascript
const response = await fetch('http://localhost:3001/api/services?where[status][equals]=published');
const data = await response.json();
```

**Get service by slug:**
```javascript
const response = await fetch('http://localhost:3001/api/services?where[slug][equals]=solar-panel-installation');
const data = await response.json();
```

**Get service with populated media:**
```javascript
const response = await fetch('http://localhost:3001/api/services/:id?depth=1');
const data = await response.json();
```

## Requirements Mapping

This collection satisfies the following requirements:

- **3.1**: Display services in card layout
- **3.2**: Show image, header, and title on service cards
- **3.3**: Navigate to service detail page on click
- **3.4**: Manage services through CMS
- **3.5**: Support SEO metadata for each service
- **8.1**: Display list of all services in CMS
- **8.2**: Support creating new services
- **8.3**: Support editing existing services
- **8.4**: Support deleting services
- **8.5**: Allow entering SEO metadata when creating/editing
- **8.6**: Frontend retrieves services from Payload CMS via API

## Design Considerations

### Service Card Design

The service card layout should be distinct from Review Card and Article Card:
- Emphasize the featured image
- Clear, prominent title and header
- Professional, business-oriented styling
- Call-to-action for viewing details

### Gallery Implementation

The gallery field allows multiple images:
- Useful for showcasing different aspects of the service
- Can display before/after photos
- Supports project examples

### SEO Best Practices

- Use descriptive, keyword-rich titles
- Write compelling meta descriptions (under 160 characters)
- Include relevant keywords
- Ensure slug is readable and descriptive

## Related Collections

- **Media**: Stores featured images and gallery images
- **Reviews**: Can reference services via relatedService field
- **Users**: Admin users who manage services

## Testing

### Manual Testing Checklist

- [ ] Create a new service with all required fields
- [ ] Verify slug auto-generation works
- [ ] Upload featured image and gallery images
- [ ] Add SEO metadata
- [ ] Publish service and verify it appears in API
- [ ] Update service and verify changes persist
- [ ] Test slug uniqueness constraint
- [ ] Verify access control (public read, admin write)

### API Testing

Test the following scenarios:
1. GET all services (should return published services)
2. GET service by slug (should return correct service)
3. POST new service without auth (should fail)
4. POST new service with admin auth (should succeed)
5. PATCH service with admin auth (should succeed)
6. DELETE service with admin auth (should succeed)

## Troubleshooting

### Slug Already Exists Error

If you get a "slug already exists" error:
1. Check if another service has the same slug
2. Manually provide a unique slug
3. Modify the title to generate a different slug

### Image Upload Issues

If images fail to upload:
1. Check file size (should be reasonable)
2. Verify MIME type is allowed (image/*)
3. Check media directory permissions
4. Ensure Media collection is properly configured

### Rich Text Not Rendering

If rich text content doesn't display properly:
1. Verify Slate editor is configured in payload.config.ts
2. Check frontend rich text renderer implementation
3. Ensure proper HTML sanitization

## Future Enhancements

Potential improvements for the Services collection:

1. **Pricing Information**: Add optional pricing fields
2. **Service Categories**: Add taxonomy for service types
3. **Related Services**: Add relationship to suggest similar services
4. **Testimonials**: Link customer testimonials to specific services
5. **Service Duration**: Add estimated time for service completion
6. **Availability**: Add scheduling/availability information
