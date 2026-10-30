<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TripController; 
use Illuminate\Http\Request;



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/trips', [TripController::class, 'index']);
Route::delete('/trips/{id}', [TripController::class, 'destroy']);
Route::post('/trips', [TripController::class, 'store']);
