<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DuocMail;

class DuocMailController extends Controller
{

 
    public function checkValidMail(Request $request)
    {
        //Primero checkearemos que la llave de la API sea traída por la query string
        if ($request->exists('api_key') && $request->exists('mail')) {

            if ($request->query('api_key') !== self::API_KEY) {
                return self::returnJSONBuilder(403, 'La llave de API es incorrecta o no viene en la URL.', 0);
            }
            //Ahora buscamos si el correo electrónico existe
            $result = DuocMail::where('correo_electronico', $request->query('mail'))->first();
            if (is_null($result)) {
                return self::returnJSONBuilder(200,  'No se ha encontrado el correo electrónico en la base de datos', 255);
            } else {
                return self::returnJSONBuilder(200, 'Correo Electrónico existe.', 1);
            }
        } else {
            return self::returnJSONBuilder(400, 'Solicitud mal formada', 0);
        }



    }


}