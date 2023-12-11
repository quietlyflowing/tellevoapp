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
        Schema::create('current_travels', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('passenger_id');
            $table->string('passenger_name');
            $table->unsignedBigInteger('driver_id')->nullable()->default(null);
            $table->string('driver_name')->nullable()->default(null);
            $table->unsignedBigInteger('tariff')->nullable()->default(null);
            $table->boolean('is_taken')->default(false);
            $table->json('start_coordinates');
            $table->json('start_direction')->nullable();
            $table->json('end_coordinates');
            $table->string('end_direction')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('current_travels');
    }
};
