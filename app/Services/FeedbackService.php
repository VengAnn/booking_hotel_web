<?php

namespace App\Services;

use App\Interface\FeedbackInterface;
use App\Classes\ApiResClass as Res;
use Illuminate\Support\Facades\DB;

class FeedbackService
{
    protected $repo;

    public function __construct(FeedbackInterface $repo)
    {
        $this->repo = $repo;
    }

    public function getAll()
    {
        try {
            return Res::sendResponse($this->repo->getAll(), 'Danh sách phản hồi');
        } catch (\Exception $e) {
            Res::throw($e, 'Lỗi khi lấy danh sách phản hồi');
        }
    }

    public function store(array $data)
    {
        DB::beginTransaction();
        try {
            $result = $this->repo->store($data);
            DB::commit();
            return $result;
        } catch (\Exception $e) {
            Res::rollback($e, 'Lỗi khi lưu phản hồi');
        }
    }

    public function markAsRead(int $id)
    {
        DB::beginTransaction();
        try {
            $result = $this->repo->markAsRead($id);
            DB::commit();
            return $result;
        } catch (\Exception $e) {
            Res::rollback($e, 'Lỗi khi đánh dấu là đã đọc');
        }
    }

    public function delete(int $id)
    {
        DB::beginTransaction();
        try {
            $this->repo->delete($id);
            DB::commit();
            return true;
        } catch (\Exception $e) {
            Res::rollback($e, 'Lỗi khi xóa phản hồi');
        }
    }
}
