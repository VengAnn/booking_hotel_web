<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;

class AuthController
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'username'         => 'required|string|max:255',
            'email'            => 'required|email|unique:users,email',
            'password'         => 'required|string|min:6',
            'confirm_password' => 'required|string|min:6|same:password',
            'phone'            => 'required|string',
            'user_role'        => 'in:user,admin,staff'
        ]);

        return $this->authService->register($validated);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        return $this->authService->login($validated);
    }

    public function logout(Request $request)
    {
        $request->validate([
            'token' => 'required',
        ]);

        return $this->authService->logout($request->token);
    }

    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'password'         => 'required|string|min:6',
            'confirm_password' => 'required|string|min:6|same:password',
        ]);

        return $this->authService->updatePassword($validated['password']);
    }

    public function updateUserData(Request $request)
    {
        $validated = $request->validate([
            'id'            => 'required|exists:users,id',
            'username'      => 'required|string|max:255',
            'email'         => 'required|email',
            'phone'         => 'required|string',
            'user_role'     => 'in:user,admin,staff',
            'user_profile'  => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('user_profile')) {
            $validated['user_profile'] = $request->file('user_profile');
        }

        return $this->authService->updateUserData($validated);
    }

    public function getCurrentUser(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:users,id'
        ]);
        return $this->authService->getCurrentUser($request->id);
    }


    public function resetDefualtPassword(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:users,id',
        ]);

        return $this->authService->resetDefualtPassword($validated['id']);
    }


    public function toggleStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:users,id'
        ]);
        return $this->authService->toggleStatus($request->id);
    }

    public function getAllUsers()
    {
        return $this->authService->getAllUsers();
    }

    public function deleteUser(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:users,id'
        ]);
        return $this->authService->deleteUser($request->id);
    }
}
