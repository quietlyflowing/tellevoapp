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
        Schema::table('travel_history', function (Blueprint $table) {
            //
            $table->foreign(['user_id'], 'fk_user_history')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('travel_history', function (Blueprint $table) {
            //
            $table->dropForeign('fk_user_history');
        });
    }
};
