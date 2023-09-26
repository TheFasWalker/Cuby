<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::group(['namespace' =>'Main'],function(){
    Route::get('/','IndexController');
    Route::get('/404','ErrorController');
    Route::get('/about','AboutController');
    Route::get('/servises','ServiseController');
});
Route::group(['namespace'=>'Admin','prefix'=>'admin'],function(){
    Route::group(['namespace'=>'Main'],function(){
        Route::get('/','IndexController');
    });

});

// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
