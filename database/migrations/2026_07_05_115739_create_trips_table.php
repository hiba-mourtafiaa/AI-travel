<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('country');
            $table->string('duration');
            $table->string('budget');
            $table->string('group');
            $table->text('vibes')->nullable();        
            $table->text('activities')->nullable();   
            $table->integer('rating')->nullable();
            $table->string('period')->nullable();
            $table->string('transport')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};