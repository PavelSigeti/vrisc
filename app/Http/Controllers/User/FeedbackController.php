<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\FeedbackStoreRequest;
use App\Mail\FeedbackMail;
use App\Models\Feedback;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class FeedbackController extends Controller
{
    public function store(FeedbackStoreRequest $request)
    {
        $user = Auth::user();

        $feedback = Feedback::query()->create([
           'user_id' => $user->id,
           'title' => $request->title,
           'text' => $request->text,
        ]);

        Mail::to('xoqpox_Xoqpox@rambler.ru')->send(new FeedbackMail($feedback));

        return ['Запрос отправлен!'];
    }
}
