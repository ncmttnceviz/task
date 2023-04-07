<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('point_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->references('id')->on('members');
            $table->foreignId('user_id')->nullable()->unsigned()->references('id')->on('users');
            $table->integer('desired_point');
            $table->integer('added_point')->nullable()->default(0);
            $table->string('state',15);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('point_requests');
    }
};
