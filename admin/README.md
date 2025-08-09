# Krishna Gurukul School - Admin System

## 🎯 Overview

This is a lightweight, secure admin system for managing the Krishna Gurukul School website's photo gallery. It provides an intuitive interface for staff to upload, organize, and manage images without needing technical knowledge.

## 🔐 Security Features

### **Authentication**
- **Password Protection**: Secure admin login required
- **Session Management**: 24-hour session timeout
- **CSRF Protection**: Session-based validation
- **Input Sanitization**: All user inputs cleaned and validated

### **File Security**
- **Upload Validation**: Only image files allowed (JPG, PNG, GIF, WebP)
- **Size Limits**: Maximum 5MB per file
- **Path Validation**: Prevents directory traversal attacks
- **File Permissions**: Secure file handling

## 🚀 Quick Start

### **Access**
- **URL**: `https://krishnagurukulschool.in/admin/`
- **Default Password**: `krishna2024` (CHANGE THIS IMMEDIATELY!)

### **First Time Setup**
1. **Change Password**: Edit `login.php` and update the password
2. **Set Permissions**: Ensure directories are writable
3. **Test Upload**: Try uploading a test image
4. **Verify Gallery**: Check that images appear on the main site

## 📁 File Structure

```
admin/
├── index.html          # Login page
├── upload.html         # Main admin interface
├── login.php           # Authentication handler
├── check_auth.php      # Session validation
├── upload.php          # File upload handler
├── delete.php          # Image deletion handler
├── categories.php      # Category management API
├── logout.php          # Logout handler
├── .htaccess           # Security configuration
└── README.md           # This file
```

## 🎨 Admin Interface

### **Main Dashboard**
- **Upload Section**: Add new images with metadata
- **Category Management**: Organize images by categories
- **Gallery View**: Browse and manage existing images
- **Real-time Updates**: Changes reflect immediately

### **Upload Process**
1. **Select Image**: Choose file (max 5MB)
2. **Add Metadata**: Title, caption, and category
3. **Preview**: See image preview before upload
4. **Upload**: One-click upload with validation
5. **Confirmation**: Success message with image URL

### **Category Management**
- **Add Categories**: Create new categories instantly
- **Edit Categories**: Modify existing category names
- **Delete Categories**: Remove categories (if no images exist)
- **Category Counts**: See how many images per category

## 🔧 Technical Details

### **Backend (PHP)**
- **PHP Version**: 7.x+ (Hostinger compatible)
- **File Operations**: JSON-based data storage
- **Error Handling**: Comprehensive error messages
- **Security**: Input validation and sanitization

### **Frontend (JavaScript)**
- **Vanilla JS**: No frameworks required
- **Modern ES6+**: Async/await, fetch API
- **Responsive**: Mobile-friendly interface
- **Real-time**: Instant updates without page refresh

### **Data Storage**
- **Images**: `../images/gallery/`
- **Metadata**: `../data/gallery.json`
- **Categories**: `../data/categories.json`
- **Backup-friendly**: Simple file structure

## 📊 Usage Guide

### **Adding Images**

1. **Login**: Navigate to `/admin/` and enter password
2. **Select File**: Click "Choose File" and select image
3. **Add Details**:
   - **Title**: Short descriptive title
   - **Caption**: Detailed description
   - **Category**: Choose from existing categories
4. **Upload**: Click "Upload Image"
5. **Verify**: Check gallery for new image

### **Managing Categories**

#### **Add New Category**
1. Go to "Category Management" section
2. Enter category name in "New Category Name" field
3. Click "Add Category"
4. Category appears in dropdown and gallery filters

#### **Edit Category**
1. Find category in "Category Management" section
2. Click "Edit" button
3. Modify name in popup modal
4. Click "Save Changes"

#### **Delete Category**
1. Find category in "Category Management" section
2. Click "Delete" button
3. Confirm deletion
4. **Note**: Can only delete if category has no images

### **Managing Gallery**

#### **View Images**
- All images displayed in "Current Gallery" section
- Shows title, caption, category, and preview
- Images organized by upload date

#### **Delete Images**
1. Find image in "Current Gallery" section
2. Click "Delete" button
3. Confirm deletion
4. Image and file removed permanently

