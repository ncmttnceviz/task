<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PointRequest extends Model
{
    use HasFactory;


    protected $fillable = [
        'member_id',
        'user_id',
        'desired_point',
        'added_point',
        'state'
    ];

    /**
     * @return HasOne
     */
    public function member() : HasOne
    {
        return $this->hasOne(Member::class);
    }

    public function user() : HasOne
    {
        return $this->hasOne(User::class);
    }
}
