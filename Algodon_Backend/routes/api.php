<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EjercicioController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(EjercicioController::class)->group( function(){
    Route::get('/Ejercicios', 'index');
    Route::post('/Ejercicio', 'store');
    Route::get('/Ejercicios/{id}', 'show');
    Route::put('/Ejercicios/{id}', 'update');
    Route::delete('/Ejercicios/{id}', 'delete');
});
