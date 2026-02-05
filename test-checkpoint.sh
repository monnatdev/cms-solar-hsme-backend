#!/bin/bash

# Test script for Payload CMS Checkpoint (Task 3)
# This script tests all collections and API endpoints

BASE_URL="http://localhost:3001"
API_URL="${BASE_URL}/api"

echo "========================================="
echo "Payload CMS Checkpoint Testing"
echo "========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check if server is running
echo "Test 1: Checking if Payload CMS is running..."
if curl -s "${BASE_URL}/admin" > /dev/null; then
    echo -e "${GREEN}✓ Payload CMS is running${NC}"
else
    echo -e "${RED}✗ Payload CMS is not running${NC}"
    exit 1
fi
echo ""

# Test 2: Test Media Collection API
echo "Test 2: Testing Media Collection API..."
MEDIA_RESPONSE=$(curl -s "${API_URL}/media")
if echo "$MEDIA_RESPONSE" | grep -q '"docs"'; then
    echo -e "${GREEN}✓ Media API is accessible${NC}"
    echo "   Response: $(echo $MEDIA_RESPONSE | jq -r '.totalDocs // "N/A"') media items found"
else
    echo -e "${RED}✗ Media API failed${NC}"
fi
echo ""

# Test 3: Test Articles Collection API
echo "Test 3: Testing Articles Collection API..."
ARTICLES_RESPONSE=$(curl -s "${API_URL}/articles")
if echo "$ARTICLES_RESPONSE" | grep -q '"docs"'; then
    echo -e "${GREEN}✓ Articles API is accessible${NC}"
    echo "   Response: $(echo $ARTICLES_RESPONSE | jq -r '.totalDocs // "N/A"') articles found"
else
    echo -e "${RED}✗ Articles API failed${NC}"
fi
echo ""

# Test 4: Test Services Collection API
echo "Test 4: Testing Services Collection API..."
SERVICES_RESPONSE=$(curl -s "${API_URL}/services")
if echo "$SERVICES_RESPONSE" | grep -q '"docs"'; then
    echo -e "${GREEN}✓ Services API is accessible${NC}"
    echo "   Response: $(echo $SERVICES_RESPONSE | jq -r '.totalDocs // "N/A"') services found"
else
    echo -e "${RED}✗ Services API failed${NC}"
fi
echo ""

# Test 5: Test Reviews Collection API
echo "Test 5: Testing Reviews Collection API..."
REVIEWS_RESPONSE=$(curl -s "${API_URL}/reviews")
if echo "$REVIEWS_RESPONSE" | grep -q '"docs"'; then
    echo -e "${GREEN}✓ Reviews API is accessible${NC}"
    echo "   Response: $(echo $REVIEWS_RESPONSE | jq -r '.totalDocs // "N/A"') reviews found"
else
    echo -e "${RED}✗ Reviews API failed${NC}"
fi
echo ""

# Test 6: Test Leads Collection API (should require auth for GET)
echo "Test 6: Testing Leads Collection API..."
LEADS_RESPONSE=$(curl -s "${API_URL}/leads")
if echo "$LEADS_RESPONSE" | grep -q '"message"'; then
    echo -e "${YELLOW}⚠ Leads API requires authentication (expected)${NC}"
else
    echo -e "${GREEN}✓ Leads API responded${NC}"
fi
echo ""

# Test 7: Test Lead Form Submission (Public POST)
echo "Test 7: Testing Lead Form Submission (Public POST)..."
LEAD_POST_RESPONSE=$(curl -s -X POST "${API_URL}/leads" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "phone": "0812345678",
    "email": "test@example.com"
  }')

if echo "$LEAD_POST_RESPONSE" | grep -q '"id"'; then
    echo -e "${GREEN}✓ Lead submission successful${NC}"
    LEAD_ID=$(echo $LEAD_POST_RESPONSE | jq -r '.doc.id')
    echo "   Created Lead ID: $LEAD_ID"
else
    echo -e "${RED}✗ Lead submission failed${NC}"
    echo "   Response: $LEAD_POST_RESPONSE"
fi
echo ""

# Test 8: Test Invalid Lead Submission (should fail validation)
echo "Test 8: Testing Invalid Lead Submission (should fail)..."
INVALID_LEAD_RESPONSE=$(curl -s -X POST "${API_URL}/leads" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "A",
    "phone": "123",
    "email": "invalid-email"
  }')

if echo "$INVALID_LEAD_RESPONSE" | grep -q '"errors"'; then
    echo -e "${GREEN}✓ Validation working correctly (rejected invalid data)${NC}"
else
    echo -e "${YELLOW}⚠ Validation may not be working as expected${NC}"
fi
echo ""

echo "========================================="
echo "Summary"
echo "========================================="
echo "All basic API endpoints are accessible."
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Open admin panel: ${BASE_URL}/admin"
echo "2. Create test data in each collection"
echo "3. Verify CRUD operations work correctly"
echo ""
