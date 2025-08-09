<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="50x50" href="{{ asset('assets/images/PSV_LOGO_Final_outline_ai.avif') }}">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Phongsavath Boutique Hotel')</title>

    <!-- Include CSS -->
    <link rel="stylesheet" href="{{ asset('assets/lib/bootstrap.min.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link rel="stylesheet" href="{{ asset('assets/lib/datatables.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/lib/jquery-confirm.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/lib/toastr.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/lib/sweetalert2.min.css') }}">

    @stack('styles')

    <script src="{{ asset('assets/lib/jquery.min.js') }}"></script>

</head>

<body>

    <main>
        @yield('content')
    </main>

    <!-- Include Toast -->
    <script src="{{ asset('assets/toasts/toast.js') }}"></script>
    <script src="{{ asset('assets/lib/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/lib/datatables.min.js') }}"></script>
    <script src="{{ asset('assets/lib/jquery-confirm.min.js') }}"></script>
    <script src="{{ asset('assets/lib/toastr.min.js') }}"></script>
    <script src="{{ asset('assets/lib/sweetalert2.min.js') }}"></script>
    <script src="{{ asset('assets/js/utils/ajaxRequest.js') }}"></script>

    <script src="{{ asset('assets/js/commons/auth/verify_otp_page.js') }}"></script>
    @stack('scripts')
</body>

</html>
