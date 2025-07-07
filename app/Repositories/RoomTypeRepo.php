<?php

namespace App\Repositories;

use App\Interface\RoomTypeInterface;
use App\Models\RoomType;

class RoomTypeRepo implements RoomTypeInterface
{
    public function all()
    {
        return RoomType::all();
    }

    public function store(array $data)
    {
        return RoomType::create($data);
    }

    public function update(array $data, $id)
    {
        $roomType = RoomType::findOrFail($id);
        $roomType->update($data);
        return $roomType;
    }

    public function delete($id)
    {
        $roomType = RoomType::findOrFail($id);
        return $roomType->delete();
    }
}
