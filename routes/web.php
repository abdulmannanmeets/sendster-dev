<?php

use App\Http\Controllers\AiController;
use App\Http\Controllers\Api\IndexController;
use App\Http\Controllers\Auth\ConfigController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\ListCController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReqController;
use App\Http\Controllers\RouterController;
use App\Http\Controllers\Segment;
use App\Http\Controllers\SequenceController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SmtpController;
use App\Http\Controllers\SnippetController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UpdateController;
use App\Http\Controllers\VerifyEmailController;
use app\Library\File as LibraryFile;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Installation
Route::group(['middleware' => ['not_installed']], function () {
    Route::get('/install', [ConfigController::class, "index"])->name('install');
    Route::post('/install', [ConfigController::class, 'save_admin_database'])->name('config_database');
});

Route::group(['middleware' => ['installed']], function () {
    Route::get('/uploads/{filename}', function ($filename) {
        $path = storage_path() . '/app/public/campaigns/' . $filename;
        if (!File::exists($path)) abort(404);
        $file = File::get($path);
        $type = File::mimeType($path);
        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);
        return $response;
    });
    Route::get('/embedded-form/{id}', 'App\Http\Controllers\EmbedFormController@index');
    Route::get('/login', [LoginController::class, 'index'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->name('post_login');
});

Route::group(['middleware' => ['installed']], function () {
    Route::get('template_data/{path?}', function ($path = null) {
        $basePath = storage_path('app/public/template_data');

        if ($path === null || $path === 'index.html') {
            $filePath = $basePath . '/index.html';

            if (File::exists($filePath)) {
                $fileContents = File::get($filePath);
                return response($fileContents)->header('Content-Type', 'text/html');
            }
        } else {
            $path = ltrim($path, '/');

            $filePath = $basePath . '/' . $path;

            if (File::exists($filePath)) {
                if (is_dir($filePath)) {
                    return $this->listImagesInDirectory($basePath, $path);
                } else {
                    $fileContents = File::get($filePath);
                    $fileMimeType = File::mimeType($filePath);

                    return response($fileContents)->header('Content-Type', $fileMimeType);
                }
            }
        }

        abort(404);
    })->where('path', '.*');
    Route::get("/resubscribe", [ListCController::class, "resubscribe"]);
    Route::get("/getCreditURL", [VerifyEmailController::class, "updateCredit"]);
    Route::get("/unsubscribe", [CampaignController::class, "queryUnsubscribe"]);
    Route::post("/unsubscribe", [CampaignController::class, "unsubscribe"]);
    Route::view('/forgot_password', 'auth.forgot');
    Route::post('/forgot', [ForgotPasswordController::class, 'index']);
    Route::get('/linkvisit', [LinkController::class, 'add_visit']);
});

Route::group(['middleware' => ['auth', 'installed']], function () {
    Route::get('/', function () {
        return redirect('dashboard');
    });
    Route::get('/{page}', [RouterController::class, "index"])->name("router_var");

    Route::post('/req', [ReqController::class, 'index'])->name('post_req');
    Route::post('/logout', [ReqController::class, 'index'])->name('logout');
    Route::post('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::post('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::post('/smtp', [SmtpController::class, 'index'])->name('smtp');
    Route::post('/list', [ListCController::class, 'index'])->name('list');
    Route::post('/lead', [LeadController::class, 'init'])->name('lead');
    Route::post('/snippet', [SnippetController::class, 'index'])->name('snippet');
    Route::post('/campaign', [CampaignController::class, 'index'])->name('campaign');
    Route::post('/verify_email', [VerifyEmailController::class, 'index'])->name('verify_email');
    Route::post('/form', [SubscriptionController::class, 'index'])->name('subscription');
    Route::post('/sequence', [SequenceController::class, 'index'])->name('sequence');
    Route::post('/setting', [SettingController::class, 'index'])->name('setting');
    Route::post('/tiny_upload', [SnippetController::class, 'upload_tiny']);
    Route::post('/links', [LinkController::class, 'index']);
    Route::post('/error', [DashboardController::class, 'error']);
    Route::post('/history', [DashboardController::class, 'history']);
    Route::post('/check_spam', [CampaignController::class, 'checkSpamScore']);
    Route::post('/segment', [Segment::class, 'index']);
    Route::post("/update", [UpdateController::class, "index"]);
    Route::post("/save_html", [CampaignController::class, "save_html"]);
    Route::post("/aiwriter", function (Request $request) {
        $aiController = new AiController();
        return $request['type'] == "body" ? $aiController->body($request) : $aiController->subject($request);
    });
});
