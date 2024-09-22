<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->longText('desc');
            $table->string('slug')->unique();
            $table->string('image');

            $table->string('project_url')->nullable();
            $table->string('code_url')->nullable();

            $table->string('technologies');

            $table->string('project_name');
            $table->string('short_desc');
            $table->string('project_icon')->nullable();

            $table->boolean('is_published')->default(true);
            $table->boolean('is_featured')->default(false);

            $table->longText('content');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
