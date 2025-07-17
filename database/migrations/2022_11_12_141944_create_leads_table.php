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
        Schema::create('leads', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('list_id');
            $table->string('name')->nullable();
            $table->string('email');
            $table->longText('extra_fields')->nullable();
            $table->string('source');
            $table->tinyInteger('verified')->default(0);
            $table->string('subs_id')->default(0);
            $table->tinyInteger('confirmed')->default(1);
            $table->tinyInteger('is_error')->default(0);
            $table->string('error')->default(null);
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
        Schema::dropIfExists('leads');
    }
};
