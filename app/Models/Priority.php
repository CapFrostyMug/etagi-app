<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{
    use HasFactory;

    protected $table = 'priorities';

    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    public function tasks()
    {
        return $this->hasMany(
            Task::class,
            'priority_id',
            'id'
        );
    }
}
