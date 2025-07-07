<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;
// use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

use Illuminate\Support\Facades\Route;

class ProtectRouteMiddelware
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = cache()->get('user_token');

        if ($token == null) {
            if (!Route::is('commons.auth.login_page')) {
                return redirect()->route('commons.auth.login_page');
            }
        } else {

            try {
                // Attempt to authenticate using the token
                JWTAuth::setToken($token)->authenticate();
                $payload = JWTAuth::getPayload($token);
                $expiration = $payload->get('exp');
                $expiredTime = Carbon::createFromTimestamp($expiration);
                $now = Carbon::now();
                $diffInHours = $now->diffInHours($expiredTime, false);

                // If the token expires in less than 24 hours,
                if ($diffInHours <= 24) {
                    return redirect()->route('commons.auth.login_page');
                }
            } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
                // remove old session
                session()->forget('token');
                // If token is invalid or missing
                return redirect()->route('commons.auth.login_page');
            } catch (\Exception $e) {
                if (!Route::is('commons.auth.login_page')) {
                    return redirect()->route('commons.auth.login_page');
                }
            }
        }

        // Allow the request to proceed if no redirects are necessary
        return $next($request);
    }
}
