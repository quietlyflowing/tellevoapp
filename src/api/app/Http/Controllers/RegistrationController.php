<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\DuocMail;

class RegistrationController extends Controller
{
    public function register(Request $request) {
        $user = new User();
        $user->name = DuocMail::where('correo_electronico', $request->email)->first()->nombre;
        $user->email = $request->email;
        $user->email_verified_at = \Carbon\Carbon::now();
        $user->password = \Hash::make($request->password);
        if($request->is_driver) {
            $user->is_driver = 1;
        } else {
            $user->is_driver = 0;
        }
        $user->telefono = $request->phone;
        $user->patente = $request->patente;
        $user->save();

        return response()->json($user, 200, [], JSON_UNESCAPED_UNICODE);
    }
}
