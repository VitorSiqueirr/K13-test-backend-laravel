<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PhoneController extends Controller
{
    public function create()
    {
        $contacts = Contact::all();
        return Inertia::render('Contacts/CreatePhones', [
            'contacts' => $contacts,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'contact_id' => 'required|exists:contacts,id',
            'commercial_phone' => 'nullable|unique:phones',
            'residencial_phone' => 'nullable|unique:phones',
            'mobile_phone' => 'required|unique:phones',
        ]);

        $contact = Contact::findOrFail($validatedData['contact_id']);

        $contact->phone()->create($validatedData);

        return response()->json(["message" => "Telefone vinculado com sucesso!"], 201);
    }

    public function findById($contactId)
    {
        $contact = Contact::findOrFail($contactId);
        $phone = $contact->phone;

        return response()->json($phone);
    }
}
