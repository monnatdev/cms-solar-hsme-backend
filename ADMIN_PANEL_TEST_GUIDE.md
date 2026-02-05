# Admin Panel Testing Guide

## Quick Start

1. **Open Admin Panel**
   - URL: http://localhost:3001/admin
   - The server is already running (check with `npm run dev` in backend folder)

2. **First Time Setup**
   - If you haven't created an admin user yet, you'll see a setup screen
   - Create your admin account with email and password
   - Remember these credentials for future logins

3. **Login**
   - Use your admin credentials to login
   - You should see the Payload CMS dashboard

---

## Testing Each Collection

### 1. Media Collection

**Test Upload:**
1. Click "Media" in the sidebar
2. Click "Create New"
3. Upload a test image (any JPG/PNG)
4. Add alt text: "Test image for solar panel"
5. Click "Save"
6. Verify: Image appears in the list with thumbnail

**Expected Result:**
- Image is uploaded successfully
- Three sizes are generated: thumbnail, card, hero
- Alt text is saved

---

### 2. Articles Collection

**Test Create Article:**
1. Click "Articles" in the sidebar
2. Click "Create New"
3. Fill in the fields:
   - **Title:** "ประโยชน์ของโซล่าเซลล์ 5 ข้อ"
   - **Header:** "ทำไมต้องติดตั้งโซล่าเซลล์"
   - **Slug:** (Leave empty - should auto-generate to "ประโยชน-ของโซล-าเซลล-5-ข-อ")
   - **Excerpt:** "โซล่าเซลล์ช่วยประหยัดค่าไฟและเป็นมิตรกับสิ่งแวดล้อม"
   - **Content:** Add some rich text content (use the editor)
   - **Featured Image:** Select the image you uploaded earlier
   - **Published Date:** Today's date
   - **Status:** Published
   - **SEO Metadata:**
     - Meta Title: "5 ประโยชน์ของโซล่าเซลล์"
     - Meta Description: "ค้นพบประโยชน์ของการติดตั้งโซล่าเซลล์"
     - Keywords: "โซล่าเซลล์, พลังงานแสงอาทิตย์, ประหยัดพลังงาน"
4. Click "Save"

**Test Edit:**
1. Click on the article you just created
2. Change the title to "ประโยชน์ของโซล่าเซลล์ 10 ข้อ"
3. Click "Save"
4. Verify: Changes are saved

**Test Delete:**
1. Go back to Articles list
2. Select the article (checkbox)
3. Click "Delete" from the actions menu
4. Confirm deletion
5. Verify: Article is removed from the list

---

### 3. Services Collection

**Test Create Service:**
1. Click "Services" in the sidebar
2. Click "Create New"
3. Fill in the fields:
   - **Title:** "ติดตั้งโซล่าเซลล์บ้านพักอาศัย"
   - **Header:** "บริการติดตั้งระบบโซล่าเซลล์สำหรับบ้าน"
   - **Slug:** (Leave empty - should auto-generate)
   - **Description:** Add rich text describing the service
   - **Featured Image:** Select an image
   - **Gallery:** Add 2-3 more images
   - **Status:** Published
   - **SEO Metadata:** Fill in meta title, description, keywords
4. Click "Save"

**Test Gallery:**
1. Verify that all gallery images are displayed
2. Try adding another image to the gallery
3. Try removing an image from the gallery

**Expected Result:**
- Service is created with all fields
- Gallery displays multiple images
- Slug is auto-generated

---

### 4. Reviews Collection

**Test Create Review:**
1. Click "Reviews" in the sidebar
2. Click "Create New"
3. Fill in the fields:
   - **Title:** "โครงการติดตั้งโซล่าเซลล์บ้านคุณสมชาย"
   - **Header:** "บ้านพักอาศัย 2 ชั้น กำลังผลิต 5kW"
   - **Description:** "ติดตั้งระบบโซล่าเซลล์ขนาด 5kW ที่บ้านคุณสมชาย จ.เชียงใหม่"
   - **Featured Image:** Select an image
   - **Gallery:** Add 2-3 images of the installation
   - **Related Service:** Select the service you created earlier
   - **Status:** Published
4. Click "Save"

**Test Relationship:**
1. Verify that the "Related Service" dropdown shows your services
2. Select a service and save
3. Go back and verify the relationship is saved

**Expected Result:**
- Review is created successfully
- Relationship to service is working
- Gallery displays multiple images

---

### 5. Leads Collection

**Test View Leads:**
1. Click "Leads" in the sidebar
2. You should see the test lead created by the API test:
   - Full Name: "Test User"
   - Phone: "0812345678"
   - Email: "test@example.com"
   - Created At: (timestamp)

**Test Read-Only:**
1. Click on a lead to view details
2. Try to edit any field
3. Verify: All fields are read-only (grayed out)
4. Try to delete the lead
5. Verify: Delete option is not available

**Test API Submission:**
1. Open a new terminal
2. Run this command to submit a new lead:
```bash
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "สมหญิง ใจดี",
    "phone": "0898765432",
    "email": "somying@example.com"
  }'
```
3. Refresh the Leads page in admin panel
4. Verify: New lead appears in the list

**Expected Result:**
- Leads are displayed in the admin panel
- All fields are read-only
- Cannot edit or delete leads
- New leads submitted via API appear immediately

---

## Testing Validation

### Test Invalid Lead Submission

Run this command to test validation:
```bash
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "A",
    "phone": "123",
    "email": "invalid"
  }'
```

**Expected Result:**
- Request is rejected with validation errors
- Error messages explain what's wrong with each field

---

## Testing Phone Sanitization

Run this command to test phone number sanitization:
```bash
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Sanitization",
    "phone": "081-234-5678",
    "email": "sanitize@example.com"
  }'
```

**Expected Result:**
- Lead is created successfully
- Phone number is saved as "0812345678" (dashes removed)
- Check the admin panel to verify

---

## Common Issues & Solutions

### Issue: Cannot access admin panel
**Solution:** 
- Check if server is running: `npm run dev` in backend folder
- Check URL: http://localhost:3001/admin (not 3000)

### Issue: No admin user exists
**Solution:**
- First time setup: Create admin user through the setup screen
- Or use the Payload CLI to create a user

### Issue: Images not uploading
**Solution:**
- Check that `backend/media` folder exists
- Check file permissions
- Check file size (max 10MB by default)

### Issue: Slug not auto-generating
**Solution:**
- Leave the slug field empty when creating
- The hook will generate it from the title
- If it doesn't work, check the console for errors

---

## Verification Checklist

After testing, verify these points:

- [ ] ✅ Can login to admin panel
- [ ] ✅ Can upload media files
- [ ] ✅ Can create/edit/delete articles
- [ ] ✅ Can create/edit/delete services
- [ ] ✅ Can create/edit/delete reviews
- [ ] ✅ Can view leads (read-only)
- [ ] ✅ Slug auto-generation works
- [ ] ✅ Rich text editor works
- [ ] ✅ Image galleries work
- [ ] ✅ Service-Review relationship works
- [ ] ✅ Lead validation works
- [ ] ✅ Phone sanitization works
- [ ] ✅ SEO metadata can be added
- [ ] ✅ Status (draft/published) works

---

## Next Steps

Once you've completed the manual testing:

1. ✅ Mark Task 3 as complete
2. 📝 Create sample data for frontend development
3. 🚀 Proceed to Task 4: Frontend Types and API Client

---

## Need Help?

If you encounter any issues:
1. Check the server logs in the terminal
2. Check the browser console for errors
3. Review the collection configuration files in `backend/src/collections/`
4. Ask for assistance if needed

---

**Happy Testing! 🎉**
