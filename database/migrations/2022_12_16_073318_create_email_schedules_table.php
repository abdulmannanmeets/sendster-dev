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
        Schema::create('email_schedules', function (Blueprint $table) {
            $table->increments('id');
            $table->text('list_id');
            $table->text('smtp_id');
            $table->string('campaign_id');
            $table->integer('status');
            $table->text('subject');
            $table->text('body');
            $table->string('attachment');
            $table->text('unsubscribe');
            $table->text('extra_emails');
            $table->string('sdate');
            $table->string('stime');
            $table->string('stimezone');
            $table->string('stoken');
            $table->integer('mailsent')->default(0);
            $table->text('used_custom_emails')->nullable();
            $table->integer('attempt');
            $table->string('date');
            $table->string('time');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('email_schedules');
    }
};
