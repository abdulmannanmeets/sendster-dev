<?php

namespace App\Console\Commands;

use Cron\Cron;
use Cron\Executor\Executor;
use Cron\Job\ShellJob;
use Cron\Resolver\ArrayResolver;
use Cron\Schedule\CrontabSchedule;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class RunCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'run:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'To start the cron';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Log::info(time());
        // Artisan::call("schedule:run");
        // sleep(10);
        // Log::info(time());
        // Artisan::call("queue:work");
    }
}
