<?php
// echo file_exists('storage/app');
// Check directory permission
if (!(file_exists('storage/app') && is_dir('storage/app') && (is_writable('storage/app')))) {
    echo "ERROR: The directory [/storage/app] must be writable by the web server.<br />";
    exit(0);
}

require 'main.php';