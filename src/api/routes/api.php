<?php

use App\Http\Controllers\DataController;
use App\Http\Controllers\RegistrationController;
use App\Http\Middleware\CheckApiKeys;
use App\Http\Middleware\IsPasswordHashSetAndValid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\DuocMailController;
use App\Http\Controllers\LoginController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', [LoginController::class, 'userLogin'])->middleware(['throttle:6,1']);
Route::get('/logout', [LoginController::class, 'userLogout'])->middleware('auth:sanctum');
Route::get('/check', [LoginController::class, 'checkSession'])->middleware('auth:sanctum');
Route::get('/empty', [LoginController::class, 'noSession'])->name("login");


Route::middleware(CheckApiKeys::class)->controller(RegistrationController::class)->group(function () {
    Route::get('/check/email/', 'checkValidMail');
    Route::post('/check/question', 'checkQuestion');
    Route::post('/register','register');
    Route::post('/update/vehicle', 'updateVehicleInfo')->middleware('auth:sanctum');
    Route::post('/update/user/info', 'updateUserInfo')->middleware('auth:sanctum');
    Route::get('/obtener/preguntas', 'returnQuestions');
    Route::post('/update/password', 'updatePassword')->middleware(IsPasswordHashSetAndValid::class);
});

Route::middleware(['auth:sanctum',CheckApiKeys::class])->get('/obtener/datos/usuario', [DataController::class, 'returnAllUserData']);
// Route::middleware(['auth:sanctum',CheckApiKeys::class])->controller(DataController::class)->group(function(){
//     Route::get('/obtener/datos/usuario', 'returnAll')->middleware('auth:sanctum');
// });


