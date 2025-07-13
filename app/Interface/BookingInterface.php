<?php

namespace App\Interface;

interface BookingInterface
{
    public function getAll();
    public function getBookingsByUserId($userId);
    public function findById($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);

    public function areRoomsAvailable(array $roomIds, string $checkInDate, string $checkOutDate): array;
    public function cancelBooking(int $id): bool;
    public function updateBookingStatus($id, $status): bool;
}
