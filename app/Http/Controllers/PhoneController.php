<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Phone;
use Illuminate\Http\Request;
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
        $validator = validator()->make($request->all(), [
            'contact_id' => 'required|exists:contacts,id',
            'commercial_phone' => 'nullable|unique:phones,commercial_phone',
            'residencial_phone' => 'nullable|unique:phones,residencial_phone',
            'mobile_phone' => 'required|unique:phones,mobile_phone',
        ]);

        if ($validator->fails()) {
            throw new \Exception('Validation Error: ' . $validator->errors()->first());
        }

        $validatedData = $validator->validated();
        $contact = Contact::findOrFail($validatedData['contact_id']);

        $contact->phone()->create($validatedData);

        return response()->json(["message" => "Phone created/linked successfully!"], 201);
    }

    public function update(Request $request, $phoneId)
    {
        $validator = validator()->make($request->all(), [
            'contact_id' => 'required|exists:contacts,id',
            'commercial_phone' => 'nullable|unique:phones,commercial_phone,' . $phoneId,
            'residencial_phone' => 'nullable|unique:phones,residencial_phone,' . $phoneId,
            'mobile_phone' => 'required|unique:phones,mobile_phone,' . $phoneId,
        ]);

        if ($validator->fails()) {
            throw new \Exception('Validation Error: ' . $validator->errors()->first());
        }

        $validatedData = $validator->validated();
        $phone = Phone::findOrFail($phoneId);

        if ($phone->contact_id !== (int)$validatedData['contact_id']) {
            return response()->json(["message" => "Error: The phone contact does not correspond to the informed contact."], 400);
        }

        $phone->update($validatedData);

        return response()->json(["message" => "Phone updated successfully!"], 200);
    }

    public function findById($contactId)
    {
        $contact = Contact::findOrFail($contactId);
        $phone = $contact->phone;

        return response()->json($phone);
    }
}
