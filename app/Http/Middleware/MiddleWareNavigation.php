<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;
// use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

use Illuminate\Support\Facades\Route;

class MiddleWareNavigation
{

    public function handle(Request $request, Closure $next): Response
    {
        $token = cache()->get('user_token');

        if ($token) {
            try {
                $user = JWTAuth::setToken($token)->authenticate();
                $payload = JWTAuth::getPayload($token);
                $expiration = $payload->get('exp');
                $expiredTime = Carbon::createFromTimestamp($expiration);
                $now = Carbon::now();

                // Check if user exists and token is valid
                if ($user) {
                    if ($now->greaterThan($expiredTime)) {
                        if (!Route::is('commons.auth.login_page')) {
                            return redirect()->route('commons.auth.login_page');
                        }
                    }

                    // Redirect based on user role
                    if ($user->user_role === 'admin') {
                        if (!Route::is('admin.pages.home_dashboard')) {
                            return redirect()->route('admin.pages.home_dashboard');
                        }
                    } elseif ($user->user_role === 'user') {
                        if (!Route::is('clients.pages.home_page')) {
                            return redirect()->route('clients.pages.home_page');
                        }
                    }
                }
            } catch (\Exception $e) {
                if (!Route::is('clients.pages.home_page')) {
                    return redirect()->route('clients.pages.home_page');
                }
            }
        }
        return $next($request);
    }
}
