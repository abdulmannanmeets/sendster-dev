<?php

use App\Http\Controllers\Api\IndexController;
use App\Http\Controllers\Auth\ConfigController;
use App\Http\Controllers\Mail\ComposeMail;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['installed']], function () {
    Route::post('/list', [IndexController::class, 'index']);
    Route::post('/compose', [ComposeMail::class, 'composeMail']);
    Route::post("/index_email_settings", [IndexController::class, 'emailSettings']);
    Route::post('/subscription_form', [IndexController::class, 'add_form_lead'])->name('add_form_lead');
    Route::post('/live_sending', [IndexController::class, 'live_sending_status'])->name('live_sending_api');
    Route::get('/img.php', function () {
        return require(base_path('public/img.php'));
    });
    Route::post('/subscription_form', [IndexController::class, 'add_form_lead'])->withoutMiddleware(['csrf'])->name('add_form_lead');
    Route::get('/subscription_form', function () {
        return view('emails.subscribed', ['added' => 5, 'reason' => '']);
    })->withoutMiddleware(['csrf']);
});

Route::post('/install', [ConfigController::class, 'save_admin_database'])->name('config_database');