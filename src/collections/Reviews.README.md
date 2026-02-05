# Reviews Collection

## Overview

The Reviews collection manages installation reviews and project showcases for the Solar Cell CMS. It allows administrators to create and manage reviews of completed solar cell installation projects, showcasing the quality of work and building customer confidence.

## Purpose

- Display installation project reviews on the frontend
- Showcase completed work with images and descriptions
- Link reviews to related services
- Build customer trust through real project examples

## Fields

### Required Fields

- **title** (text, max 200 chars): Review title
- **header** (text): Review header or subtitle
- **description** (textarea, max 500 chars): Review description
- **featuredImage** (upload): Main image for the review
- **status** (select): Publication status (draft/published)

### Optional Fields

- **gallery** (array): Additional images showcasing the installation project
  - Each gallery item contains an image upload
- **relatedService** (relationship): Link to a related service from the Services collection

### Auto-generated Fields

- **id**: Unique identifier (auto-generated)
- **createdAt**: Creation timestamp (auto-generated)
- **updatedAt**: Last update timestamp (auto-generated)

## Access Control

- **Read**: Public (anyone can read published reviews via API)
- **Create**: Admin only
- **Update**: Admin only
- **Delete**: Admin only

## Relationships

- **relatedService**: Many-to-one relationship with Services collection
  - A review can be linked to one service (optional)
  - A service can have multiple reviews

## API Endpoints

When the Payload CMS server is running, the following endpoints are available:

- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get a single review by ID
- `POST /api/reviews` - Create a new review (admin only)
- `PATCH /api/reviews/:id` - Update a review (admin only)
- `DELETE /api/reviews/:id` - Delete a review (admin only)

## Usage Example

### Creating a Review via Admin Panel

1. Log in to the Payload CMS admin panel
2. Navigate to "Reviews" in the sidebar
3. Click "Create New"
4. Fill in the required fields:
   - Title: "บ้านคุณสมชาย - ระบบ 5kW"
   - Header: "ติดตั้งระบบโซล่าเซลล์บนหลังคา"
   - Description: "ติดตั้งระบบโซล่าเซลล์ขนาด 5kW สำหรับบ้านเดี่ยว ช่วยลดค่าไฟได้ 80%"
   - Featured Image: Upload main project image
   - Gallery: Upload additional project images (optional)
   - Related Service: Select a service (optional)
   - Status: Select "Published" to make it visible on the frontend
5. Click "Save"

### Querying Reviews via API

```typescript
// Fetch all published reviews
const response = await fetch('http://localhost:3001/api/reviews?where[status][equals]=published');
const data = await response.json();

// Fetch a review with related service populated
const response = await fetch('http://localhost:3001/api/reviews/:id?depth=1');
const data = await response.json();
```

## Design Considerations

- **Card Layout**: Reviews are displayed in a card layout on the frontend with a unique design different from Service and Article cards
- **Image Gallery**: Supports multiple images to showcase the installation project from different angles
- **Service Relationship**: Optional relationship allows linking reviews to specific services, helping users see real examples of each service
- **Status Control**: Draft/published status allows admins to prepare reviews before making them public

## Requirements Validation

This collection validates the following requirements:

- **Requirement 4.1**: Display reviews in card layout
- **Requirement 4.2**: Show image, header, and title in review cards
- **Requirement 4.3**: Link reviews to related services
- **Requirement 4.4**: Manage reviews through CMS
- **Requirement 9.1-9.6**: CMS review management (list, create, edit, delete, relationship)

## Related Files

- `backend/src/collections/Reviews.ts` - Collection configuration
- `backend/src/collections/Services.ts` - Related Services collection
- `backend/src/access/isAdmin.ts` - Access control functions
