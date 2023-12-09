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
        Schema::table('current_travels', function (Blueprint $table) {
            //
            $table->foreign(['passenger_id'], 'fk_passenger_id')->references('id')->on('users');
            $table->foreign(['driver_id'], 'fk_driver_id')->references('id')->on('users');
            $table->unique(['id', 'passenger_id', 'driver_id'], 'u_unique_travel');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('current_travels', function (Blueprint $table) {
            //
            $table->dropForeign('fk_passenger_id');
            $table->dropForeign('fk_driver_id');
            $table->dropUnique('u_unique_travel');
        });
    }
};
