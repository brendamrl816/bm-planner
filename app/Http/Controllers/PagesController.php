<?php namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Redirect;
use App\User;

class PagesController extends Controller {

    public function home()
    {
       $user_id = Auth::id();
       $user = User::where('id', '=', $user_id)->first();
        
       return view('home', compact('user'));
    }
    
    public function deny()
    {
        return view('adminViews.notAuthorized');
    }
}