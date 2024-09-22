<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Image;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('created_at', 'desc')->get();
        return response()->json($projects);
    }

    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();

        $project = new Project();

        $project->title = strip_tags($data['title']);
        $project->desc = strip_tags($data['desc']);
        $project->slug = Str::slug($data['title'], '-');
        $project->image = $data['image'];
        $project->project_url = strip_tags($data['project_url']);
        $project->code_url = strip_tags($data['code_url']);
        $project->project_icon = strip_tags($data['project_icon']);
        $project->technologies = strip_tags($data['technologies']);
        $project->project_name = strip_tags($data['project_name']);
        $project->short_desc = strip_tags($data['short_desc']);
        $project->content = $data['content'];
        $project->is_published = $data['is_published'] === "true";
        $project->is_featured = $data['is_featured'] === "true";

        $project->save();

        return response()->json($project->slug);
    }

    public function show(string $id)
    {
        $project = Project::findOrFail($id);
        return response()->json($project);
    }

    public function update(UpdateProjectRequest $request, string $id)
    {
        $data = $request->validated();
        $project = Project::where('id', $id)->update(
            [
                'title' => strip_tags($data['title']),
                'desc' => strip_tags($data['desc']),
                'slug' => Str::slug($data['title'], '-'),
                'image' => $data['image'],
                'project_url' => strip_tags($data['project_url']),
                'code_url' => strip_tags($data['code_url']),
                'project_icon' => strip_tags($data['project_icon']),
                'technologies' => strip_tags($data['technologies']),
                'project_name' => strip_tags($data['project_name']),
                'short_desc' => strip_tags($data['short_desc']),
                'content' => $data['content'],
                'is_published' => $data['is_published'] === "true",
                'is_featured' => $data['is_featured'] === "true",
            ]
        );
        return response()->json(Str::slug($data['title'], '-'));

    }

    public function destroy(string $id)
    {
        $project = Project::findOrFail($id);
        $projectImagePath = $project->image;

        $Image = Image::where('path', $projectImagePath)->first();
        $image = basename($Image->path);

        $imagePath = public_path('/public/images/' . $image);
        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }

        $project->delete();
        $Image->delete();
        return response('', 200);
    }
}
