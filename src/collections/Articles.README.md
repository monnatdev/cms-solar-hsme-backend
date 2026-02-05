# Articles Collection

## Overview

The Articles collection manages blog posts and content articles for the Solar Cell CMS. It provides a complete content management solution with SEO optimization, rich text editing, and automatic slug generation.

## Features

- ✅ Rich text content with Slate editor
- ✅ Featured image support with Media collection integration
- ✅ Automatic slug generation from title
- ✅ SEO metadata (meta title, description, keywords)
- ✅ Publication status (draft/published)
- ✅ Published date tracking
- ✅ Public read access, admin-only write access
- ✅ Automatic timestamps (createdAt, updatedAt)

## Fields

### Core Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | text | Yes | Article title (max 200 characters) |
| `header` | text | Yes | Article header or subtitle |
| `slug` | text | Yes | URL-friendly version (auto-generated, unique) |
| `excerpt` | textarea | Yes | Short summary (max 200 characters) |
| `content` | richText | Yes | Full article content with formatting |
| `featuredImage` | upload | Yes | Main image (relationship to Media collection) |
| `publishedDate` | date | Yes | Publication date (defaults to current date) |
| `status` | select | Yes | Publication status: 'draft' or 'published' |

### SEO Metadata Group

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `seo.metaTitle` | text | No | SEO title (max 60 characters) |
| `seo.metaDescription` | textarea | No | SEO description (max 160 characters) |
| `seo.keywords` | text | No | Comma-separated keywords |

### Automatic Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (auto-generated) |
| `createdAt` | datetime | Creation timestamp (auto-generated) |
| `updatedAt` | datetime | Last update timestamp (auto-generated) |

## Slug Auto-Generation

The slug field is automatically generated from the title using the `slugifyHook`:

### Behavior

1. **Auto-generation**: If no slug is provided, it's generated from the title
2. **Formatting**: Converts to lowercase, replaces spaces with hyphens
3. **Thai Support**: Preserves Thai characters (Unicode range U+0E00-U+0E7F)
4. **Special Characters**: Removes special characters except hyphens
5. **Cleanup**: Removes leading/trailing hyphens and multiple consecutive hyphens

### Examples

| Title | Generated Slug |
|-------|----------------|
| "Hello World" | "hello-world" |
| "บทความเกี่ยวกับโซล่าเซลล์" | "บทความเกี่ยวกับโซล่าเซลล์" |
| "Solar Cell โซล่าเซลล์ 2024" | "solar-cell-โซล่าเซลล์-2024" |
| "Hello@World!#$%" | "helloworld" |

### Custom Slugs

You can provide a custom slug, which will be formatted using the same rules:

```typescript
// Input: "Custom Slug"
// Output: "custom-slug"
```

## Access Control

| Operation | Access Level | Description |
|-----------|--------------|-------------|
| Read | Public | Anyone can read articles via API |
| Create | Admin only | Only authenticated admins can create |
| Update | Admin only | Only authenticated admins can update |
| Delete | Admin only | Only authenticated admins can delete |

## API Endpoints

### List All Articles

```http
GET /api/articles
```

**Query Parameters:**
- `limit`: Number of results per page (default: 10)
- `page`: Page number (default: 1)
- `where[status][equals]`: Filter by status ('draft' or 'published')
- `sort`: Sort field (e.g., '-publishedDate' for descending)

**Response:**
```json
{
  "docs": [
    {
      "id": "...",
      "title": "Article Title",
      "header": "Article Header",
      "slug": "article-title",
      "excerpt": "Short summary...",
      "content": [...],
      "featuredImage": "...",
      "publishedDate": "2024-01-01T00:00:00.000Z",
      "status": "published",
      "seo": {
        "metaTitle": "SEO Title",
        "metaDescription": "SEO Description",
        "keywords": "keyword1, keyword2"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "totalDocs": 10,
  "limit": 10,
  "totalPages": 1,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null
}
```

