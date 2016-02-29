<?php namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Redirect;

class PagesController extends Controller {

    public function home()
    {
        return view ('home');
    }
    
    public function deny()
    {
        return view('adminViews.notAuthorized');
    }
}