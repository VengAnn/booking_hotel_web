<?php

namespace App\Services;

use App\Interface\PayInterface;
use App\Classes\ApiResClass;
use Illuminate\Support\Facades\DB;

class PayService
{
    protected $payRepo;

    public function __construct(PayInterface $payRepo)
    {
        $this->payRepo = $payRepo;
    }

    public function getAll()
    {
        try {
            $payments = $this->payRepo->getAll();
            return ApiResClass::sendResponse($payments, "Danh sách thanh toán");
        } catch (\Exception $e) {
            return ApiResClass::sendError($e->getMessage());
        }
    }

    public function getById($id)
    {
        try {
            $payment = $this->payRepo->getById($id);
            return ApiResClass::sendResponse($payment, "Chi tiết thanh toán");
        } catch (\Exception $e) {
            return ApiResClass::sendError($e->getMessage(), 404);
        }
    }

    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $payment = $this->payRepo->create($data);
            DB::commit();
            return ApiResClass::sendResponse($payment, "Tạo thanh toán thành công", 201);
        } catch (\Exception $e) {
            return ApiResClass::rollback($e, "Tạo thanh toán thất bại");
        }
    }

    public function update($bookingId, array $data)
    {
        DB::beginTransaction();
        try {
            $payment = $this->payRepo->update($bookingId, $data);
            DB::commit();
            return ApiResClass::sendResponse($payment, "Cập nhật thanh toán thành công");
        } catch (\Exception $e) {
            return ApiResClass::rollback($e, "Cập nhật thanh toán thất bại");
        }
    }

    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $this->payRepo->delete($id);
            DB::commit();
            return ApiResClass::sendResponse(null, "Xóa thanh toán thành công");
        } catch (\Exception $e) {
            return ApiResClass::rollback($e, "Xóa thanh toán thất bại");
        }
    }
}
