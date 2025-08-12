<?php
/**
 * Optional for admin editing; remove if static-only
 * api/news.php - Serve news as JSON from data/news.json
 */
require __DIR__ . '/_common.php';
$path = __DIR__ . '/../data/news.json';
send_json_file($path, 300); 