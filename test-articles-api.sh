#!/bin/bash

# Test script for Articles API

echo "Testing Articles Collection API"
echo "================================"
echo ""

# Test 1: List all articles
echo "1. Testing GET /api/articles (list all articles)"
curl -s http://localhost:3001/api/articles | jq '.'
echo ""
echo ""

# Test 2: Check collection structure
echo "2. Checking collection structure"
curl -s http://localhost:3001/api/articles | jq '.docs | length'
echo " articles found"
echo ""

# Test 3: Verify API is accessible
echo "3. Verifying API accessibility"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/articles)
if [ "$STATUS" -eq 200 ]; then
  echo "✅ API is accessible (HTTP $STATUS)"
else
  echo "❌ API returned HTTP $STATUS"
fi
echo ""

echo "================================"
echo "Tests complete!"
