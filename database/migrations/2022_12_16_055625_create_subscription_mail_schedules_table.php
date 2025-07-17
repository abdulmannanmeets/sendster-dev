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
        Schema::create('subscription_mail_schedules', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sequence_id');
            $table->string('list_id');
            $table->string('smtp_id');
            $table->integer('status');
            $table->text('subject');
            $table->text('body');
            $table->text('extra_emails');
            $table->string('sdate');
            $table->string('stime');
            $table->string('stimezone');
            $table->string('stoken');
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
        Schema::dropIfExists('subscription_mail_schedules');
    }
};
