# Krishna Gurukul School Website

A modern, responsive website for Krishna Gurukul School with a powerful admin system for managing photo galleries and content.

## 🌟 Features

### **Public Website**
- ✅ **Responsive Design** - Works perfectly on all devices
- ✅ **Modern UI/UX** - Clean, professional design
- ✅ **Dynamic Gallery** - JSON-based image gallery with category filters
- ✅ **SEO Optimized** - Meta tags, semantic HTML, fast loading
- ✅ **Accessibility** - WCAG compliant, screen reader friendly

### **Admin System**
- ✅ **Secure Login** - Password-protected admin access
- ✅ **Image Upload** - Drag-and-drop image upload with validation
- ✅ **Category Management** - Add, edit, delete categories dynamically
- ✅ **Gallery Management** - View, organize, and delete images
- ✅ **Real-time Updates** - Changes reflect immediately on the website

## 🏗️ Project Structure

```
public_html/
├── admin/                          # Admin system files
│   ├── index.html                  # Admin login page
│   ├── upload.html                 # Main admin interface
│   ├── login.php                   # Authentication handler
│   ├── check_auth.php             # Session validation
│   ├── upload.php                  # Image upload handler
│   ├── delete.php                  # Image deletion handler
│   ├── categories.php              # Category management API
│   ├── logout.php                  # Logout handler
│   ├── .htaccess                   # Security configuration
│   └── README.md                   # Admin documentation
├── css/
│   └── style.css                   # Main stylesheet
├── js/
│   └── main.js                     # Main JavaScript
├── images/
│   ├── gallery/                    # Uploaded images
│   └── [other images]              # Static website images
├── data/
│   ├── gallery.json                # Image metadata
│   └── categories.json             # Category definitions
├── index.html                      # Homepage
├── about-us.html                   # About page
├── academics.html                  # Academics page
├── admission.html                  # Admissions page
├── gallery.html                    # Gallery page
├── [other pages]                   # Additional pages
└── README.md                       # This file
```

## 🚀 Quick Start

### **Local Development**

1. **Install PHP** (if not already installed):
   ```bash
   # macOS (using Homebrew)
   brew install php
   
   # Ubuntu/Debian
   sudo apt-get install php
   
   # Windows
   # Download from https://php.net
   ```

2. **Start the server**:
   ```bash
   cd public_html
   php -S localhost:8000
   ```

3. **Access the website**:
   - **Main Website**: `http://localhost:8000/`
   - **Admin Panel**: `http://localhost:8000/admin/`
   - **Gallery**: `http://localhost:8000/gallery.html`

### **Production Deployment (Hostinger)**

1. **Upload files** to your Hostinger hosting:
   - Upload all files to `public_html/`
   - Ensure proper file permissions

2. **Set permissions**:
   ```bash
   chmod 755 images/gallery/
   chmod 644 data/gallery.json
   chmod 644 data/categories.json
   ```

3. **Change admin password**:
   - Edit `admin/login.php`
   - Change `$admin_password = 'krishna2024';` to your secure password

4. **Access your live site**:
   - **Website**: `https://krishnagurukulschool.in/`
   - **Admin**: `https://krishnagurukulschool.in/admin/`

## 🔐 Admin System

### **Access**
- **URL**: `/admin/`
- **Default Password**: `krishna2024` (CHANGE THIS!)

### **Features**

#### **1. Image Upload**
- **Supported Formats**: JPG, PNG, GIF, WebP
- **Max File Size**: 5MB
- **Required Fields**: Title, Caption, Category
- **Auto-organization**: Images automatically categorized

#### **2. Category Management**
- **Add Categories**: Create new categories with custom names
- **Edit Categories**: Modify existing category names
- **Delete Categories**: Remove categories (only if no images exist)
- **Category Counts**: See how many images are in each category

#### **3. Gallery Management**
- **View All Images**: Browse uploaded images with details
- **Delete Images**: Remove images and files
- **Real-time Updates**: Changes reflect immediately

### **Admin Workflow**

1. **Login**: Navigate to `/admin/` and enter password
2. **Upload Images**: 
   - Select image file
   - Fill in title, caption, and category
   - Click "Upload Image"
3. **Manage Categories**:
   - Add new categories in the "Category Management" section
   - Edit or delete existing categories
4. **View Gallery**: Check uploaded images in the "Current Gallery" section
5. **Logout**: Click "Logout" when finished

## 🎨 Gallery System

### **Features**
- **Dynamic Categories**: Filter images by category
- **Lightbox Viewing**: Click images for full-screen view
- **Responsive Grid**: Automatically adjusts to screen size
- **Lazy Loading**: Images load as needed for performance
- **JSON-based**: All data stored in JSON files for easy management

