<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invalidate_token_tbs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->text(column: 'access_tk');
            $table->dateTime('expired_tk');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invalidate_token_tbs');
    }
};
