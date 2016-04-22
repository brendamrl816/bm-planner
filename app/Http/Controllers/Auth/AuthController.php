<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Calendar;
use App\Style;
use Validator;
use App\Todolist;


use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

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
        
        Todolist::create(array(
            'name'=> 'To Do',
            'color'=>'0, 0, 102',
            'user_id'=>$user_id
        ));
        
        Style::create(array(
            'theme_name'=>'default',
            'body_backgroundColor'=> '#ffffff',
            'body_color'=> '#663300',
            'body_fontFamily'=> 'Arial, Helvetica, sans-serif',
            'buttons_backgroundColor'=>'#99ffcc',
            'buttons_borderColor'=> '#b4febe',
            'navBar_backgroundColor'=> '#66ffb3',
            'navBar_color'=> '#ffffff',
            'navBar_borderColor'=> '#79ecb3',
            'menuModal_backgroundColor'=> '#E1F5E6',
            'user_id'=> $user_id,
        ));
            
        $emaildata = array(
                    'name'=>$name);
       
        Mail::send('emails.welcome', $emaildata, function($message) use($email){
        $message->from('gmplanner.team@gmail.com', 'gmPlanner');
        $message->to($email)->subject('Welcome to gmPlanner');
        });
        
        return $user;
    }
    
}
