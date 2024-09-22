<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');

            $table->string('title');
            $table->longText('content');
            $table->string('slug')->unique();
            $table->string('image')->nullable();

            $table->string('category');

            $table->string('name');
            $table->longText('desc');
            $table->string('jobTitle');
            $table->string('readTime');

            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};