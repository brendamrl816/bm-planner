<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Requests\UserEditRequest;
use App\Style;
use App\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use App\Http\Controllers\Controller;


use Response;
use Input;
use DB;
use Redirect;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
  
    
    public function index()
    {
       $user_id = Auth::id();
       $styles = Style::where('user_id', '=', $user_id)->first();
        
        return $styles;
    }
    
   
    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        $id = Auth::id();
        $user = User::whereId($id)->firstOrFail();
        
        return view('userSettings', compact('user'));
    }
    
    public function update_user(UserEditRequest $request){
        $id = Auth::id();
        $password = $request->get('old_password');
        
        if (Auth::attempt(array('id' => $id, 'password' => $password)))
        {
            $user = User::whereId($id)->firstOrFail();
            $user->first_name = $request->get('first_name');
            $user->last_name = $request->get('last_name');
            $user->dob = $request->get('dob');
            $user->email = $request->get('email');
            $new_password = $request->get('password');
                if($new_password != "") {
                    $user->password = Hash::make($new_password);
                }
            $user->save();
           
            return redirect(action('SettingsController@edit'))->with('status', 'Your account settings have been updated!');  
        }
        else{
            return redirect(action('SettingsController@edit'))->with('status', 'your current password is invalid!');
        }
        
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $theme_name = Input::get('theme_name');
        $body_backgroundColor = Input::get('body_backgroundColor');
        $body_color = Input::get('body_color');
        $body_fontFamily = Input::get('body_fontFamily');
        $buttons_backgroundColor=Input::get('buttons_backgroundColor');
        $buttons_color=Input::get('buttons_color');
        $buttons_fontFamily=Input::get('buttons_fontFamily');
        $buttons_borderColor=Input::get('buttons_borderColor');
        $navBar_backgroundColor=Input::get('navBar_backgroundColor');
        $navBar_color=Input::get('navBar_color');
        $navBar_borderColor=Input::get('navBar_borderColor');
        $menuModal_backgroundColor=Input::get('menuModal_backgroundColor');
        $addModal_backgroundColor=Input::get('addModal_backgroundColor');
        
        
        DB::table('styles')->where('id', '=', $id)->update([
            'theme_name'=> $theme_name,
            'body_backgroundColor'=> $body_backgroundColor,
            'body_color'=>  $body_color,
            'body_fontFamily'=> $body_fontFamily,
            'buttons_backgroundColor'=>$buttons_backgroundColor,
            'buttons_color'=> $buttons_color,
            'buttons_fontFamily'=>  $buttons_fontFamily,
            'buttons_borderColor'=> $buttons_borderColor,
            'navBar_backgroundColor'=> $navBar_backgroundColor,
            'navBar_color'=> $navBar_color,
            'navBar_borderColor'=> $navBar_borderColor,
            'menuModal_backgroundColor'=> $menuModal_backgroundColor,
            'addModal_backgroundColor'=> $addModal_backgroundColor
        ]);
        
        
        return Response::json(array('success'=>true));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
