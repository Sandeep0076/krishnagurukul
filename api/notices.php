<?php
/**
 * Optional for admin editing; remove if static-only
 * api/notices.php - Serve notices as JSON from data/notices.json
 */
require __DIR__ . '/_common.php';
$path = __DIR__ . '/../data/notices.json';
send_json_file($path, 30); 