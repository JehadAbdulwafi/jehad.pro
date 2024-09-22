<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'desc',
        'slug',
        'image',
        'projectUrl',
        'codeUrl',
        'technologies',
        'ProjectName',
        'shortDesc',
        'projectIcon',
        'content',
        'is_published',
        'is_featured',
    ];
}
