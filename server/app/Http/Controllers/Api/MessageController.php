<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageRequest;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = Message::orderBy('created_at', 'desc')->get();
        return response()->json($messages);
    }

    public function store(StoreMessageRequest $request)
    {
        $data = $request->validated();
        $NewMessage = new Message();

        $file = $request->file('file');

        if ($file && $file->isValid()) {
            $filename = uniqid() . "_" . $file->getClientOriginalName();
            $file->move(public_path('public/messageFiles'), $filename);
            $url = URL::to('/') . '/public/messageFiles/' . $filename;
            $NewMessage->file = $url;
        }

        $NewMessage->name = strip_tags($data['name']);
        $NewMessage->company = strip_tags($data['company']);
        $NewMessage->email = strip_tags($data['email']);
        $NewMessage->message = strip_tags($data['message']);

        $NewMessage->save();

        return response()->json([
            'message' => $NewMessage
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $message = Message::findOrFail($id);
        return response()->json($message);
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        $message = Message::findOrFail($id);
        $file = basename($message->file);

        $filePath = public_path('/public/messageFiles/' . $file);
        if (File::exists($filePath)) {
            File::delete($filePath);
        }

        $message->delete();
        return response('', 200);
    }
}