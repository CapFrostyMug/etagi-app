<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * [Method description].
     *
     * @param SignupRequest $signupRequest
     * @param User $user
     * @return
     */
    public function signup(SignupRequest $signupRequest, User $user)
    {
        $data = $signupRequest->validated();

        $user = $user->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    /**
     * [Method description].
     *
     * @param LoginRequest $loginRequest
     * @return
     */
    public function login(LoginRequest $loginRequest)
    {
        $loginData = $loginRequest->validated();

        if (!Auth::attempt($loginData)) {
            return response([
                'message' => 'Provided email or password is incorrect',
            ], 422);
        }

        /**
         * @var User $user
         */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    /**
     * [Method description].
     *
     * @param \Illuminate\Http\Request $request
     * @return
     */
    public function logout(Request $request)
    {
        /**
         * @var User $user
         */
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
