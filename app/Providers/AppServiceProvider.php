<?php

namespace App\Providers;

use Illuminate\Queue\Events\JobFailed;
use Illuminate\Queue\Events\JobProcessed;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if (config('app.url') == "") {
            $url = substr(site_url(), 0, -1);
            config(['app.url' => site_url()]);
            putenv('APP_URL=' . $url);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Queue::after(function (JobProcessed $event) {
        //     $payload = $event->job->payload();

        //     if (isset($payload['data']['command'])) {
        //         $command = unserialize($payload['data']['command']);
        //         if($command instanceof \App\Jobs\SendMail) {
        //             $email = $command->email;
        //             $attempt = $command->attempt;
        //             // Log::info($attempt);
        //         }
        //         // $jobData = unserialize($command);
        //         // Do something with the unserialized job data
        //     }
        // });

        // Queue::failing(function (JobFailed $event) {
        //     $payload = $event->job->payload();
            
        //     if (isset($payload['data']['command'])) {
        //         $command = unserialize($payload['data']['command']);
        //         if($command instanceof \App\Jobs\SendMail) {
        //             $exception = isset($event->job->exception) ? $event->job->exception : "";
        //             Log::info(json_encode($command));
        //             $emails = $command->email;
        //             $attempt = $command->attempt;
        //             $subject = $command->subject;
        //             $unsubscribe = $command->unsubscribe;
        //             $body = $command->body;
        //             $smtp_arr = $command->smtp_arr;
        //             foreach($emails as $email) {
        //                 DB::table('mail_sending_reports')->updateOrInsert([
        //                     'attempt' => $attempt,
        //                     'email' => $email['email']
        //                 ],[
        //                     "attempt" => $attempt,
        //                     "list_id" => json_encode(isset($command->email['list_id']) ? $command->email['list_id'] : []),
        //                     "smtp_id" => json_encode($smtp_arr),
        //                     "email" => $email['email'],
        //                     "status" => 0,
        //                     "error" => gettype($exception) == "string" ? $exception : json_encode($exception),
        //                     "subject" => $subject,
        //                     "body" => $body,
        //                     "unsubscribe" => $unsubscribe,
        //                     "extra_emails" => $email['list_id'] == "" ? "" : $email['email'],
        //                     "created_at" => now(),
        //                     "updated_at" => now(),
        //                 ]);
        //             }
        //         }
        //     }
        // });
    }
}
