<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TravelHistory extends Model
{
    use HasFactory;
    protected $table = 'travel_history';
    protected $fillable = ['user_id', 'from_coord', 'to_coord', 'to_coord', 'transport_user', 'total_payment', 'payment_type'];
    protected $hidden = ['updated_at', 'id'];
}
