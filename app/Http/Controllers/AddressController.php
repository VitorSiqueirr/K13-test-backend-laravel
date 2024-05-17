<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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
    $response = Http::get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    $data = $response->json();

    $states = [];
    foreach ($data as $state) {
      $states[] = $state['sigla'];
    }

    return $states;
  }
}
