<?php

namespace App\Interface;

interface RoomTypeInterface
{
    public function all();
    public function store(array $data);
    public function update(array $data, $id);
    public function delete($id);
}
