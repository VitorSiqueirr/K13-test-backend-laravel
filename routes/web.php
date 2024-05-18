<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PhoneController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::location('/contacts');
});

// Rota para a visualização dos contatos
Route::get('/contacts', function () {
    return Inertia::render('Contacts/ShowAll');
});

// Rota para a criação de contatos
Route::get('/contacts/create', function () {
    return Inertia::render('Contacts/Create');
});

// Rota padrão para vincular endereço
Route::get('/contacts/addresses/create', [AddressController::class, 'create'])->name('contacts.addresses.create');

// Rota padrão para vincular telefone
Route::get('/contacts/addresses/phones', [PhoneController::class, 'create'])->name('contacts.phone.create');

// Rotas para API
Route::post('/api/contacts', [ContactController::class, 'store']);
Route::post('/api/contacts/addresses', [AddressController::class, 'store']);
Route::post('/api/contacts/phones', [PhoneController::class, 'store']);
Route::get('/api/contacts/all', [ContactController::class, 'index']);
Route::get('/api/contacts/{contactId}/addresses', [AddressController::class, 'findById']);
Route::get('/api/contacts/{contactId}/phones', [PhoneController::class, 'findById']);

require __DIR__ . '/auth.php';
