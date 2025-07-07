<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    protected $fillable = ['name', 'img_url'];

    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'room_facility');
    }
}
