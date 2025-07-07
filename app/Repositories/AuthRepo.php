<?php

namespace App\Repositories;

use App\Interface\AuthInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;

class AuthRepo implements AuthInterface
{
    public function register(array $data)
    {
        return User::create([
            'username'   => $data['username'],
            'email'      => $data['email'],
            'password'   => Hash::make($data['password']),
            'phone'      => $data['phone'],
            'user_role'  => $data['user_role'],
        ]);
    }

    public function login(array $data)
    {
        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            return [
                'status' => 'error',
                'message' => 'Email not found Or Not registered',
                'code' => 404
            ];
        }

        if (!Hash::check($data['password'], $user->password)) {
            return [
                'status' => 'error',
                'message' => 'Incorrect password',
                'code' => 401
            ];
        }

        $token = JWTAuth::fromUser($user);
        $expiresAt = Carbon::now()
            ->addMinutes(JWTAuth::factory()->getTTL())
            ->toDateTimeString();

        return [
            'status' => 'success',
            'token' => $token,
            'user' => $user,
            'expires_at' => $expiresAt
        ];
    }

    public function logout(string $token): bool
    {
        try {
            // JWTAuth::invalidate($token);
            // return true;

            cache()->forget("user_token");
            cache()->forget("user_role");

            JWTAuth::setToken($token)->invalidate();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function updatePassword(string $pass)
    {
        $user = JWTAuth::user();

        $user->password = Hash::make($pass);
        $user->save();

        return $user;
    }

    public function updateUserData(array $data)
    {
        $user = \App\Models\User::find($data['id']);
        if (!$user) {
            throw new \Exception("User not found");
        }

        $user->username     = $data['username'] ?? $user->username;
        $user->email        = $data['email'] ?? $user->email;
        $user->phone        = $data['phone'] ?? $user->phone;
        $user->user_role    = $data['user_role'] ?? $user->user_role;
        $user->user_profile = $data['user_profile'] ?? $user->user_profile;

        $user->save();

        return $user;
    }


    public function resetDefualtPassword($id): bool
    {
        $user = User::find($id);

        if (!$user) return false;

        $user->password = Hash::make('1234567');
        return $user->save(); // returns true/false
    }


    public function toggleStatus($id)
    {
        $user = User::find($id);
        $user->is_active = !$user->is_active;
        $user->save();
        return $user;
    }

    public function getAllusers()
    {
        return User::all();
    }

    public function deleteUser($id)
    {
        return User::find($id)->delete();
    }
}
