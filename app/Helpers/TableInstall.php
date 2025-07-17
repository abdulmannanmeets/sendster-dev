<?php

if (!function_exists('createTable')) {
    function createTable()
    {
        $host = config('database.connections.mysql.host');
        $username = config('database.connections.mysql.username');
        $password = config('database.connections.mysql.password');
        $port = config('database.connections.mysql.port');
        $database = config('database.connections.mysql.database');
        $prefix = config('database.connections.mysql.prefix');

        $connection = new mysqli($host, $username, $password, $database, $port);

        if ($connection->connect_error && mysqli_connect_errno() > 0) {
            return 0;
        }

        $mysqli_version = $connection->server_version;

        $mysqli_version = (int)str_ireplace(".", "", $mysqli_version);
        $loswer_version =  (int)"552";
        $charset = '';
        $sqldatabase = '';

        if ($mysqli_version > $loswer_version) {
            $charset .= " ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
            $sqldatabase .= "ALTER DATABASE `$database` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;";
        } else {
            $charset .= " ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
            $sqldatabase .= "ALTER DATABASE `$database` CHARACTER SET utf8 COLLATE utf8_unicode_ci;";
        }
        $database_one = $connection->query($sqldatabase);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "api_schedular_tables` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `cburl` varchar(255) NOT NULL,
        `stoken` varchar(255) NOT NULL,
        `stime` varchar(255) NOT NULL,
        `status` int(11) NOT NULL,
        `ip` varchar(255) NOT NULL,
        `date` varchar(255) NOT NULL,
        `time` varchar(255) NOT NULL,
        PRIMARY KEY (`id`)
      )";
        $one = $connection->query($sql1);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "campaigns` (
        `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` varchar(255) NOT NULL,
        `description` varchar(255) DEFAULT NULL,
        `email_details` text NOT NULL,
        `email_body` text NOT NULL,
        `attachments` text NOT NULL,
        `other` text NOT NULL,
        `list_ids` text NOT NULL,
        `total_mails` int(11) NOT NULL DEFAULT 0,
        `token` int(11) NOT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $two = $connection->query($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "campaign_unsubscribes` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `campaign_id` varchar(255) NOT NULL,
        `attempt` int(11) NOT NULL,
        `email` varchar(255) NOT NULL,
        `list_id` varchar(255) NOT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $three = $connection->query($sql2);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "email_schedules` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `list_id` text NOT NULL,
        `smtp_id` text NOT NULL,
        `campaign_id` varchar(255) NOT NULL,
        `status` int(11) NOT NULL,
        `subject` text NOT NULL,
        `body` text NOT NULL,
        `attachment` varchar(255) NOT NULL,
        `unsubscribe` text NOT NULL,
        `extra_emails` text NOT NULL,
        `sdate` varchar(255) NOT NULL,
        `stime` varchar(255) NOT NULL,
        `stimezone` varchar(255) NOT NULL,
        `stoken` varchar(255) NOT NULL,
        `mailsent` int(11) NOT NULL DEFAULT 0,
        `used_custom_emails` text DEFAULT NULL,
        `attempt` int(11) NOT NULL,
        `date` varchar(255) NOT NULL,
        `time` varchar(255) NOT NULL,
        PRIMARY KEY (`id`)
      )";
        $four = $connection->query($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "failed_jobs` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `uuid` varchar(255) NOT NULL UNIQUE,
        `connection` text NOT NULL,
        `queue` text NOT NULL,
        `payload` longtext NOT NULL,
        `exception` longtext NOT NULL,
        `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (`id`)
      )";
        $five = $connection->query($sql2);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "jobs` (
        `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        `queue` varchar(255) NOT NULL,
        `payload` longtext NOT NULL,
        `attempts` tinyint(3) UNSIGNED NOT NULL,
        `reserved_at` int(10) UNSIGNED DEFAULT NULL,
        `available_at` int(10) UNSIGNED NOT NULL,
        `created_at` int(10) UNSIGNED NOT NULL,
        PRIMARY KEY (`id`),
        KEY `" . $prefix . "jobs_queue_index` (`queue`)
      )";
        $six = $connection->query($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "job_batches` (
        `id` varchar(255) NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `total_jobs` int(11) NOT NULL,
        `pending_jobs` int(11) NOT NULL,
        `failed_jobs` int(11) NOT NULL,
        `failed_job_ids` text NOT NULL,
        `options` mediumtext DEFAULT NULL,
        `cancelled_at` int(11) DEFAULT NULL,
        `created_at` int(11) NOT NULL,
        `finished_at` int(11) DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $seven = $connection->query($sql2);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "links` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `url` varchar(255) NOT NULL,
        `name` varchar(255) DEFAULT NULL,
        `token` varchar(255) NOT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `" . $prefix . "_links_url_unique` (`url`)
      )";
        $eight = $connection->query($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "link_visits` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `attempt` varchar(255) NOT NULL,
        `url` varchar(255) NOT NULL,
        `text` varchar(255) DEFAULT NULL,
        `visits` int(11) NOT NULL DEFAULT 0,
        `email` varchar(255) NOT NULL,
        `otp` varchar(255) NOT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $nine = $connection->query($sql2);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "list_c_s` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` varchar(255) NOT NULL,
        `description` text DEFAULT NULL,
        `list_type` int(11) NOT NULL,
        `list_api_verify` int(11) NOT NULL,
        `verified` int(11) NOT NULL DEFAULT 0,
        `unverified` int(11) NOT NULL DEFAULT 0,
        `thank_you_email` longtext NOT NULL,
        `confirm_email` longtext NOT NULL,
        `goodbye_email` longtext NOT NULL,
        `unsubscribed` longtext NOT NULL,
        `subscribe` longtext NOT NULL,
        `priority` int(11) NOT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $ten = $connection->query($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "list_errors` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `name` varchar(255) DEFAULT NULL,
        `email` varchar(255) NOT NULL,
        `list_id` int(11) NOT NULL,
        `extra_fields` text DEFAULT NULL,
        `error` text NOT NULL,
        `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
        `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (`id`)
      )";
        $eleven = $connection->query($sql2);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "mail_sending_reports` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `attempt` int(11) NOT NULL,
        `campaign_id` int(11) NOT NULL DEFAULT 0,
        `list_id` text NOT NULL,
        `smtp_id` text NOT NULL,
        `email` varchar(255) NOT NULL,
        `status` int(11) NOT NULL,
        `error` text DEFAULT NULL,
        `subject` text NOT NULL,
        `body` text NOT NULL,
        `unsubscribe` text DEFAULT NULL,
        `extra_emails` text DEFAULT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $twelve = $connection->query($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "migrations` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `migration` varchar(255) NOT NULL,
        `batch` int(11) NOT NULL,
        PRIMARY KEY (`id`)
      ) AUTO_INCREMENT=26";
        $thirteen = $connection->query($sql2);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "options` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `name` text NOT NULL,
        `value` text NOT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $fourteen = $connection->query($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "password_resets` (
        `email` varchar(255) NOT NULL AUTO_INCREMENT,
        `token` varchar(255) NOT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `" . $prefix . "personal_access_tokens_email_index` (`email`)
      )";
        $fifteen = $connection->query($sql2);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "personal_access_tokens` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `token` varchar(64) NOT NULL,
        `abilities` text DEFAULT NULL,
        `last_used_at` timestamp NULL DEFAULT NULL,
        `expires_at` timestamp NULL DEFAULT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `" . $prefix . "personal_access_tokens_token_unique` (`token`)
      )";
        $sixteen = $connection->query($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "segments` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` varchar(255) NOT NULL,
        `segment_data` text NOT NULL,
        `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
        `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
        PRIMARY KEY (`id`)
      )";
        $seventeen = $connection->query($sql2);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "sequences` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` varchar(255) NOT NULL,
        `description` varchar(255) DEFAULT NULL,
        `email_inputs` longtext DEFAULT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $eighteen = $connection->query($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "smtps` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` varchar(255) NOT NULL,
        `basic` text NOT NULL,
        `credentials` text NOT NULL,
        `imap_setup` text NOT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $nineteen = $connection->query($sql2);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "snippets` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` text NOT NULL,
        `content` text DEFAULT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $twenty = $connection->query($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "subscriptions` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `form_name` varchar(255) NOT NULL,
        `form_title` varchar(255) NOT NULL,
        `form_type` varchar(255) NOT NULL DEFAULT '0',
        `redirect_after_subs` varchar(255) NOT NULL DEFAULT '{'is_redirect':false, url: ''}',
        `select_list` text NOT NULL,
        `delay_time` int(11) NOT NULL,
        `custom_inputs` text DEFAULT NULL,
        `style` text NOT NULL,
        `subscribe_button` varchar(255) NOT NULL,
        `form_description` text DEFAULT NULL,
        `hide_after_subs` tinyint(4) NOT NULL DEFAULT 0,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $twentyone = $connection->query($sql2);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "subscription_mail_schedules` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `sequence_id` int(11) NOT NULL,
        `list_id` varchar(255) NOT NULL,
        `smtp_id` varchar(255) NOT NULL,
        `status` int(11) NOT NULL,
        `subject` text NOT NULL,
        `body` text NOT NULL,
        `extra_emails` text NOT NULL,
        `sdate` varchar(255) NOT NULL,
        `stime` varchar(255) NOT NULL,
        `stimezone` varchar(255) NOT NULL,
        `stoken` varchar(255) NOT NULL,
        `date` varchar(255) NOT NULL,
        `time` varchar(255) NOT NULL,
        PRIMARY KEY (`id`)
      )";
        $twentytwo = $connection->query($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "unsubscibe_users` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `attempt` int(11) NOT NULL,
        `list_id` text NOT NULL,
        `email` varchar(255) NOT NULL,
        `status` int(11) NOT NULL,
        `ip` varchar(255) NOT NULL,
        `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
        `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
        PRIMARY KEY (`id`)
      )";
        $twentythree = $connection->query($sql2);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "users` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `email` varchar(255) NOT NULL,
        `email_verified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        `password` varchar(255) NOT NULL,
        `verified` int(11) NOT NULL,
        `ip_lastsignin` varchar(255) DEFAULT NULL,
        `ip_created` varchar(255) NOT NULL,
        `permission` varchar(255) NOT NULL,
        `profile_picture` varchar(255) NOT NULL,
        `remember_token` varchar(100) DEFAULT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $twentyfour = $connection->query($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "verify_emails` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `value` varchar(255) NOT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $twentyfive = $connection->query($sql2);

        $sql1 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "sequences` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` varchar(255) NOT NULL,
        `description` varchar(255) DEFAULT NULL,
        `email_inputs` longtext DEFAULT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $twentysix = $connection->query($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS `" . $prefix . "smtps` (
        `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` varchar(255) NOT NULL,
        `basic` text NOT NULL,
        `credentials` text NOT NULL,
        `imap_setup` text NOT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
      )";
        $twentyseven = $connection->query($sql2);

        if ($one && $two && $three && $four && $five && $six && $seven && $eight && $nine && $ten && $eleven && $twelve && $thirteen && $fourteen && $fifteen && $sixteen && $seventeen && $eighteen && $nineteen && $twenty && $twentyone && $twentytwo && $twentythree && $twentyfour && $twentyfive && $twentysix && $twentyseven) {
            return true;
        }
    }
}
