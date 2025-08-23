<?php
session_start();
header('Content-Type: application/json');

// Check authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Authentication required']);
    exit;
}

// Check if session is not expired (24 hours)
if (!isset($_SESSION['admin_login_time']) || (time() - $_SESSION['admin_login_time']) > 86400) {
    session_destroy();
    echo json_encode(['success' => false, 'message' => 'Session expired']);
    exit;
}

// Check upload type
$upload_type = isset($_POST['type']) ? $_POST['type'] : 'gallery';

if ($upload_type === 'principal') {
    // Handle principal image upload
    if (!isset($_FILES['principalImage']) || $_FILES['principalImage']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'message' => 'No principal image uploaded or upload error: ' . $_FILES['principalImage']['error']]);
        exit;
    }
    
    if (empty($_POST['altText'])) {
        echo json_encode(['success' => false, 'message' => 'Alt text is required for accessibility']);
        exit;
    }
    
    $file = $_FILES['principalImage'];
    $alt_text = trim($_POST['altText']);
    
    // Validate file type
    $allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($file['type'], $allowed_types)) {
        echo json_encode(['success' => false, 'message' => 'Invalid file type. Only JPG, PNG, GIF, and WebP are allowed']);
        exit;
    }
    
    // Validate file size (max 5MB)
    if ($file['size'] > 5 * 1024 * 1024) {
        echo json_encode(['success' => false, 'message' => 'File size too large. Maximum 5MB allowed']);
        exit;
    }
    
    // Create images directory if it doesn't exist
    $upload_dir = '../images/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }
    
    // Generate filename for principal image
    $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $filename = "principa.{$file_extension}";
    $filepath = $upload_dir . $filename;
    
    // Remove old principal image if it exists
    if (file_exists($filepath)) {
        unlink($filepath);
    }
    
    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        echo json_encode(['success' => false, 'message' => 'Failed to save principal image. Check file permissions.']);
        exit;
    }
    
    // Verify file was actually saved
    if (!file_exists($filepath)) {
        echo json_encode(['success' => false, 'message' => 'Principal image was not saved properly']);
        exit;
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Principal image updated successfully',
        'url' => 'images/' . $filename,
        'filepath' => $filepath,
        'size' => filesize($filepath)
    ]);
    
} elseif ($upload_type === 'managingDirector') {
    // Handle managing director image upload
    if (!isset($_FILES['principalImage']) || $_FILES['principalImage']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'message' => 'No managing director image uploaded or upload error: ' . $_FILES['principalImage']['error']]);
        exit;
    }
    
    if (empty($_POST['altText'])) {
        echo json_encode(['success' => false, 'message' => 'Alt text is required for accessibility']);
        exit;
    }
    
    $file = $_FILES['principalImage'];
    $alt_text = trim($_POST['altText']);
    
    // Validate file type
    $allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($file['type'], $allowed_types)) {
        echo json_encode(['success' => false, 'message' => 'Invalid file type. Only JPG, PNG, GIF, and WebP are allowed']);
        exit;
    }
    
    // Validate file size (max 5MB)
    if ($file['size'] > 5 * 1024 * 1024) {
        echo json_encode(['success' => false, 'message' => 'File size too large. Maximum 5MB allowed']);
        exit;
    }
    
    // Create images directory if it doesn't exist
    $upload_dir = '../images/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }
    
    // Generate filename for managing director image
    $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $filename = "managing_director.{$file_extension}";
    $filepath = $upload_dir . $filename;
    
    // Remove old managing director image if it exists
    if (file_exists($filepath)) {
        unlink($filepath);
    }
    
    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        echo json_encode(['success' => false, 'message' => 'Failed to save managing director image. Check file permissions.']);
        exit;
    }
    
    // Verify file was actually saved
    if (!file_exists($filepath)) {
        echo json_encode(['success' => false, 'message' => 'Managing director image was not saved properly']);
        exit;
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Managing director image updated successfully',
        'url' => 'images/' . $filename,
        'filepath' => $filepath,
        'size' => filesize($filepath)
    ]);
    
} else {
    // Handle regular gallery upload
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'message' => 'No image uploaded or upload error']);
        exit;
    }
    
    // Validate required fields
    if (empty($_POST['title']) || empty($_POST['caption']) || empty($_POST['category'])) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    $file = $_FILES['image'];
    $title = trim($_POST['title']);
    $caption = trim($_POST['caption']);
    $category = trim($_POST['category']);
    
    // Validate category exists
    $categories_file = '../data/categories.json';
    if (file_exists($categories_file)) {
        $categories_content = file_get_contents($categories_file);
        $categories_data = json_decode($categories_content, true);
        $valid_category = false;
        
        if (isset($categories_data['categories'])) {
            foreach ($categories_data['categories'] as $cat) {
                if ($cat['id'] === $category) {
                    $valid_category = true;
                    break;
                }
            }
        }
        
        if (!$valid_category) {
            echo json_encode(['success' => false, 'message' => 'Invalid category selected']);
            exit;
        }
    }
    
    // Validate file type
    $allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($file['type'], $allowed_types)) {
        echo json_encode(['success' => false, 'message' => 'Invalid file type. Only JPG, PNG, GIF, and WebP are allowed']);
        exit;
    }
    
    // Validate file size (max 5MB)
    if ($file['size'] > 5 * 1024 * 1024) {
        echo json_encode(['success' => false, 'message' => 'File size too large. Maximum 5MB allowed']);
        exit;
    }
    
    // Create upload directory if it doesn't exist
    $upload_dir = '../images/gallery/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }
    
    // Generate unique filename
    $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $timestamp = time();
    $random_string = bin2hex(random_bytes(8));
    $filename = "upload_{$timestamp}_{$random_string}.{$file_extension}";
    $filepath = $upload_dir . $filename;
    
    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        echo json_encode(['success' => false, 'message' => 'Failed to save uploaded file']);
        exit;
    }
    
    // Load existing gallery data
    $gallery_file = '../data/gallery.json';
    $gallery_data = [];
    
    if (file_exists($gallery_file)) {
        $gallery_content = file_get_contents($gallery_file);
        $gallery_data = json_decode($gallery_content, true);
    }
    
    if (!is_array($gallery_data) || !isset($gallery_data['gallery'])) {
        $gallery_data = ['gallery' => []];
    }
    
    // Generate new ID
    $max_id = 0;
    foreach ($gallery_data['gallery'] as $item) {
        if (isset($item['id']) && $item['id'] > $max_id) {
            $max_id = $item['id'];
        }
    }
    $new_id = $max_id + 1;
    
    // Add new image to gallery
    $new_image = [
        'id' => $new_id,
        'url' => 'images/gallery/' . $filename,
        'title' => $title,
        'caption' => $caption,
        'category' => $category,
        'upload_date' => date('Y-m-d H:i:s')
    ];
    
    $gallery_data['gallery'][] = $new_image;
    
    // Save updated gallery data
    if (file_put_contents($gallery_file, json_encode($gallery_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
        echo json_encode([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'url' => 'images/gallery/' . $filename,
            'id' => $new_id
        ]);
    } else {
        // If saving gallery data fails, delete the uploaded file
        unlink($filepath);
        echo json_encode(['success' => false, 'message' => 'Failed to update gallery data']);
    }
}
?> 