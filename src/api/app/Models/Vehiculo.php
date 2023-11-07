<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    use HasFactory;
    protected $table = 'vehicles';
    protected $primaryKey = 'user_id';
    protected $fillable = ['patente', 'modelo', 'año'];
}
