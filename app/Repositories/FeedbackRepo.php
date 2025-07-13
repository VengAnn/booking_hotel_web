<?php

namespace App\Repositories;

use App\Models\Feedback;
use App\Interface\FeedbackInterface;

class FeedbackRepo implements FeedbackInterface
{
    public function getAll()
    {
        return Feedback::latest()->get();
    }

    public function store(array $data)
    {
        return Feedback::create($data);
    }

    public function markAsRead(int $id)
    {
        $feedback = Feedback::findOrFail($id);
        $feedback->update(['is_read' => true]);
        return $feedback;
    }

    public function delete(int $id)
    {
        $feedback = Feedback::findOrFail($id);
        return $feedback->delete();
    }
}
