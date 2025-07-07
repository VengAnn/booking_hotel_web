<?php

namespace App\Http\Controllers;

use App\Classes\ApiResClass as Res;
use App\Mail\OtpMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class OtpController
{
    private function generateOtp()
    {
        return rand(100000, 999999);
    }

    private function storeOtp($email, $otp)
    {
        Cache::put('otp_' . $email, $otp, now()->addMinutes(10));
    }

    private function getOtp($email)
    {
        return Cache::get('otp_' . $email);
    }

    public function showForm()
    {
        return view('auth.verify-otp');
    }

    public function sendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return Res::sendError($validator->errors(), 422);
        }

        try {
            $otp = $this->generateOtp();
            $this->storeOtp($request->email, $otp);

            Mail::to($request->email)->send(new OtpMail($otp));
            return Res::sendResponse(null, 'OTP sent to your email');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Failed to send OTP');
        }
    }

    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp'   => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            return Res::sendError($validator->errors(), 422);
        }

        try {
            $storedOtp = $this->getOtp($request->email);

            if ($storedOtp && $request->otp == $storedOtp) {
                Cache::forget('otp_' . $request->email);
                return Res::sendResponse(null, 'Email verified successfully');
            }

            return Res::sendError('Invalid or expired OTP', 400);
        } catch (\Exception $e) {
            return Res::rollback($e, 'Failed to verify OTP');
        }
    }

    public function resendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return Res::sendError($validator->errors(), 422);
        }

        try {
            $otp = $this->generateOtp();
            $this->storeOtp($request->email, $otp);

            Mail::to($request->email)->send(new OtpMail($otp));
            return Res::sendResponse(null, 'OTP resent successfully');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Failed to resend OTP');
        }
    }
}
