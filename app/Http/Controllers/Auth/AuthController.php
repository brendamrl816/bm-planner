<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Calendar;
use App\Style;
use Validator;


use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Support\Facades\Mail;


class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    
    protected $redirectPath='/';
    protected $loginPath= '/users/login';
    
    public function _construct()
    {
        $this->middleware('guest', ['except' => 'getLogout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'dob' => 'required',
            'gender' => 'required',
            'password' => 'required|confirmed|min:6',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'dob' => $data['dob'],
            'gender' => $data['gender'],
            'password' => bcrypt($data['password']),
        ]);
        
        $name = $data['first_name'];
        $email = $data['email'];        
        $user_id = $user->id;
        
        Calendar::create(array(
            'name'=> $name,
            'color'=>'51, 153, 255',
            'user_id'=>$user_id
        ));
        
        Style::create(array(
            'theme_name'=>'default',
            'body_backgroundColor'=> '#f8f3f3',
            'body_color'=> '#4a2d10',
            'body_fontFamily'=> 'Arial, Helvetica, sans-serif',
            'buttons_backgroundColor'=>'#82adbb',
            'buttons_color'=> '#7b7474',
            'buttons_fontFamily'=> 'Arial, Helvetica, sans-serif',
            'buttons_borderColor'=> '#7b7474',
            'navBar_backgroundColor'=> '#7b7b4e',
            'navBar_color'=> '#ffffff',
            'navBar_borderColor'=> '#c3c3a2',
            'menuModal_backgroundColor'=> '#fff9e5',
            'addModal_backgroundColor'=> '#e8dee0',
            'user_id'=> $user_id,
        ));
            
        $emaildata = array(
                    'name'=>$name);
       
        Mail::send('emails.welcome', $emaildata, function($message) use($email){
        $message->from('compactdue@gmail.com', 'CompactDue');
        $message->to($email)->subject('Welcome to CompactDue');
        });
        
        return $user;
    }
}
