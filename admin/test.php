<?php
// Simple test to check if PHP is working and show upload limits
header('Content-Type: text/plain');
echo "PHP is working!\n\n";
$keys = ['upload_max_filesize','post_max_size','memory_limit','max_file_uploads','max_input_vars','max_execution_time'];
foreach ($keys as $k) {
    echo $k . ': ' . ini_get($k) . "\n";
}
?> 