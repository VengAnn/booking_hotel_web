<?php

namespace App\Repositories;

use App\Models\Facility;
use App\Interface\FacilityInterface;

class FacilityRepo implements FacilityInterface
{
    public function getAll()
    {
        return Facility::all();
    }

    public function getById($id)
    {
        return Facility::findOrFail($id);
    }

    public function create(array $data)
    {
        return Facility::create($data);
    }

    public function update($id, array $data)
    {
        $facility = Facility::findOrFail($id);
        $facility->update($data);
        return $facility;
    }

    public function delete($id)
    {
        $facility = Facility::findOrFail($id);
        return $facility->delete();
    }
}
