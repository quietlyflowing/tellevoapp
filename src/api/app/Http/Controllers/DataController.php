<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class DataController extends Controller
{
    //

    public function returnAllUserData(Request $request) {
        $pk = Auth::user()->id;
        $checkUser = User::find($pk);
        $user = User::where('id', '=', $pk);
        if($checkUser->IS_DRIVER === 1) {
           $data = $user->with('datos', 'vehiculos')->get();
            return self::returnJSONBuilder(200, 'Registro Solicitado Encontrado', 0, $data);
        } 
        $data = $user->with('datos')->get();
        return self::returnJSONBuilder(200, 'Registro Solicitado Encontrado', 0, $data);
    }
}
