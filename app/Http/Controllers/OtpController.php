<?php

namespace App\Http\Controllers;

use App\Classes\ApiResClass as Res;
use App\Mail\OtpMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class OtpController extends Controller
{
    private function generateOtp(): int
    {
        $otp = rand(100000, 999999);
        Log::info("Generated OTP: {$otp}");
        return $otp;
    }

    private function storeOtp(string $email, int $otp): void
    {
        $key = $this->getOtpKey($email);
        Cache::put($key, $otp, now()->addMinutes(10));
        Log::info("Stored OTP for {$email} in cache with key {$key}");
    }

    private function getOtp(string $email): ?int
    {
        $key = $this->getOtpKey($email);
        $otp = Cache::get($key);
        Log::info("Retrieved OTP from cache for {$email}: " . ($otp ?? 'NULL'));
        return $otp;
    }

    private function forgetOtp(string $email): void
    {
        $key = $this->getOtpKey($email);
        Cache::forget($key);
        Log::info("Forgot OTP from cache for {$email}, key: {$key}");
    }

    private function getOtpKey(string $email): string
    {
        return 'otp_' . $email;
    }

    private function sendOtpToEmail(string $email): void
    {
        $otp = $this->generateOtp();
        $this->storeOtp($email, $otp);
        Mail::to($email)->send(new OtpMail($otp));
        Log::info("Sent OTP email to {$email}.");
    }

    public function showForm()
    {
        return view('auth.verify-otp');
    }

    public function sendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            Log::warning("OTP send failed. Validation error for email: {$request->email}");
            return Res::sendError($validator->errors(), 422);
        }

        try {
            $this->sendOtpToEmail($request->email);
            return Res::sendResponse(null, 'OTP sent to your email.');
        } catch (\Exception $e) {
            Log::error("Send OTP failed for {$request->email}: " . $e->getMessage());
            return Res::rollback($e, 'Failed to send OTP.');
        }
    }

    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp'   => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            Log::warning("OTP verify failed. Validation error for email: {$request->email}");
            return Res::sendError($validator->errors(), 422);
        }

        try {
            $storedOtp = $this->getOtp($request->email);

            if ($storedOtp && $request->otp == $storedOtp) {
                $this->forgetOtp($request->email);
                Log::info("OTP verified successfully for {$request->email}");
                return Res::sendResponse(null, 'Email verified successfully.');
            } else {
                Log::warning("Invalid or expired OTP for {$request->email}. Entered: {$request->otp}, Expected: {$storedOtp}");
                return Res::sendError('Invalid or expired OTP.', 400);
            }
        } catch (\Exception $e) {
            Log::error("Verify OTP failed for {$request->email}: " . $e->getMessage());
            return Res::rollback($e, 'Failed to verify OTP.');
        }
    }

    public function resendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            Log::warning("Resend OTP failed. Validation error for email: {$request->email}");
            return Res::sendError($validator->errors(), 422);
        }

        try {
            $this->sendOtpToEmail($request->email);
            return Res::sendResponse(null, 'OTP resent successfully.');
        } catch (\Exception $e) {
            Log::error("Resend OTP failed for {$request->email}: " . $e->getMessage());
            return Res::rollback($e, 'Failed to resend OTP.');
        }
    }
}
