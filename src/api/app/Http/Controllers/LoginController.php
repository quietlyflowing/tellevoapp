<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    public function userLogin(Request $request)
    {
        $res = new \stdclass();
        $res->status = -1;


        $credentials = [
            "email" => $request->email,
            "password" => $request->password,
        ];

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $request->user()->tokens()->delete();
            $token = $request->user()->createToken($request->user()->email . "_token");
            return self::returnJSONBuilder(200, 'Sesión iniciada correctamente', 1, $token->plainTextToken);
        }
        return self::returnJSONBuilder(200, 'Credenciales nó validas', 0);

    }

    public function checkSession(Request $request)
    {

        if (Auth::check()) {
            // $res->status = 0;
           // $request->user()->tokens()->delete();
           // $token = Auth::user()->createToken(Auth::user()->email . "_token")->plainTextToken;
            return self::returnJSONBuilder(200, 'Sesión validada', 2);
        }
        return self::returnJSONBuilder(200, 'Sesión no válida', 0);

    }

    public function userLogout(Request $request)
    {
        if ($request->user() != null) {
            $request
                ->user()
                ->tokens()
                ->delete();
            Auth::guard('web')->logout();
            return self::returnJSONBuilder(200, 'Sesión cerrada correctamente.', 3);   
        }
        return self::returnJSONBuilder(200, 'No hay sesión iniciada', 0);
    }

    public function noSession(Request $request) {
        return self::returnJSONBuilder(200, 'No hay sesión iniciada', 0);
    }
}
