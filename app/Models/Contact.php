<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'cpf',
        'email',
        'birthday',
    ];

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function phone()
    {
        return $this->hasMany(Phone::class);
    }
}
