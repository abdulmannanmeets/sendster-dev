<?php

namespace App\Listeners;

use App\Events\Checkedmail;
use App\Jobs\SendMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CheckedMailListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\Checkedmail  $event
     * @return void
     */
    public function handle(Checkedmail $event)
    {
        $cron_delay = (int)get_option('cron_delay_sec');
        $other = $event->other;
        $is_schedule = isset($other["is_schedule"]) ? $other["is_schedule"] : 0;
        $date1 = isset($other["datetime"]) ? $other["datetime"] : date('d-m-Y h:ia');
        $date2 = date("d-m-Y h:ia");
        $diff = abs(strtotime($date2) - strtotime($date1));
        $years   = floor($diff / (365 * 60 * 60 * 24));
        $months  = floor(($diff - $years * 365 * 60 * 60 * 24) / (30 * 60 * 60 * 24));
        $days    = floor(($diff - $years * 365 * 60 * 60 * 24 - $months * 30 * 60 * 60 * 24) / (60 * 60 * 24));
        $hours   = floor(($diff - $years * 365 * 60 * 60 * 24 - $months * 30 * 60 * 60 * 24 - $days * 60 * 60 * 24) / (60 * 60));
        $minuts  = floor(($diff - $years * 365 * 60 * 60 * 24 - $months * 30 * 60 * 60 * 24 - $days * 60 * 60 * 24 - $hours * 60 * 60) / 60);
        $seconds = floor(($diff - $years * 365 * 60 * 60 * 24 - $months * 30 * 60 * 60 * 24 - $days * 60 * 60 * 24 - $hours * 60 * 60 - $minuts * 60));

        if ($event->key !== 0) {
            if($is_schedule || $is_schedule == "true") {
                SendMail::dispatch($event->email, $event->subject, $event->body, $event->other['unsubscribe_message'], $event->attachments, $event->other, $event->attempt, $event->smtp_arr)->delay(now()->addYear($years)->addMonth($months)->addDay($days)->addHour($hours)->addSecond($seconds)->addSecond($cron_delay));
            } else {
                SendMail::dispatch($event->email, $event->subject, $event->body, $event->other['unsubscribe_message'], $event->attachments, $event->other, $event->attempt, $event->smtp_arr)->delay(now()->addSecond($cron_delay));
            }
        } else {
            if($is_schedule || $is_schedule == "true") {
                SendMail::dispatch($event->email, $event->subject, $event->body, $event->other['unsubscribe_message'], $event->attachments, $event->other, $event->attempt, $event->smtp_arr)->delay(now()->addYear($years)->addMonth($months)->addDay($days)->addHour($hours)->addSecond($seconds)->addSecond($cron_delay));
            } else {
                SendMail::dispatch($event->email, $event->subject, $event->body, $event->other['unsubscribe_message'], $event->attachments, $event->other, $event->attempt, $event->smtp_arr);
            }
        }
    }
}
