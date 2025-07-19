<?php

namespace App\Interface;

interface PayInterface
{
    public function getAll();
    public function getById($id);
    public function create(array $data);
    public function update($bookingId, array $data);
    public function delete($id);
}
