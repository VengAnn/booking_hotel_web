<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="50x50" href="{{ asset('assets/images/PSV_LOGO_Final_outline_ai.avif') }}">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Phongsavath Boutique Hotel')</title>

    <!-- Include CSS -->
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">

    <!-- Flatpickr CSS for change date picker lang -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

    <!--images carousel -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"></script>

    <link rel="stylesheet" href="{{ asset('assets/lib/bootstrap.min.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link rel="stylesheet" href="{{ asset('assets/lib/datatables.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/lib/jquery-confirm.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/lib/toastr.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/lib/sweetalert2.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/commons/footer_below_posi.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/commons/font_style.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/commons/nav_bar.css') }}">

    @stack('styles')

    <script src="{{ asset('assets/lib/jquery.min.js') }}"></script>


</head>

<body>

    <!-- ✅ Loading Overlay -->
    <div id="loadingOverlay"
        style="display:none; position:fixed; z-index:9999; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.8);">
        <div class="d-flex justify-content-center align-items-center h-100">
            <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>


    @include('clients.layouts.nav_bar')

    <main>
        @yield('content')
    </main>

    @include('clients.layouts.footer')

    <!-- Flatpickr JS -->
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/vn.js"></script>

    <!-- Include Toast -->
    <script src="{{ asset('assets/toasts/toast.js') }}"></script>
    <script src="{{ asset('assets/lib/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/lib/datatables.min.js') }}"></script>
    <script src="{{ asset('assets/lib/jquery-confirm.min.js') }}"></script>
    <script src="{{ asset('assets/lib/toastr.min.js') }}"></script>
    <script src="{{ asset('assets/lib/sweetalert2.min.js') }}"></script>
    <script src="{{ asset('assets/js/utils/ajaxRequest.js') }}"></script>
    <script src="{{ asset('assets/js/utils/dailog_confirm.js') }}"></script>
    <script src="{{ asset('assets/js/utils/show_hide_loading.js') }}"></script>

    <script src="{{ asset('assets/js/commons/nav_bar/nav_bar_navigation_control.js') }}"></script>
    <script src="{{ asset('assets/js/commons/nav_bar/nav_bar.js') }}"></script>

    @stack('scripts')
</body>

</html>
