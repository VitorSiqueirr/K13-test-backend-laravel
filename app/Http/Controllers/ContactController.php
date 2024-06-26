<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use App\Rules\ValidCPF;

class ContactController extends Controller
{

    public function store(Request $request)
    {
        $validator = validator()->make($request->all(), [
            'name' => 'required|max:255',
            'cpf' => ['required', 'unique:contacts', new ValidCPF],
            'email' => 'required|unique:contacts|email',
            'birthday' => 'required|date',
        ]);

        if ($validator->fails()) {
            throw new \Exception('Validation Error: ' . $validator->errors()->first());
        }

        $validatedData = $validator->validated();
        $contact = Contact::create($validatedData);

        return response()->json(["message" => "Contact created successfully!"], 201);
    }

    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }
}
