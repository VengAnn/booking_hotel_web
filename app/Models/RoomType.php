<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class RoomType extends Model
{
    protected $fillable = [
        'name',
        'capacity',
        'price_per_night',
        'description',
        'adults_capacity',
        'children_capacity',
        'bed_count'
    ];

    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(Amenity::class, 'room_type_amenities');
    }

    public function facilities(): BelongsToMany
    {
        return $this->belongsToMany(Facility::class, 'room_type_facilities');
    }

    public function images(): HasMany
    {
        return $this->hasMany(RoomTypeImage::class);
    }
}
