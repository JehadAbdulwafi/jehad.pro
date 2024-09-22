<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'category',
        'name',
        'desc',
        'jobTitle',
        'readTime',
        'is_published',
        'is_featured',
    ];
}