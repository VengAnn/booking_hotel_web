<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Your OTP Code</title>
    <style>
        body {
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }

        .card {
            max-width: 480px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            padding: 30px;
        }

        .header {
            text-align: center;
            background-color: #007bff;
            color: white;
            padding: 16px;
            border-radius: 8px 8px 0 0;
        }

        .otp-box {
            background-color: #e9f5ff;
            padding: 15px;
            margin: 20px 0;
            font-size: 24px;
            font-weight: bold;
            border-radius: 5px;
            display: inline-block;
        }

        .footer {
            text-align: center;
            font-size: 13px;
            color: #888;
            margin-top: 25px;
        }

        .logo {
            width: 60px;
            margin-bottom: 10px;
        }
    </style>
</head>

<body>

    <div class="card">
        <div class="header">
            <img src="{{ asset('assets/images/PSV_LOGO_Final_outline_ai.avif') }}" alt="Logo" class="logo">
            <h2>Your OTP Code</h2>
        </div>

        <div style="text-align: center;">
            <p style="margin-top: 20px;">Use the OTP code below to complete your email verification:</p>
            <div class="otp-box">{{ $otp }}</div>
        </div>

        <div class="footer">
            <p>Thank you for using our service.</p>
        </div>
    </div>

</body>

</html>