## 🛠️ Troubleshooting

### **Common Issues**

#### **Upload Fails**
- **File Size**: Check if file is under 5MB
- **File Type**: Ensure it's JPG, PNG, GIF, or WebP
- **Permissions**: Verify `images/gallery/` is writable
- **Server**: Check PHP upload settings

#### **Login Issues**
- **Password**: Verify password in `login.php`
- **Session**: Clear browser cookies
- **Timeout**: Sessions expire after 24 hours
- **Browser**: Try different browser

#### **Images Not Showing**
- **File Permissions**: Check `images/gallery/` permissions
- **JSON Permissions**: Verify `data/gallery.json` is writable
- **Path Issues**: Check file paths in JSON
- **Browser Cache**: Clear browser cache

#### **Categories Not Loading**
- **File Exists**: Ensure `data/categories.json` exists
- **Permissions**: Check file permissions
- **JSON Syntax**: Verify JSON is valid
- **Browser Console**: Check for JavaScript errors

### **Error Messages**

#### **"Authentication Required"**
- Session expired or not logged in
- Solution: Login again

#### **"File Size Too Large"**
- Image exceeds 5MB limit
- Solution: Compress or resize image

#### **"Invalid File Type"**
- File not in supported format
- Solution: Convert to JPG, PNG, GIF, or WebP

#### **"Category Already Exists"**
- Category name already in use
- Solution: Use different name

#### **"Cannot Delete Category"**
- Category has images
- Solution: Delete images first, then category

## 🔄 Maintenance

### **Regular Tasks**

1. **Backup Data**:
   - `data/gallery.json` - Image metadata
   - `data/categories.json` - Categories
   - `images/gallery/` - Uploaded images

2. **Monitor Usage**:
   - Check file sizes in `images/gallery/`
   - Monitor JSON file sizes
   - Review server logs

3. **Update Content**:
   - Add new images regularly
   - Organize categories as needed
   - Remove outdated content

### **Performance Optimization**

1. **Image Optimization**:
   - Compress images before upload
   - Use appropriate file formats
   - Resize large images

2. **Storage Management**:
   - Regular cleanup of unused images
   - Monitor disk space usage
   - Archive old content

## 🔒 Security Best Practices

### **Password Security**
- Use strong, unique passwords
- Change password regularly
- Don't share credentials
- Use password manager

### **File Security**
- Regular backups
- Monitor file permissions
- Check for unauthorized files
- Validate all uploads

### **Session Security**
- Logout when finished
- Clear browser cache
- Use secure connections
- Monitor login attempts

## 📞 Support

### **Technical Issues**
- **Hosting**: Contact Hostinger support
- **Code**: Check browser console for errors
- **Permissions**: Verify file permissions
- **PHP**: Ensure PHP 7.x+ installed

### **User Training**
- **Staff Training**: Basic admin interface training
- **Documentation**: This README and inline help
- **Support Contact**: Technical support contact

## 🚀 Future Enhancements

### **Planned Features**
- [ ] **Bulk Upload**: Upload multiple images at once
- [ ] **Image Editing**: Crop, resize, and edit images
- [ ] **User Management**: Multiple admin users
- [ ] **Backup System**: Automatic backups
- [ ] **Analytics**: Usage statistics
- [ ] **Mobile App**: Admin mobile interface

### **Customization**
- **Themes**: Custom admin themes
- **Languages**: Multi-language support
- **Plugins**: Modular plugin system
- **API**: RESTful API for external access

## 📄 Configuration

### **File Permissions**
```bash
# Required permissions
chmod 755 images/gallery/
chmod 644 data/gallery.json
chmod 644 data/categories.json
chmod 644 admin/*.php
```

### **PHP Settings**
```php
// Recommended PHP settings
upload_max_filesize = 10M
post_max_size = 10M
max_execution_time = 300
memory_limit = 256M
```

### **Security Headers**
```apache
# .htaccess security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
```

---

**Last Updated**: August 2025  
**Version**: 1.0.0  
**Compatibility**: PHP 7.x+, Modern Browsers, Hostinger Hosting 