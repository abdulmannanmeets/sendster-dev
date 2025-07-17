<?php

namespace App\Jobs;

use App\Http\Controllers\ListCController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class UploadEmailsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $request;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($request)
    {
        $this->request = $request;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $data = $this->request['data'];
        $list_id = $this->request['list_id'];
        $is_replace = $this->request['is_replace'];
        for ($i = 0; $i < count($data); $i++) {
            $name = $data[$i][0];
            $email = $data[$i][1];
            $custom = $data[$i][2];
            $post_data = array(
                'name' => $name,
                'email' => $email,
                'list_id' => $list_id,
                'source' => 'Admin',
                'valid' => 0,
                'is_replace' => $is_replace,
                'api' => 0,
                'status' => 'create',
                'custom' => $custom,
                'id' => 0,
            );
            $leads = new ListCController();
            $leads->create_leads($post_data);
        }
    }
}
