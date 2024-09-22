<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Image;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class PostController extends Controller
{

    public function index()
    {
        $posts = Post::orderBy('created_at', 'desc')->get();
        return response()->json($posts);
    }

    public function store(StorePostRequest $request)
    {
        $data = $request->validated();

        $post = new Post();

        $post->name = strip_tags($data['name']);
        $post->jobTitle = strip_tags($data['jobTitle']);
        $post->title = strip_tags($data['title']);
        $post->desc = strip_tags($data['desc']);
        $post->category = strip_tags($data['category']);
        $post->readTime = strip_tags($data['readTime']);
        $post->content = $data['content'];
        $post->slug = Str::slug($data['title'], '-');
        $post->image = $data['image'];
        $post->is_published = $data['is_published'] === "true";
        $post->is_featured = $data['is_featured'] === "true";

        $post->save();

        return response()->json([
            'message' => 'تم أضافة',
            'post' => $post
        ]);
    }

    public function show(Post $id)
    {
        // $post = Post::findOrFail($id);
        return response()->json($id);
    }

    public function update(UpdatePostRequest $request, string $id)
    {
        $data = $request->validated();
        $post = Post::find($id);
    
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
    
        $post->name = strip_tags($data['name']);
        $post->jobTitle = strip_tags($data['jobTitle']);
        $post->title = strip_tags($data['title']);
        $post->desc = strip_tags($data['desc']);
        $post->category = strip_tags($data['category']);
        $post->readTime = strip_tags($data['readTime']);
        $post->content = $data['content'];
        $post->slug = Str::slug($data['title'], '-');
        $post->image = $data['image'];
        $post->is_published = $data['is_published'] === "true";
        $post->is_featured = $data['is_featured'] === "true";
    
        $post->save();
    
        return response()->json(['message' => 'Post updated', 'post' => $post]);

    }

    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);
        $postImagePath = $post->image;

        $Image = Image::where('path', $postImagePath)->first();
        $image = basename($Image->path);

        $imagePath = public_path('/public/images/' . $image);
        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }

        $post->delete();
        $Image->delete();
        return response('', 200);
    }
}