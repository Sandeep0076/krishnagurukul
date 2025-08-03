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

// Check if ID is provided
if (!isset($_POST['id']) || !is_numeric($_POST['id'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid image ID']);
    exit;
}

$image_id = (int)$_POST['id'];

// Load gallery data
$gallery_file = '../data/gallery.json';
if (!file_exists($gallery_file)) {
    echo json_encode(['success' => false, 'message' => 'Gallery data not found']);
    exit;
}

$gallery_content = file_get_contents($gallery_file);
$gallery_data = json_decode($gallery_content, true);

if (!is_array($gallery_data) || !isset($gallery_data['gallery'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid gallery data']);
    exit;
}

// Find the image to delete
$image_to_delete = null;
$image_index = -1;

foreach ($gallery_data['gallery'] as $index => $item) {
    if (isset($item['id']) && $item['id'] == $image_id) {
        $image_to_delete = $item;
        $image_index = $index;
        break;
    }
}

if ($image_to_delete === null) {
    echo json_encode(['success' => false, 'message' => 'Image not found']);
    exit;
}

// Delete the physical file
$file_path = '../' . $image_to_delete['url'];
if (file_exists($file_path)) {
    if (!unlink($file_path)) {
        echo json_encode(['success' => false, 'message' => 'Failed to delete image file']);
        exit;
    }
}

// Remove from gallery data
array_splice($gallery_data['gallery'], $image_index, 1);

// Save updated gallery data
if (file_put_contents($gallery_file, json_encode($gallery_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
    echo json_encode(['success' => true, 'message' => 'Image deleted successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update gallery data']);
}
?> 