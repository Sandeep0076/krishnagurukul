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

$categories_file = '../data/categories.json';

// Load categories
function loadCategories() {
    global $categories_file;
    if (file_exists($categories_file)) {
        $content = file_get_contents($categories_file);
        return json_decode($content, true);
    }
    return ['categories' => []];
}

// Save categories
function saveCategories($data) {
    global $categories_file;
    return file_put_contents($categories_file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

// Generate unique ID
function generateCategoryId($name) {
    return strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $name), '-'));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all categories
        $categories = loadCategories();
        echo json_encode(['success' => true, 'categories' => $categories['categories']]);
        break;
        
    case 'POST':
        // Add new category
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['name']) || empty(trim($input['name']))) {
            echo json_encode(['success' => false, 'message' => 'Category name is required']);
            exit;
        }
        
        $name = trim($input['name']);
        $categories = loadCategories();
        
        // Check if category already exists
        foreach ($categories['categories'] as $category) {
            if (strtolower($category['name']) === strtolower($name)) {
                echo json_encode(['success' => false, 'message' => 'Category already exists']);
                exit;
            }
        }
        
        $newCategory = [
            'id' => generateCategoryId($name),
            'name' => $name,
            'description' => $input['description'] ?? '',
            'cover' => $input['cover'] ?? ''
        ];
        
        $categories['categories'][] = $newCategory;
        
        if (saveCategories($categories)) {
            echo json_encode(['success' => true, 'category' => $newCategory]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to save category']);
        }
        break;
        
    case 'PUT':
        // Update category or reorder list
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Reorder flow: body contains { order: [id1, id2, ...] }
        if (isset($input['order']) && is_array($input['order'])) {
            $categories = loadCategories();
            $current = $categories['categories'];
            $idToCat = [];
            foreach ($current as $cat) { $idToCat[$cat['id']] = $cat; }
            $new = [];
            foreach ($input['order'] as $id) {
                if (isset($idToCat[$id])) {
                    $new[] = $idToCat[$id];
                    unset($idToCat[$id]);
                }
            }
            // Append any categories not specified to preserve data
            foreach ($idToCat as $remaining) { $new[] = $remaining; }
            $categories['categories'] = $new;
            if (saveCategories($categories)) {
                echo json_encode(['success' => true, 'message' => 'Order updated']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to update order']);
            }
            exit;
        }
        
        // Update flow: requires id and name
        if (!isset($input['id']) || !isset($input['name']) || empty(trim($input['name']))) {
            echo json_encode(['success' => false, 'message' => 'Category ID and name are required']);
            exit;
        }
        
        $id = $input['id'];
        $name = trim($input['name']);
        $categories = loadCategories();
        
        // Find and update category
        $found = false;
        foreach ($categories['categories'] as &$category) {
            if ($category['id'] === $id) {
                $category['name'] = $name;
                $category['description'] = $input['description'] ?? $category['description'];
                // Allow setting/updating a cover image URL for album cover
                if (array_key_exists('cover', $input)) {
                    $category['cover'] = $input['cover'];
                }
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            echo json_encode(['success' => false, 'message' => 'Category not found']);
            exit;
        }
        
        if (saveCategories($categories)) {
            echo json_encode(['success' => true, 'category' => $category]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update category']);
        }
        break;
        
    case 'DELETE':
        // Delete category
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['id'])) {
            echo json_encode(['success' => false, 'message' => 'Category ID is required']);
            exit;
        }
        
        $id = $input['id'];
        $categories = loadCategories();
        
        // Check if category is used in gallery
        $gallery_file = '../data/gallery.json';
        if (file_exists($gallery_file)) {
            $gallery_content = file_get_contents($gallery_file);
            $gallery_data = json_decode($gallery_content, true);
            
            if (isset($gallery_data['gallery'])) {
                foreach ($gallery_data['gallery'] as $item) {
                    if (isset($item['category']) && $item['category'] === $id) {
                        echo json_encode(['success' => false, 'message' => 'Cannot delete category that has images. Please move or delete the images first.']);
                        exit;
                    }
                }
            }
        }
        
        // Remove category
        $found = false;
        foreach ($categories['categories'] as $key => $category) {
            if ($category['id'] === $id) {
                unset($categories['categories'][$key]);
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            echo json_encode(['success' => false, 'message' => 'Category not found']);
            exit;
        }
        
        // Reindex array
        $categories['categories'] = array_values($categories['categories']);
        
        if (saveCategories($categories)) {
            echo json_encode(['success' => true, 'message' => 'Category deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete category']);
        }
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
?> 