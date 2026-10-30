<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    protected $fillable = [
    'user_id', // <-- Add this line
    'title',
    'country',
    'duration',
    'budget',
    'group',
    'vibes',
    'activities',
    'rating',
    'period',
    'transport',
    'image'
];
}