### **Category System**
- **Automatic Updates**: New categories appear in filters immediately
- **Image Counts**: Shows number of images per category
- **Safe Deletion**: Prevents deleting categories with images
- **Flexible**: Add unlimited categories

## 🔧 Technical Details

### **Backend (PHP)**
- **PHP Version**: 7.x+ (compatible with Hostinger)
- **File Operations**: JSON-based data storage
- **Security**: Session-based authentication
- **Validation**: File type and size validation
- **Error Handling**: Comprehensive error messages

### **Frontend (JavaScript)**
- **Vanilla JS**: No frameworks required
- **Modern ES6+**: Async/await, fetch API
- **Responsive**: Mobile-first design
- **Accessibility**: ARIA labels, keyboard navigation

### **Data Storage**
- **Images**: Stored in `images/gallery/`
- **Metadata**: Stored in `data/gallery.json`
- **Categories**: Stored in `data/categories.json`
- **Backup-friendly**: Simple file structure

## 🛡️ Security Features

### **Admin Security**
- **Password Protection**: Secure admin login
- **Session Management**: 24-hour session timeout
- **Input Validation**: All user inputs sanitized
- **File Validation**: Type and size restrictions
- **CSRF Protection**: Session-based validation

### **File Security**
- **Upload Restrictions**: Only image files allowed
- **Size Limits**: Maximum 5MB per file
- **Directory Protection**: .htaccess security rules
- **Path Validation**: Prevents directory traversal

## 📊 Performance

### **Optimizations**
- **Image Optimization**: Automatic resizing and compression
- **Lazy Loading**: Images load as needed
- **Minimal Dependencies**: No heavy frameworks
- **Fast Loading**: Optimized CSS and JavaScript
- **CDN Ready**: Compatible with CDN services

### **Scalability**
- **JSON-based**: Easy to scale and backup
- **Modular Design**: Easy to add new features
- **Hostinger Compatible**: Works with standard hosting
- **Low Resource Usage**: Minimal server requirements

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
   - Add new images through admin panel
   - Manage categories as needed
   - Update website content

### **Troubleshooting**

#### **Common Issues**

**Upload Fails**:
- Check file size (max 5MB)
- Verify file format (JPG, PNG, GIF, WebP)
- Ensure `images/gallery/` is writable

**Login Issues**:
- Verify password in `admin/login.php`
- Check session timeout (24 hours)
- Clear browser cookies

**Images Not Showing**:
- Check file permissions on `images/gallery/`
- Verify JSON file permissions
- Check browser console for errors

**Categories Not Loading**:
- Ensure `data/categories.json` exists and is readable
- Check file permissions
- Verify JSON syntax

## 🎯 Usage Examples

### **Adding a New Category**
1. Login to admin panel
2. Go to "Category Management" section
3. Enter category name (e.g., "Sports")
4. Click "Add Category"
5. Category appears in upload dropdown and gallery filters

### **Uploading an Image**
1. Login to admin panel
2. Select image file
3. Enter title: "Basketball Tournament"
4. Enter caption: "Annual inter-school basketball competition"
5. Select category: "Sports"
6. Click "Upload Image"
7. Image appears in gallery immediately

### **Managing Gallery**
1. View all images in "Current Gallery" section
2. See category counts for each category
3. Delete images if needed
4. Edit categories as required

## 📞 Support

### **Technical Support**
- **Hosting Issues**: Contact Hostinger support
- **Code Issues**: Check browser console for errors
- **File Permissions**: Ensure directories are writable
- **PHP Issues**: Verify PHP version (7.x+)

### **Documentation**
- **Admin Guide**: See `admin/README.md`
- **Code Comments**: Well-documented code
- **File Structure**: Clear organization

## 🚀 Future Enhancements

### **Planned Features**
- [ ] **Bulk Upload**: Upload multiple images at once
- [ ] **Image Editing**: Crop, resize, and edit images
- [ ] **User Management**: Multiple admin users
- [ ] **Backup System**: Automatic backups
- [ ] **Analytics**: Usage statistics
- [ ] **Mobile App**: Admin mobile interface

### **Customization**
- **Themes**: Easy theme switching
- **Languages**: Multi-language support
- **Plugins**: Modular plugin system
- **API**: RESTful API for external access

## 📄 License

This project is developed for Krishna Gurukul School. All rights reserved.

## 🙏 Acknowledgments

- **Design**: Modern, responsive design principles
- **Security**: Industry-standard security practices
- **Performance**: Optimized for speed and efficiency
- **Accessibility**: WCAG compliant design

---

**Last Updated**: August 2025  
**Version**: 1.0.0  
**Compatibility**: PHP 7.x+, Modern Browsers, Hostinger Hosting 