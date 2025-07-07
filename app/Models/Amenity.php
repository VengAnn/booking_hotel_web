<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    protected $fillable = ['name', 'img_url'];

    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'room_amenity');
    }
}
