<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListError extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'list_id',
        'email',
        'extra_fields',
        'error',
    ];
    public $timestamps = true;
}
