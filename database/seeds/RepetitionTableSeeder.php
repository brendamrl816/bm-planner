<?php

use Illuminate\Database\Seeder;
use App\Repetition;

class RepetitionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Repetition::create(array(
            'event_id'=>11,
            'repeatOccurrence' =>daily,
            'repeatInterval' =>null,
            'repeatEndDate'=>'2016-07-20 23:39:00',
            'repeatDaily'=>'*',
            'repeatWeekdays'=>null,
            'repeatWeekly'=>null,
            'repeatMonthly'=>null,
            'repeatYearly'=>null,
            'neverEnds'=>0
            ));
    }
}
