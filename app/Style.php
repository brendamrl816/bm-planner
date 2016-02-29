<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Style extends Model
{
    protected $guarded = [];
    
    protected $fillabe = ['user_id', 'theme_name',
    'body_backgroundColor', 
    'body_color', 'body_fontFamily', 
    'buttons_backgroundColor', 'buttons_color', 'buttons_fontFamily', 'buttons_borderColor', 
    'navBar_backgroundColor', 'navBar_color', 'navBar_boderColor', 
    'menuModal_backgroundColor', 'addModal_backgroundColor'];
    
    public function users(){
        return $this->belongsTo('App\User');
    }
}
