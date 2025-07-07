<?php

namespace App\Interface;

interface RoomInterface
{
    public function getAll();
    public function findById($id);
    public function create(array $data);
    public function update($id, array $data);
    public function updateStatus($id, $status);
    public function delete($id);
}
