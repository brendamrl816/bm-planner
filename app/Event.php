<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{

    protected $fillable=[ 'calendarId', 'name', 'startDate', 'endDate', 'eventLength', 'startTime', 'endTime', 'startTimeDisplay', 'endTimeDisplay', 'allDay', 'repeats'];
}
