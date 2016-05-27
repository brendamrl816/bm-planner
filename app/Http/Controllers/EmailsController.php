<?php

namespace App\Http\Controllers;

use App\Email;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Requests\EmailFormRequest;
use App\Http\Requests\ForgotPassRequest;
use Illuminate\Support\Facades\Hash;
use DB;


class EmailsController extends Controller
{
    
    public function index()
    {
        return view('settings.forgotPassword');
    }
    
    public function send(Request $request)
    {
        
        $email = Auth::user()->email;
        
        $data = array(
        'user' => Auth::user()->first_name,
        'user_id'=>Auth::id(),
        'subject' => $request->get('subject'),
        'content' => $request->get('content')
        );
        
        $email = Auth::user()->email;
        
    
        Mail::send('emails.sendEmail', $data, function($message)use($email){
            $message->from('gmplanner.team@gmail.com', 'gmPlanner');
            $message->to('gmplanner.team@gmail.com')->subject('Email from user');
            $message->replyTo($email);
        });
    }
    
    public function store(ForgotPassRequest $request)
    {
        $email = $request->get('email');
        
        if (User::where('email', '=', $email)->exists()) {
           // user found
           $new_password = str_random(8);
            
            DB::table('users')
            ->where('email', '=', $email)
            ->update(['password'=> Hash::make($new_password)]);
            
            $data = array(
             'new_password' =>  $new_password);
        
            Mail::send('emails.forgotPassEmail', $data, function($message) use($email){
            $message->from('gmplanner.team@gmail.com', 'gmPlanner');
            $message->to($email)->subject('Temporary Password');
          
            });
            
            // return view('settings.forgotPassword')->with('status', 'A temporary password has been emailed to you');
            return redirect('/forgotPassword')->with('status', 'A temporary password has been emailed to you');
         
        }
        else{
            // return view('settings.forgotPassword')->with('status', 'There is no account with this email!!');
            return redirect(action('EmailsController@index'))->with('status', 'There is no account with this email!');
            
        }
    }
   
}
