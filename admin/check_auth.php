<?php
session_start();
header('Content-Type: application/json');

// Check if user is logged in and session is not expired (24 hours)
$authenticated = false;

if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    // Check if session is not expired (24 hours)
    if (isset($_SESSION['admin_login_time']) && (time() - $_SESSION['admin_login_time']) < 86400) {
        $authenticated = true;
    } else {
        // Session expired, destroy it
        session_destroy();
    }
}

echo json_encode(['authenticated' => $authenticated]);
?> 