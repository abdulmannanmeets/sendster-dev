<?php

use App\Models\MailSendingReport;

header("Content-Type: image/jpeg");
readfile("public/mail.png");

if(isset($_GET['imgvisit']) && isset($_GET['email']))
{
    $attempt = base64_decode($_GET['imgvisit']);
    $email = base64_decode($_GET['email']);
    MailSendingReport::where([
        ['attempt', '=', $attempt],
        ['email', '=', $email]
    ])->update(['status' => 2]);
}
?>