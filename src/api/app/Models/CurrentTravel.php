<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CurrentTravel extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'current_travels';
    protected $fillable = ['passenger_id', 'driver_id', 'passenger_name', 'start_direction', 'end_direction','driver_name','is_taken', 'tariff', 'start_coordinates', 'end_coordinates'];
}
