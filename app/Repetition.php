<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Repetition extends Model
{
    protected $fillable=['eventId', 'repeatOccurrence', 'endRepetitionDate', 'repeatDaily', 
    'repeatWeekdays', 'repeatWeekly', 'repeatMonthly', 'repeatYearly', 'neverEnds'];
}
