<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Swift_Message;

class Mail extends Mailable
{
    use Queueable, SerializesModels;

    public $body, $email, $subject, $basic, $attachment_data, $name, $attempt, $temp_url_bounce_trace, $plain_body;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($subject, $body, $name, $email, $basic, $attachment_data, $attempt, $temp_url_bounce_trace, $plain_body = null)
    {
        $this->subject = $subject;
        $this->body = $body;
        $this->basic = $basic;
        $this->email = $email;
        $this->name = $name;
        $this->attachment_data = $attachment_data;
        $this->attempt = $attempt;
        $this->temp_url_bounce_trace = $temp_url_bounce_trace;
        $this->plain_body = $plain_body;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
{
    $mail = $this->subject($this->subject)
        ->from($this->basic['from_email'], $this->basic['from_name'])
        ->replyTo($this->basic['reply_email'], $this->basic['reply_name']);

    $mail->to($this->email, $this->name);

    if (isset($this->attachment_data['name']) && $this->attachment_data['name'] !== "") {
        $mail->attach(storage_path('app/public/campaigns/') . str_replace("uploads/", "", $this->attachment_data['url']));
    }

    if ($this->body && $this->plain_body) {
        $mail->view(['html' => 'emails.raw', 'text' => 'emails.raw_plain'])
            ->with(['content' => $this->body, 'plain_content' => $this->plain_body]);
    } elseif ($this->body) {
        $mail->html($this->body);
    } elseif ($this->plain_body) {
        $mail->text('emails.raw_plain')->with(['plain_content' => $this->plain_body]);
    }

    $mail->withSwiftMessage(function ($message) {
        $message->getHeaders()
            ->addTextHeader('X-sendster-id', $this->attempt)
            ->addTextHeader('X-sendster-url', $this->temp_url_bounce_trace);
    });

    return $mail;
}
}
