<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{
    use HasFactory;

    protected $table = 'users_data';
    protected $primaryKey = 'user_id';

    protected $fillable = [ 'nombre', 'telefono', 'direccion_hogar', 'direccion_duoc']; 
}
