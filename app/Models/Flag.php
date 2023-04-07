<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flag extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'color_code'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
