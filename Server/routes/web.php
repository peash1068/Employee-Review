<?php

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

Route::get('/', function () {
    return view('welcome');
});


Route::get('/login', 'LoginController@login')->middleware('cors')->name('LoginC.login');
Route::post('/getEmpList', 'LoginController@getEmpList')->middleware('cors')->name('LoginC.getEmpList');
Route::post('/deleteEmp', 'LoginController@deleteEmp')->middleware('cors')->name('LoginC.deleteEmp');
Route::post('/addDelemp', 'LoginController@addDelemp')->middleware('cors')->name('LoginC.addDelemp');
Route::post('/getEmpReview', 'LoginController@getEmpReview')->middleware('cors')->name('LoginC.getEmpReview');
Route::post('/deleteReview', 'LoginController@deleteReview')->middleware('cors')->name('LoginC.deleteReview');
Route::post('/review', 'LoginController@review')->middleware('cors')->name('LoginC.review');
Route::post('/saveAssignment', 'LoginController@saveAssignment')->middleware('cors')->name('LoginC.saveAssignment');
Route::post('/getClientEmpList', 'LoginController@getClientEmpList')->middleware('cors')->name('LoginC.getClientEmpList');
Route::post('/getEmpReviewClient', 'LoginController@getEmpReviewClient')->middleware('cors')->name('LoginC.getEmpReviewClient');
Route::post('/getAssignment', 'LoginController@getAssignment')->middleware('cors')->name('LoginC.getAssignment');
Route::post('/deleteAssignment', 'LoginController@deleteAssignment')->middleware('cors')->name('LoginC.getAssignment');














