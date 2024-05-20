<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddressController extends Controller
{
    public function create()
    {
        $contacts = Contact::all();
        $states = $this->getAllStates();
        return Inertia::render('Contacts/CreateAddress', [
            'contacts' => $contacts,
            'states' => $states,
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
            'state' => ['required', 'in:' . implode(',', $this->getAllStates())],
        ]);

        $contact = Contact::findOrFail($validatedData['contact_id']);

        $contact->address()->updateOrCreate(
            ['contact_id' => $validatedData['contact_id']],
            $validatedData
        );

        return response()->json(['message' => 'Endereço salvo com sucesso'], 201);
    }

    public function findById($contactId)
    {
        $contact = Contact::findOrFail($contactId);
        $address = $contact->address;
        return response()->json($address);
    }

    private function getAllStates()
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        curl_close($ch);

        $data = json_decode($response, true);

        $states = [];
        foreach ($data as $state) {
            $states[] = $state['sigla'];
        }

        return $states;
    }
}
