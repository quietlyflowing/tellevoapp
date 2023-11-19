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
           $data = $user->with('datos', 'vehiculos', 'travels')->get()->toArray();
            return self::returnJSONBuilder(200, 'Registro Solicitado Encontrado', 0, $data);
        } 
        $data = $user->with('datos', 'travels')->get()->toArray();
        foreach($data[0]['travels'] as $k => $v){
            $data[0]['travels'][$k]['from_coord'] = json_decode($v['from_coord'], true);
            $data[0]['travels'][$k]['to_coord'] = json_decode($v['to_coord'], true);
        }
        return self::returnJSONBuilder(200, 'Registro Solicitado Encontrado', 0, $data);
    }
}
