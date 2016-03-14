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
use Illuminate\Support\Facades\Hash;
use DB; 


class EmailsController extends Controller
{
    
    public function contact_us()
    {
        $user_id = Auth::id();
        $user = User::where('id', '=', $user_id)->first();
        return view('settings.contactUs', compact('user'));
    }
    
    public function forgot_pass()
    {
        return view('settings.forgotPassword');
    }
    
    public function send(EmailFormRequest $request)
    {
        $data = array(
        'user' => Auth::user()->first_name,
        'user_id'=>Auth::id(),
        'user_email' => Auth::user()->email,
        'subject' => $request->get('subject'),
        'content' => $request->get('content')
        );
    
        Mail::send('emails.sendEmail', $data, function($message){
            $message->from('gmplanner.team@gmail.com', 'gmPlanner');
            $message->to('gmplanner.team@gmail.com')->subject('Email from user');
        });
    
        return redirect('/contactUs')->with('status', 'your message has been sent successfully!');
    }
    
    public function tempPass(Request $request)
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
            
            return redirect('/forgotPassword')->with('status', 'A temporary password has been emailed to you');
         
        }
        else{
            return redirect('/forgotPassword')->with('status', 'There is no account with this email!!');
            
        }
    }
   
}
