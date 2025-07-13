<?php

namespace App\Interface;

interface FeedbackInterface
{
    public function getAll();
    public function store(array $data);
    public function markAsRead(int $id);
    public function delete(int $id);
}
