# Collections

This directory contains all Payload CMS collection definitions for the Solar Cell CMS.

## Media Collection

The Media collection handles file uploads for images and videos used throughout the CMS.

### Configuration

**File:** `Media.ts`

**Features:**
- **Static URL:** `/media` - Public URL path for accessing uploaded files
- **Static Directory:** `media` - Local directory where files are stored
- **Supported MIME Types:** `image/*`, `video/*` - Accepts all image and video formats

### Image Sizes

The Media collection automatically generates three optimized image sizes:

1. **Thumbnail** (400x300)
   - Used for admin panel thumbnails and small previews
   - Position: centre

2. **Card** (768x576)
   - Used for card layouts in Services, Reviews, and Articles
   - Position: centre

3. **Hero** (1920x1080)
   - Used for hero sections and full-width images
   - Position: centre

### Fields

- **alt** (text, optional)
  - Alternative text for accessibility and SEO
  - Helps screen readers describe images
  - Improves search engine optimization

### Access Control

- **Read:** Public (anyone can view media files)
- **Create:** Admin only (requires authentication)
- **Update:** Admin only (requires authentication)
- **Delete:** Admin only (requires authentication)

### Usage

The Media collection is used by other collections through the `upload` field type:

```typescript
{
  name: 'featuredImage',
  type: 'upload',
  relationTo: 'media',
  required: true,
}
```

### API Endpoints

- `GET /api/media` - List all media files
- `GET /api/media/:id` - Get single media file
- `POST /api/media` - Upload new media file (admin only)
- `PATCH /api/media/:id` - Update media metadata (admin only)
- `DELETE /api/media/:id` - Delete media file (admin only)

### File Access

Uploaded files are accessible at:
- Original: `http://localhost:3001/media/{filename}`
- Thumbnail: `http://localhost:3001/media/{filename}-thumbnail.{ext}`
- Card: `http://localhost:3001/media/{filename}-card.{ext}`
- Hero: `http://localhost:3001/media/{filename}-hero.{ext}`

### Requirements Validation

This collection satisfies the following requirements:

- **Requirement 3.2:** Service cards display images (header)
- **Requirement 4.2:** Review cards display images (header)
- **Requirement 5.2:** Articles display images or videos

The Media collection provides the infrastructure for all image and video content used throughout the CMS.
