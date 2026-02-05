# Leads Collection

## Overview

The Leads collection manages contact form submissions from website visitors. It stores lead information (name, phone, email) and is designed to be **read-only** for admins - leads cannot be edited or deleted once created.

## Features

### Fields

1. **fullName** (text, required)
   - Full name of the lead
   - Min length: 2 characters
   - Max length: 100 characters
   - Read-only in admin panel

2. **phone** (text, required)
   - Phone number (9-10 digits)
   - Auto-sanitized before validation (removes spaces, dashes, parentheses)
   - Validation: Must be 9-10 digits
   - Read-only in admin panel

3. **email** (email, required)
   - Email address of the lead
   - Built-in email format validation
   - Read-only in admin panel

4. **createdAt** (timestamp, auto-generated)
   - Automatically added when lead is created

5. **updatedAt** (timestamp, auto-generated)
   - Automatically updated (though updates are not allowed)

### Access Control

- **Read**: Admin only (`isAdmin`)
- **Create**: Public (anyone can create via API)
- **Update**: Disabled (no one can update)
- **Delete**: Disabled (no one can delete)

This ensures that lead data remains immutable once submitted, maintaining data integrity for business records.

### Hooks

#### beforeValidate Hook: `sanitizePhoneHook`

Sanitizes phone numbers before validation by removing common formatting characters:
- Spaces
- Dashes (-)
- Parentheses ()

Example:
- Input: `"081-234-5678"` → Output: `"0812345678"`
- Input: `"(081) 234 5678"` → Output: `"0812345678"`

#### afterChange Hook: `logLeadHook`

Logs new lead submissions to the console for monitoring purposes. Logs:
- Lead ID
- Full name
- Phone number
- Email
- Creation timestamp

Example log output:
```
New lead received: {
  id: '507f1f77bcf86cd799439011',
  fullName: 'สมชาย ใจดี',
  phone: '0812345678',
  email: 'somchai@example.com',
  createdAt: '2024-01-15T10:30:00.000Z'
}
```

## API Usage

### Create a Lead (Public)

```bash
POST /api/leads
Content-Type: application/json

{
  "fullName": "สมชาย ใจดี",
  "phone": "081-234-5678",
  "email": "somchai@example.com"
}
```

Response (201 Created):
```json
{
  "doc": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "สมชาย ใจดี",
    "phone": "0812345678",
    "email": "somchai@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Get All Leads (Admin Only)

```bash
GET /api/leads
Authorization: Bearer <admin-token>
```

Response (200 OK):
```json
{
  "docs": [
    {
      "id": "507f1f77bcf86cd799439011",
      "fullName": "สมชาย ใจดี",
      "phone": "0812345678",
      "email": "somchai@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "totalDocs": 1,
  "limit": 10,
  "page": 1,
  "totalPages": 1
}
```

### Get Single Lead (Admin Only)

```bash
GET /api/leads/:id
Authorization: Bearer <admin-token>
```

## Validation Rules

### Phone Number Validation

- **Pattern**: `/^[0-9]{9,10}$/`
- **Valid examples**:
  - `"0812345678"` (10 digits)
  - `"812345678"` (9 digits)
- **Invalid examples**:
  - `"081-234-5678"` (contains dashes - will be auto-sanitized)
  - `"12345"` (too short)
  - `"abc123"` (contains letters)

### Email Validation

Uses Payload's built-in email validation:
- Must contain `@` symbol
- Must have domain extension
- Standard email format

### Full Name Validation

- Minimum 2 characters
- Maximum 100 characters
- Supports Thai and English characters

## Requirements Mapping

This collection satisfies the following requirements:

- **Requirement 6.1**: Form fields (fullName, phone, email)
- **Requirement 6.2**: Save lead data to CMS
- **Requirement 6.3**: Validation and error messages
- **Requirement 6.4**: No auto-reply system
- **Requirement 10.1**: Admin can view all leads
- **Requirement 10.2**: Admin can view lead details
- **Requirement 10.3**: Display creation timestamp
- **Requirement 10.4**: No edit/delete functionality
- **Requirement 10.5**: Frontend can submit via API

## Admin Panel Usage

### Viewing Leads

1. Log in to Payload CMS admin panel
2. Navigate to "Leads" in the sidebar
3. View list of all leads with columns:
   - Full Name
   - Phone
   - Email
   - Created At

### Lead Details

Click on any lead to view full details. All fields are read-only and cannot be modified.

### Restrictions

- ❌ Cannot edit lead information
- ❌ Cannot delete leads
- ✅ Can view all leads
- ✅ Can search and filter leads
- ✅ Can export lead data

## Testing

### Manual Testing

1. **Create Lead via API**:
   ```bash
   curl -X POST http://localhost:3001/api/leads \
     -H "Content-Type: application/json" \
     -d '{
       "fullName": "Test User",
       "phone": "0812345678",
       "email": "test@example.com"
     }'
   ```

2. **Verify Phone Sanitization**:
   ```bash
   curl -X POST http://localhost:3001/api/leads \
     -H "Content-Type: application/json" \
     -d '{
       "fullName": "Test User",
       "phone": "081-234-5678",
       "email": "test@example.com"
     }'
   ```
   Should save as `"0812345678"`

3. **Test Validation**:
   ```bash
   # Invalid phone (too short)
   curl -X POST http://localhost:3001/api/leads \
     -H "Content-Type: application/json" \
     -d '{
       "fullName": "Test User",
       "phone": "123",
       "email": "test@example.com"
     }'
   ```
   Should return validation error

### Automated Testing

Unit tests should cover:
- Phone sanitization hook
- Phone validation (valid/invalid formats)
- Email validation
- Full name length validation
- Access control (public create, admin read, no update/delete)
- Logging hook

## Security Considerations

1. **Public Create Access**: The collection allows public creation via API for form submissions. Ensure:
   - Rate limiting is implemented at the API gateway level
   - CAPTCHA or similar anti-spam measures on the frontend
   - Input sanitization to prevent XSS attacks

2. **Read-Only Fields**: All fields are marked as read-only in the admin panel to prevent accidental modifications.

3. **No Deletion**: Leads cannot be deleted to maintain business records and comply with data retention policies.

4. **Admin-Only Read**: Only authenticated admins can view lead data, protecting customer privacy.

## Future Enhancements

Potential improvements for future versions:

1. **Lead Status**: Add status field (new, contacted, converted, etc.)
2. **Notes**: Allow admins to add private notes to leads
3. **Assignment**: Assign leads to specific sales representatives
4. **Email Notifications**: Send email alerts when new leads arrive
5. **Export**: Bulk export leads to CSV/Excel
6. **Analytics**: Track lead sources and conversion rates
