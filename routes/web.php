<?php

use App\Http\Controllers\StaffTicketController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function (\Illuminate\Http\Request $request) {
    $user = $request->user();

    return Inertia::render('Dashboard', [
        'stats' => [
            'total' => $user->tickets()->count(),
            'open' => $user->tickets()->where('status', 'Open')->count(),
            'inProgress' => $user->tickets()
                ->where('status', 'In Progress')
                ->count(),
            'closed' => $user->tickets()->where('status', 'Closed')->count(),
        ],
        'recentTickets' => $user->tickets()
            ->latest()
            ->take(5)
            ->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

    // HelpDesk ticket routes
    Route::resource('tickets', TicketController::class);


    Route::get('/staff/dashboard', [
        StaffTicketController::class,
        'index',
    ])->name('staff.dashboard');

    Route::patch('/staff/tickets/{ticket}', [
        StaffTicketController::class,
        'update',
    ])->name('staff.tickets.update');

});

require __DIR__ . '/auth.php';