### Get Single Article

```http
GET /api/articles/:id
```

**Response:**
```json
{
  "id": "...",
  "title": "Article Title",
  ...
}
```

### Get Article by Slug

```http
GET /api/articles?where[slug][equals]=article-title
```

### Create Article (Admin Only)

```http
POST /api/articles
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Article",
  "header": "Article Header",
  "excerpt": "Short summary",
  "content": [...],
  "featuredImage": "media-id",
  "publishedDate": "2024-01-01T00:00:00.000Z",
  "status": "draft",
  "seo": {
    "metaTitle": "SEO Title",
    "metaDescription": "SEO Description",
    "keywords": "keyword1, keyword2"
  }
}
```

**Note:** The `slug` field is optional and will be auto-generated from the title if not provided.

### Update Article (Admin Only)

```http
PATCH /api/articles/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "published"
}
```

### Delete Article (Admin Only)

```http
DELETE /api/articles/:id
Authorization: Bearer <token>
```

## Admin Panel

### Default Columns

The admin panel displays these columns by default:
- Title
- Published Date
- Status

### Sidebar Fields

These fields appear in the sidebar for better organization:
- Slug
- Status

### Field Descriptions

All fields include helpful descriptions in the admin panel to guide content creators.

## Validation Rules

| Field | Validation |
|-------|------------|
| `title` | Required, max 200 characters |
| `header` | Required |
| `slug` | Required, unique, auto-formatted |
| `excerpt` | Required, max 200 characters |
| `content` | Required |
| `featuredImage` | Required, must be valid Media ID |
| `publishedDate` | Required, valid date |
| `status` | Required, must be 'draft' or 'published' |
| `seo.metaTitle` | Optional, max 60 characters |
| `seo.metaDescription` | Optional, max 160 characters |
| `seo.keywords` | Optional |

## Usage Examples

### Frontend Integration

```typescript
// Fetch published articles
const response = await fetch('http://localhost:3001/api/articles?where[status][equals]=published&sort=-publishedDate');
const data = await response.json();
const articles = data.docs;

// Fetch single article by slug
const response = await fetch('http://localhost:3001/api/articles?where[slug][equals]=my-article');
const data = await response.json();
const article = data.docs[0];
```

### TypeScript Types

The generated TypeScript types are available in `src/payload-types.ts`:

```typescript
import { Article } from './payload-types';

const article: Article = {
  id: '...',
  title: 'Article Title',
  header: 'Article Header',
  slug: 'article-title',
  excerpt: 'Short summary',
  content: [...],
  featuredImage: '...',
  publishedDate: '2024-01-01T00:00:00.000Z',
  status: 'published',
  seo: {
    metaTitle: 'SEO Title',
    metaDescription: 'SEO Description',
    keywords: 'keyword1, keyword2',
  },
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};
```

## Testing

Unit tests for the slug generation logic are available in `src/hooks/slugify.test.ts`.

Run tests:
```bash
npm test
```

## Requirements Mapping

This collection satisfies the following requirements from the design document:

- **Requirement 5.1**: Article display with header, title, content, and media
- **Requirement 5.2**: Rich text content support
- **Requirement 5.4**: SEO metadata support
- **Requirement 7.1**: List all articles in CMS
- **Requirement 7.2**: Create new articles
- **Requirement 7.3**: Edit existing articles
- **Requirement 7.4**: Delete articles
- **Requirement 7.5**: SEO metadata management
- **Requirement 7.6**: API integration for frontend

## Related Collections

- **Media**: Used for featured images
- **Users**: Used for authentication and access control

## Notes

- The slug field has an index for faster queries by slug
- The rich text editor uses Slate (configured in payload.config.ts)
- SEO metadata fields are optional but recommended for better search engine visibility
- The published date picker includes both date and time selection
- Draft articles are not visible to public users (frontend should filter by status)
