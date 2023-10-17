<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    protected const API_KEY = 'rF2c3SnDAgQisoh6Pk72mwA41RD7G34ELVpN55Jsit7C8YNzMI';

    protected function returnJSONBuilder($responseCode = 500, $message = 'Insertar Mensaje aquí', $ourOwnCode = 0)
    {
        $toReturn = new \stdClass();
        $toReturn->code = $ourOwnCode;
        $toReturn->message = $message;
        return response()->json($toReturn, $responseCode, [], JSON_UNESCAPED_UNICODE);
    }
    use AuthorizesRequests, ValidatesRequests;
}
