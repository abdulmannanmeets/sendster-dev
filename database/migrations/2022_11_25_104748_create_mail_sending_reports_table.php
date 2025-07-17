<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mail_sending_reports', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('attempt');
            $table->integer('campaign_id')->default(0);
            $table->text('list_id');
            $table->text('smtp_id');
            $table->string('email');
            $table->integer('status');
            $table->text('error')->nullable();
            $table->text('subject');
            $table->text('body');
            $table->text('unsubscribe')->nullable()->default(null);
            $table->text('extra_emails')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mail_sending_reports');
    }
};
