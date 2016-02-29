<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $fillable = ['user_id', 'name', 'color'];
    
    public function users(){
        return $this->belongsTo('App\User');
    }
    
}
