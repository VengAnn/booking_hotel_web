<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FeedbackService;

class FeedbackController
{
    protected $service;

    public function __construct(FeedbackService $service)
    {
        $this->service = $service;
    }

    public function getAll()
    {

        return  $this->service->getAll();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string',
        ]);


        return  $this->service->store($request->all());
    }

    public function markAsRead($id)
    {

        return $this->service->markAsRead($id);
    }

    public function destroy($id)
    {

        return  $this->service->delete($id);
    }
}
