<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\ContactController;
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

Route::get('/contacts/create', function () {
    return Inertia::render('Contacts/Create');
});

Route::get('/contacts', function () {
    return Inertia::render('Contacts/ShowAll');
});

Route::post('/api/contacts', [ContactController::class, 'store']);
Route::get('/api/contacts/all', [ContactController::class, 'index']);

Route::get('/contacts/{contact}/addresses/create', [AddressController::class, 'create'])->name('contacts.addresses.create');
Route::post('/contacts/{contact}/addresses', [AddressController::class, 'store']);
Route::put('/api/contacts/{contact}/addresses/{address}', [AddressController::class, 'update']);

require __DIR__ . '/auth.php';
