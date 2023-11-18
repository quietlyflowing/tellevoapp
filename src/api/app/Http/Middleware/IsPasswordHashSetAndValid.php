<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use App\Http\Controllers\Controller;

class IsPasswordHashSetAndValid extends Controller
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {   
        if($request->exists('hash')) {
           $hash = $request->query('hash');
           $user = User::where('email', $request->email)->first();
           if($hash === $user->password_change_hash && \Carbon\Carbon::now() <= \Carbon\Carbon::parse($user->hash_valid_until)) {
            return $next($request);
           }
           return self::returnJSONBuilder(403, 'No tiene permiso para solicitar esta acción.', 0);
        }
        return self::returnJSONBuilder(400, 'Solicitud mal formada', 0);
    }
}
