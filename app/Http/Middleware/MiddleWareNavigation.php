<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;
// use Illuminate\Support\Facades\Log;
// use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Facades\JWTAuth;

class MiddleWareNavigation
{

    public function handle(Request $request, Closure $next): Response
    {
        $token = cache()->get('user_token');

        if ($token) {
            try {
                $user = JWTAuth::setToken($token)->authenticate();
                $payload = JWTAuth::getPayload($token);
                $expiredTime = Carbon::createFromTimestamp($payload->get('exp'));
                $now = Carbon::now();

                if ($now->greaterThan($expiredTime)) {
                    return redirect()->route('commons.auth.login_page');
                }

                // Redirect to dashboard based on role
                if ($user->user_role === 'admin') {
                    return redirect()->route('admin.pages.home_dashboard');
                } elseif ($user->user_role === 'user') {
                    return $next($request); // allow client homepage
                }
            } catch (\Exception $e) {
                return redirect()->route('commons.auth.login_page');
            }
        }

        return $next($request);
    }
}
