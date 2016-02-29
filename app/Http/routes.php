<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'PagesController@home');
Route::get('denied', 'PagesController@deny');


Route::get('settings', 'SettingsController@edit');
Route::post('settings','SettingsController@update_user');


Route::get('contactUs', 'EmailsController@contact_us');
Route::get('forgotPassword', 'EmailsController@forgot_pass');
Route::post('send', 'EmailsController@send');
Route::post('sendTemp', 'EmailsController@tempPass');



//register routes
Route::get('users/register', 'Auth\AuthController@getRegister'); //displays the registration form
Route::post('users/register', 'Auth\AuthController@postRegister'); //process the registration form



//login routes
Route::get('users/login', 'Auth\AuthController@getLogin'); //displays the login form
Route::post('users/login', 'Auth\AuthController@postLogin'); //process the form
Route::get('users/logout', 'Auth\AuthController@getLogout');



//Administration routes
Route::group(array('prefix'=>'admin', 'namespace'=>'Admin', 'middleware'=>'manager'), function() {
        Route::get('/', 'PagesController@home');
        Route::get('users', [ 'as' => 'admin.user.index', 'uses' => 'UsersController@index']);
        Route::get('roles', 'RolesController@index');
        Route::get('roles/create', 'RolesController@create');
        Route::post('roles/create', 'RolesController@store');
        Route::get('users/{id?}/edit', 'UsersController@edit');
        Route::post('users/{id?}/edit','UsersController@update');
});


Route::delete('deleteEvents/{deleteEvents}', 'EventsController@deleteEvents');
Route::put('repetitionsChangeEnd', 'RepetitionsController@changeEnd');
Route::get('mainCalendar', 'CalendarController@getMain');

Route::resource('styles', 'SettingsController', 
    ['only'=>['index', 'update']]);
Route::resource('lists', 'TodolistsController', 
    ['only'=>['index', 'store', 'update', 'destroy']]);
Route::resource('lists.tasks', 'TasksController',
    ['only'=>['index', 'store', 'update', 'destroy']]);
Route::resource('events', 'EventsController',
    ['only'=>['index', 'store', 'update', 'destroy']]);
Route::resource('repetitions', 'RepetitionsController',
    ['only'=>['store', 'update', 'destroy']]);
Route::resource('eventchanges', 'EventchangesController',
    ['only'=>['store', 'destroy']]);
Route::resource('calendars', 'CalendarController', 
    ['only'=>['index', 'store', 'update', 'destroy']]);
