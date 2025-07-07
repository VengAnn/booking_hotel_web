<?php

namespace App\Interface;

interface AuthInterface
{
    public function register(array $data);
    public function login(array $data);
    public function logout(string $token): bool;
    public function updatePassword(string $pass);
    public function updateUserData(array $data);
    public function resetDefualtPassword($id): bool;
    public function toggleStatus($id);
    public function getAllusers();
    public function deleteUser($id);
}
