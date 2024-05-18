<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use App\Rules\ValidCPF;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'cpf' => ['required', 'unique:contacts', new ValidCPF],
            'email' => 'required|unique:contacts|email',
            'birthday' => 'required|date',
        ]);

        $contact = Contact::create($validatedData);

        return response()->json(["message" => "Contato criado com sucesso!"], 201);
    }

    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }
}
