<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Style extends Model
{
    protected $guarded = [];
    
    protected $fillabe = ['user_id', 'theme_name',
    'body_backgroundColor', 
    'buttons_backgroundColor', 'buttons_borderColor', 
     'navBar_boderColor', 
    'menuModal_backgroundColor'];
    
    public function users(){
        return $this->belongsTo('App\User');
    }
}
