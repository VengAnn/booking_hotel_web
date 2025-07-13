<?php

namespace App\Interface;

interface ReviewInterface
{
    public function getAll();
    public function getByRoom($roomId);
    public function store(array $data);
    public function delete(int $id);

    public function getReviewInWhatRoomTypeById($id);
}
