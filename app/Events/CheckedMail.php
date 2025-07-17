<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CheckedMail
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $email, $subject, $body, $other, $attachments, $attempt, $smtp_arr, $key;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($email, $subject, $body, $other, $attachments, $attempt, $smtp_arr, $key)
    {
        $this->email = $email;
        $this->subject = $subject;
        $this->body = $body;
        $this->other = $other;
        $this->attachments = $attachments;
        $this->attempt = $attempt;
        $this->smtp_arr = $smtp_arr;
        $this->key = $key;
    }
}
