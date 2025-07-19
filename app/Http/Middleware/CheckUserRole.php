<?php

namespace App\Http\Middleware;

use App\Classes\ApiResClass as Res;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class CheckUserRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        try {
            $token = $request->bearerToken(); // get raw token string

            if (!$token) {
                return Res::sendError('Unauthorized - No token provided.', 401);
            }

            // Check if token is in invalidated_token_tables
            // if (InvalidateTokenTb::where('access_tk', $token)->exists()) {
            //     return Res::sendError('Token has been invalidated.', 401);
            // }

            $user = JWTAuth::setToken($token)->authenticate();

            if (!$user) {
                return Res::sendError('Unauthorized - User not authenticated.', 401);
            }

            if (!in_array($user->user_role, $roles)) {
                return Res::sendError('Forbidden - You do not have permission to access this resource.', 403);
            }
        } catch (TokenInvalidException $e) {
            return Res::sendError('Token is invalid', 401);
        } catch (TokenExpiredException $e) {
            return Res::sendError('Token has expired', 401);
        } catch (\Exception $e) {
            return Res::sendError('Authorization error: ' . $e->getMessage(), 401);
        }

        return $next($request);
    }
}
