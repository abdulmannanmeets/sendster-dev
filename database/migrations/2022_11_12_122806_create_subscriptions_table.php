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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('form_name');
            $table->string('form_title');
            $table->string('form_type')->default(0);
            $table->string('redirect_after_subs')->default('{"is_redirect":false, url: ""}');
            $table->text('select_list');
            $table->integer('delay_time');
            $table->text('custom_inputs')->nullable();
            $table->text('style');
            $table->string('subscribe_button');
            $table->text('form_description')->nullable();
            $table->tinyInteger('hide_after_subs')->default(0);
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
        Schema::dropIfExists('subscriptions');
    }
};
