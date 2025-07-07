<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoomAmenity extends Model
{
    protected $table = 'room_amenities';


    protected $fillable = [
        'room_id',
        'amenity_id',
    ];

    // public $timestamps = true;

    public function amenity()
    {
        return $this->belongsTo(Amenity::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
