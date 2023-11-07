<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\DuocMail;
use App\Models\UserData;
use App\Models\Vehiculo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RegistrationController extends Controller
{
    public function checkValidMail(Request $request)
    {
        //Primero checkearemos que la llave de la API sea traída por la query string
        if ($request->exists('mail')) {
            //Ahora buscamos si el correo electrónico existe
            $result = DuocMail::where('correo_electronico', $request->query('mail'))->first();
            if (is_null($result)) {
                return self::returnJSONBuilder(200, 'No se ha encontrado el correo electrónico en la base de datos', 4);
            } else {
                return self::returnJSONBuilder(200, 'Correo Electrónico existe.', 5);
            }
        } else {
            return self::returnJSONBuilder(400, 'Solicitud mal formada', 255);
        }
    }

    public function register(Request $request)
    {
        $result = DuocMail::where('correo_electronico', $request->email)->first();
        if (is_null($result)) {
            return self::returnJSONBuilder(200, 'No se ha encontrado el correo electrónico en la base de datos', 4);
        }
        \DB::beginTransaction();

        $user = new User();
        $user->email = $request->email;
        $user->password = \Hash::make($request->password);
        if (isset($request->is_driver) && $request->is_driver === 1) {
            $user->IS_DRIVER = 1;
        } else {
            $user->IS_DRIVER = 0;
        }
        try {
            $user->save();
            $user->datos()->create(['nombre' => DuocMail::where('correo_electronico', $request->email)->first()->nombre, 'telefono' => $request->phone]);
            if ($user->IS_DRIVER === 1) {
                $user->vehiculos()->create(['patente' => $request->patente, 'modelo' => $request->modelo, 'año' => $request->año]);
            }
            \DB::commit();
            return self::returnJSONBuilder(200, 'Registro completado correctamente.', 6);
        } catch(\Exception $e) {
            \DB::rollBack();
            return self::returnJSONBuilder(500, $e->getMessage(), 255);
        }
    }

    public function updateVehicleInfo(Request $request) {
        // {
        //     "patente" : "DNFA59",
        //     "modelo" : "Toyota Corolla",
        //     "año" : 2015
        // }
        //No es necesario que estén seteados todos los campos, pero el campo que venga no puede estar vacío

        $inputArray = json_decode($request->getContent(), true);
        DB::beginTransaction();
        try {
            $toUpdate = Vehiculo::firstWhere('user_id', Auth::id());
            foreach($inputArray as $key => $value){
                $toUpdate->{$key} = $value;
            }
            $toUpdate->save();
            DB::commit();
            return self::returnJSONBuilder(200, 'Datos del vehículo actualizados correctamente.', 255);
        }
        catch (\Exception $e) {
            DB::rollback();
            return self::returnJSONBuilder(500, $e->getMessage(), 255);
        } 
    }
    public function updateUserInfo(Request $request) {
        $inputArray = json_decode($request->getContent(), true);
        DB::beginTransaction();
        try {
            $toUpdate = UserData::firstWhere('user_id', Auth::id());
            foreach($inputArray as $key => $value){
                $toUpdate->{$key} = $value;
            }
            $toUpdate->save();
            DB::commit();
            return self::returnJSONBuilder(200, 'Datos del usuario actualizados correctamente.', 255);
        }
        catch (\Exception $e) {
            DB::rollback();
            return self::returnJSONBuilder(500, $e->getMessage(), 255);
        } 
    }
    public function updateUserCredentials(Request $request) {
        //{
        // "email": "te.st@duocuc.cl",
        // "password": "testpassword"
        //    
        //}
        $inputArray = json_decode($request->getContent(), true);
        DB::beginTransaction();
        try {
            $toUpdate = User::find(Auth::id());
            foreach($inputArray as $key => $value){
                $toUpdate->{$key} = $value;
            }
            $toUpdate->save();
            DB::commit();
            return self::returnJSONBuilder(200, 'Datos del usuario actualizados correctamente.', 255);
        }
        catch (\Exception $e) {
            DB::rollback();
            return self::returnJSONBuilder(500, $e->getMessage(), 255);
        } 
    }


}
