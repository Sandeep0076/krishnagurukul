<?php
session_start();
header('Content-Type: application/json');

// Admin password - CHANGE THIS TO A SECURE PASSWORD
$admin_password = 'krishnagurukul2024';

// Check if password is provided
if (!isset($_POST['password'])) {
    echo json_encode(['success' => false, 'message' => 'Password required']);
    exit;
}

$password = $_POST['password'];

// Validate password
if ($password === $admin_password) {
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_login_time'] = time();
    echo json_encode(['success' => true, 'message' => 'Login successful']);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid password']);
}
?> 