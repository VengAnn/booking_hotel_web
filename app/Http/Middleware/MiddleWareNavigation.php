<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;

class MiddleWareNavigation
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken(); // ← Get token from Authorization header

        if (!$token) {
            return $this->unauthorizedResponse($request, 'Authorization token missing');
        }

        try {
            $user = JWTAuth::setToken($token)->authenticate();
            $payload = JWTAuth::getPayload($token);
            $expiredTime = Carbon::createFromTimestamp($payload->get('exp'));

            if (Carbon::now()->greaterThan($expiredTime)) {
                return $this->unauthorizedResponse($request, 'Token expired');
            }

            return response()->json([
                'status' => 'success',
                'role' => $user->user_role,
            ]);
        } catch (\Exception $e) {
            return $this->unauthorizedResponse($request, 'Invalid or expired token');
        }
    }

    protected function unauthorizedResponse($request, $message)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'status' => 'unauthorized',
                'message' => $message
            ], 401);
        }

        return redirect()->route('commons.auth.login_page');
    }
}
