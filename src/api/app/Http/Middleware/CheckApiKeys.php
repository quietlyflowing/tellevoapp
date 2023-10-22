<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\APIKeys;
use App\Http\Controllers\Controller;
class CheckApiKeys extends Controller
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {   
        if($request->exists('api_key')) {
           $key = APIKeys::where('key',$request->query('api_key'))->first();
           if($key !== null) {
            return $next($request);
           }
           return self::returnJSONBuilder(403, 'No tiene permiso para solicitar esta acción.', 0);
        }
        return self::returnJSONBuilder(400, 'Solicitud mal formada', 0);
    }
}
