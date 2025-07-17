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
        Schema::create('list_c_s', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('list_type');
            $table->integer('list_api_verify');
            $table->integer('verified')->default(0);
            $table->integer('unverified')->default(0);
            $table->longText('thank_you_email');
            $table->longText('confirm_email');
            $table->longText('goodbye_email');
            $table->longText('unsubscribed');
            $table->longText('subscribe');
            $table->integer('priority');
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
        Schema::dropIfExists('list_c_s');
    }
};
