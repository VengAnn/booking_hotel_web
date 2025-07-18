<?php

namespace App\Classes;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

class ApiResClass
{
    public static function rollback($e, $message = "Something went wrong! Process not completed")
    {
        DB::rollBack();
        self::throw($e, $message . " - " . $e->getMessage());
    }

    public static function sendError($message = "Something went wrong", $code = 400)
    {
        return response()->json([
            'success' => false,
            'message' => $message
        ], $code);
    }

    public static function throw($e, $message = "Something went wrong! Process not completed")
    {
        // Log::info($e);
        throw new HttpResponseException(response()->json(["message" => $message], 500));
    }

    public static function sendResponse($result, $message, $code = 200)
    {
        $response = [
            'success' => true,
            'data'    => $result
        ];
        if (!empty($message)) {
            $response['message'] = $message;
        }
        return response()->json($response, $code);
    }
}
