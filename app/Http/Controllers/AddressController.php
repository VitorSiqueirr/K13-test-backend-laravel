<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddressController extends Controller
{
    public function create(Contact $contact)
    {
        $contacts = Contact::all();
        $states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
        return Inertia::render('Contacts/CreateAddress', [
            'contacts' => $contacts,
            'states' => $states,
            'selectedContact' => $contact,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'contact_id' => 'required|exists:contacts,id',
            'cep' => 'required',
            'street' => 'required',
            'number' => 'required',
            'neighborhood' => 'required',
            'city' => 'required',
            'state' => 'required|in:AC,AL,AP,AM,BA,CE,DF,ES,GO,MA,MT,MS,MG,PA,PB,PR,PE,PI,RJ,RN,RS,RO,RR,SC,SP,SE,TO',
        ]);

        $address = Address::create($validatedData);
        return response()->json($address, 201);
    }

    public function show(Address $address)
    {
        return response()->json($address);
    }

    public function update(Request $request, Address $address)
    {
    }
}
