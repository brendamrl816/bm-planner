<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Eventchange extends Model
{
    protected $fillable=['event_id', 'dateOfChange'];
    
    public function events(){
        return $this->belongsTo('App\Event', 'event_id');
    }

}
