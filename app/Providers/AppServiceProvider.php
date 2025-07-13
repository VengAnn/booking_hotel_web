<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interface\AuthInterface;
use App\Interface\RoomInterface;
use App\Interface\AmenityInterface;
use App\Interface\BookingInterface;
use App\Interface\FacilityInterface;
use App\Interface\FeedbackInterface;
use App\Interface\ReviewInterface;
use App\Interface\RoomTypeInterface;
use App\Interface\RoomTypeRelationInterface;
use App\Interface\SlideInterface;
use App\Repositories\AmenityRepo;
use App\Repositories\AuthRepo;
use App\Repositories\BookingRepo;
use App\Repositories\FacilityRepo;
use App\Repositories\FeedbackRepo;
use App\Repositories\ReviewRepo;
use App\Repositories\RoomRepo;
use App\Repositories\RoomTypeRelationRepo;
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
        $this->app->bind(RoomTypeRelationInterface::class, RoomTypeRelationRepo::class);
        $this->app->bind(BookingInterface::class, BookingRepo::class);
        $this->app->bind(FeedbackInterface::class, FeedbackRepo::class);
        $this->app->bind(ReviewInterface::class, ReviewRepo::class);
    }


    // Register the event and listeners
    public function boot(): void
    {
        //
    }
}
