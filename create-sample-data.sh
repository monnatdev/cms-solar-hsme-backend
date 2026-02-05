#!/bin/bash

# Script to create sample data for testing
# This helps populate the CMS with test data

BASE_URL="http://localhost:3001"
API_URL="${BASE_URL}/api"

echo "========================================="
echo "Creating Sample Data for Payload CMS"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Create sample leads
echo "Creating sample leads..."

curl -s -X POST "${API_URL}/leads" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "สมชาย ใจดี",
    "phone": "0812345678",
    "email": "somchai@example.com"
  }' > /dev/null

curl -s -X POST "${API_URL}/leads" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "สมหญิง รักษ์ดี",
    "phone": "0898765432",
    "email": "somying@example.com"
  }' > /dev/null

curl -s -X POST "${API_URL}/leads" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "วิชัย พลังงาน",
    "phone": "0891234567",
    "email": "wichai@example.com"
  }' > /dev/null

echo -e "${GREEN}✓ Created 3 sample leads${NC}"
echo ""

echo "========================================="
echo "Sample Data Creation Complete"
echo "========================================="
echo ""
echo "Created:"
echo "  - 3 sample leads"
echo ""
echo -e "${YELLOW}Note:${NC} Articles, Services, and Reviews must be created"
echo "through the admin panel because they require:"
echo "  - Rich text content"
echo "  - Image uploads"
echo "  - Complex relationships"
echo ""
echo "Please use the admin panel at:"
echo "  ${BASE_URL}/admin"
echo ""
echo "Follow the guide in ADMIN_PANEL_TEST_GUIDE.md"
echo ""
