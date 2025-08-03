# Krishna Gurukul School - Admin Upload System

## Overview
This is a lightweight back-office uploader for managing the school's photo gallery. It allows authorized staff to upload, manage, and delete images through a simple web interface.

## Features
- **Secure Login**: Password-protected access
- **Image Upload**: Upload images with title, caption, and category
- **Gallery Management**: View all uploaded images with delete functionality
- **Automatic JSON Updates**: Gallery data is automatically updated when images are added/removed
- **File Validation**: Supports JPG, PNG, GIF, and WebP formats (max 5MB)
- **Session Management**: 24-hour session timeout for security

## Access
- **URL**: `https://krishnagurukulschool.in/admin/`
- **Default Password**: `krishna2024` (CHANGE THIS IMMEDIATELY)

## How to Use

### 1. Login
1. Navigate to `/admin/` on your website
2. Enter the admin password
3. You'll be redirected to the upload interface

### 2. Upload Images
1. Click "Choose File" to select an image
2. Fill in the required fields:
   - **Title**: Short descriptive title
   - **Caption**: Detailed description
   - **Category**: Choose from Campus, Facilities, Activities, Students, or Events
3. Click "Upload Image"
4. The image will be automatically added to the gallery

### 3. Manage Gallery
- View all uploaded images in the "Current Gallery" section
- Click "Delete" to remove images (this will also delete the file)
- Images are automatically organized by category

### 4. Logout
- Click "Logout" in the top-right corner to end your session

## Security Notes
- **IMPORTANT**: Change the default password in `login.php`
- Sessions expire after 24 hours
- File uploads are validated for type and size
- Admin directory is protected with .htaccess

## File Structure
```
admin/
├── index.html          # Login page
├── upload.html         # Upload interface
├── login.php           # Authentication handler
├── check_auth.php      # Session validation
├── upload.php          # File upload handler
├── delete.php          # Image deletion handler
├── logout.php          # Logout handler
├── .htaccess           # Security configuration
└── README.md           # This file
```

## Gallery Integration
- Images are stored in `/images/gallery/`
- Gallery data is stored in `/data/gallery.json`
- The main gallery page (`/gallery.html`) automatically loads from this JSON file
- No manual file management required

## Troubleshooting
- **Upload fails**: Check file size (max 5MB) and format
- **Login issues**: Verify password and session timeout
- **Images not showing**: Check file permissions on `/images/gallery/` directory
- **JSON errors**: Ensure `/data/gallery.json` is writable

## Support
For technical support, contact your web developer or hosting provider. 