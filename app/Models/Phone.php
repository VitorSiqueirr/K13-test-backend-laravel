<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    use HasFactory;

    protected $fillable = [
        'contact_id',
        'commercial_phone',
        'residencial_phone',
        'mobile_phone',
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
