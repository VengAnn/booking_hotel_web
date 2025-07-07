<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoomType extends Model
{
    protected $fillable = [
        'name',
        'capacity',
        'price_per_night',
        'description',
        'adults_capacity',
        'children_capacity',
    ];

    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }
}
