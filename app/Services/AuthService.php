<?php

namespace App\Services;

use App\Classes\ApiResClass as Res;
use App\Interface\AuthInterface;
use App\Helpers\FileHelper;
use GuzzleHttp\Psr7\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;

class AuthService
{
    protected $authRepo;

    public function __construct(AuthInterface $authRepo)
    {
        $this->authRepo = $authRepo;
    }

    public function register(array $data)
    {
        try {
            $userRes = $this->authRepo->register($data);

            return Res::sendResponse($userRes, 'User registered successfully');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Failed to register user');
        }
    }

    public function login(array $data)
    {
        try {
            $userRes = $this->authRepo->login($data);

            if (isset($userRes['status']) && $userRes['status'] === 'error') {
                return Res::sendError($userRes['message'], $userRes['code']);
            }

            cache()->forget("user_token");
            cache()->forget("user_role");

            cache()->forever("user_token", $userRes['token']);
            cache()->forever("user_role", $userRes['user']->user_role);

            return Res::sendResponse($userRes, 'User logged in successfully');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Failed to login user');
        }
    }


    public function logout(string $token)
    {
        try {
            $isLogoutOk = $this->authRepo->logout($token);

            if (!$isLogoutOk) {
                return Res::sendError('Logout failed', 401);
            }

            return Res::sendResponse($isLogoutOk, 'Logout successful');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Failed to logout');
        }
    }

    public function updatePassword(string $pass)
    {
        try {
            $userRes = $this->authRepo->updatePassword($pass);

            return Res::sendResponse($userRes, 'Password updated successfully');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Failed to update password');
        }
    }

    public function updateUserData(array $data)
    {
        try {
            $user = \App\Models\User::find($data['id']);
            if (!$user) {
                throw new \Exception("User not found");
            }

            if (isset($data['user_profile']) && $data['user_profile'] instanceof \Illuminate\Http\UploadedFile) {
                $data['user_profile'] = FileHelper::storeImage($data['user_profile'], 'profile_images', $user->user_profile);
            } else {
                unset($data['user_profile']);
            }

            $updatedUser = $this->authRepo->updateUserData($data);

            return Res::sendResponse($updatedUser, 'User data updated successfully');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Failed to update profile');
        }
    }


    // public function resetDefualtPassword(Request $request)
    // {
    //     try {
    //         // $request->validate([
    //         //     'email' => 'required|email',
    //         // ]);

    //         $userRes = $this->authRepo->resetDefualtPassword();

    //         return Res::sendResponse($userRes, 'Password reset successfully');
    //     } catch (\Exception $e) {
    //         return Res::rollback($e, 'Failed to reset password');
    //     }
    // }
    public function resetDefualtPassword($id)
    {
        try {
            $userRes = $this->authRepo->resetDefualtPassword($id);

            return Res::sendResponse($userRes, 'Password reset successfully');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Failed to reset password');
        }
    }


    public function toggleStatus($id)
    {
        try {
            $userRes = $this->authRepo->toggleStatus($id);

            return Res::sendResponse($userRes, 'User status updated successfully');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Failed to update user status');
        }
    }

    public function getAllUsers()
    {
        try {
            $userRes = $this->authRepo->getAllUsers();

            return Res::sendResponse($userRes, 'Users fetched successfully');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Failed to fetch users');
        }
    }

    public function getCurrentUser($userId)
    {
        try {
            $userRes = $this->authRepo->getCurrentUser($userId);

            return Res::sendResponse($userRes, 'User fetched successfully');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Failed to fetch user');
        }
    }

    public function deleteUser($id)
    {
        try {
            $userRes = $this->authRepo->deleteUser($id);

            return Res::sendResponse($userRes, 'User deleted successfully');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Failed to delete user');
        }
    }
}
