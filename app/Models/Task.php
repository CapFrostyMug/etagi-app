<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'tasks';

    public $timestamps = false;

    protected $fillable = [
        'title',
        'description',
        'priority_id',
        'status_id',
        'executor',
        'creator',
        'date_end',
    ];

    public function priority()
    {
        return $this->belongsTo(
            Priority::class,
            'priority_id',
            'id'
        );
    }

    public function status()
    {
        return $this->belongsTo(
            Status::class,
            'status_id',
            'id'
        );
    }

    public function executor()
    {
        return $this->belongsTo(
            User::class,
            'executor',
            'id'
        );
    }

    public function creator()
    {
        return $this->belongsTo(
            User::class,
            'creator',
            'id'
        );
    }
}
