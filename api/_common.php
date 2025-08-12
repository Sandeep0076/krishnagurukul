<?php
/**
 * Optional for admin editing; remove if static-only
 * api/_common.php - Shared helpers for JSON endpoints (PHP 7.x)
 */

function send_json_file($path, $max_age = 60) {
    if (!file_exists($path)) {
        http_response_code(404);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Not found']);
        exit;
    }

    $etag = 'W/"' . md5_file($path) . '"';
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: public, max-age=' . intval($max_age));
    header('ETag: ' . $etag);
    header('Access-Control-Allow-Origin: *');

    if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH']) === $etag) {
        http_response_code(304);
        exit;
    }

    readfile($path);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    header('Allow: GET');
    exit;
} 