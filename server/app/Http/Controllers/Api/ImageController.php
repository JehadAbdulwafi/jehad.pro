<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImageRequest;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = Image::orderBy('created_at', 'desc')->get();
        ;
        return response()->json($images);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ImageRequest $request)
    {
        $validated = $request->validated();

        if (!$request->hasFile('image')) {
            return response()->json(['upload_file_not_found'], 400);
        }
        if (!$request->file('image')->isValid()) {
            return response()->json(['invalid_file_upload'], 400);
        }

        $file = $request->file('image');
        $filename = uniqid() . "_" . $file->getClientOriginalName();
        $file->move(public_path('public/images'), $filename);
        $path = URL::to('/') . '/public/images/' . $filename;

        $image = Image::create([
            'path' => $path,
        ]);
        return response()->json($image);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $Image = Image::findOrFail($id);
        $image = basename($Image->path);

        $imagePath = public_path('/public/images/' . $image);
        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }

        $Image->delete();
        return response('', 200);
    }
}