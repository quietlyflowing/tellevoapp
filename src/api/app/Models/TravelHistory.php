<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TravelHistory extends Model
{
    use HasFactory;
    protected $table = 'travel_history';
    protected $hidden = ['created_at', 'updated_at', 'id'];
}
