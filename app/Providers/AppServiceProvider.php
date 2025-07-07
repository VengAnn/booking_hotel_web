<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interface\AuthInterface;
use App\Interface\RoomInterface;
use App\Interface\AmenityInterface;
use App\Interface\FacilityInterface;
use App\Interface\RoomRelationInterface;
use App\Interface\RoomTypeInterface;
use App\Interface\SlideInterface;
use App\Repositories\AmenityRepo;
use App\Repositories\AuthRepo;
use App\Repositories\FacilityRepo;
use App\Repositories\RoomRelationRepository;
use App\Repositories\RoomRepo;
use App\Repositories\RoomTypeRepo;
use App\Repositories\SlideRepo;

class AppServiceProvider extends ServiceProvider
{
    // register interface and repository 
    public function register(): void
    {
        $this->app->bind(AuthInterface::class, AuthRepo::class);
        $this->app->bind(RoomInterface::class, RoomRepo::class);
        $this->app->bind(AmenityInterface::class, AmenityRepo::class);
        $this->app->bind(FacilityInterface::class, FacilityRepo::class);
        $this->app->bind(SlideInterface::class, SlideRepo::class);
        $this->app->bind(RoomTypeInterface::class, RoomTypeRepo::class);
        $this->app->bind(RoomRelationInterface::class, RoomRelationRepository::class);
    }


    // Register the event and listeners
    public function boot(): void
    {
        //
    }
}
