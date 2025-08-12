<?php
/**
 * Optional for admin editing; remove if static-only
 * api/events.php - Serve events as JSON from data/events.json
 */
require __DIR__ . '/_common.php';
$path = __DIR__ . '/../data/events.json';
send_json_file($path, 60); 