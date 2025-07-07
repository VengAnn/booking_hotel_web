<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // ============= define new middleware ============= //
        $middleware->alias([
            'roleCheck' => \App\Http\Middleware\CheckUserRole::class,
            'protectRoute' => \App\Http\Middleware\ProtectRouteMiddelware::class,
            'navigation' => \App\Http\Middleware\MiddleWareNavigation::class

        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // ========= define new exceptions for route not found 404 ======= //
        $exceptions->renderable(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, $request) {
            return response()->view('errors._404_page', [], 404);
        });

        // ========= define new exceptions for server error 500 ======= //
        $exceptions->renderable(function (Throwable $e, $request) {
            if ($e instanceof \Symfony\Component\HttpKernel\Exception\HttpExceptionInterface && $e->getStatusCode() === 500) {
                return response()->view('errors._500_page', [], 500);
            }
        });
    })->create();
