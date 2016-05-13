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
            'repeatOccurrence' =>'daily',
            'repeatInterval' =>null,
            'repeatEndDate'=>'2016-07-20 23:39:00',
            'repeatDaily'=>'*',
            'repeatWeekdays'=>null,
            'repeatWeekly'=>null,
            'repeatMonthly'=>null,
            'repeatYearly'=>null,
            'neverEnds'=>0
            ));

        Repetition::create(array(
            'event_id'=>12,
            'repeatOccurrence' =>'weekly',
            'repeatInterval' =>1209600,
            'repeatEndDate'=>'2016-12-16 00:00:00',
            'repeatDaily'=>null,
            'repeatWeekdays'=>null,
            'repeatWeekly'=>'025',
            'repeatMonthly'=>null,
            'repeatYearly'=>null,
            'neverEnds'=>0
            ));

        Repetition::create(array(
            'event_id'=>13,
            'repeatOccurrence' =>'weekly',
            'repeatInterval' =>604800,
            'repeatEndDate'=>'2016-06-23 16:18:00',
            'repeatDaily'=>null,
            'repeatWeekdays'=>null,
            'repeatWeekly'=>'146',
            'repeatMonthly'=>null,
            'repeatYearly'=>null,
            'neverEnds'=>0
            ));

        Repetition::create(array(
            'event_id'=>14,
            'repeatOccurrence' =>'monthly',
            'repeatInterval' =>1,
            'repeatEndDate'=>'2016-06-23 16:18:00',
            'repeatDaily'=>null,
            'repeatWeekdays'=>null,
            'repeatWeekly'=>null,
            'repeatMonthly'=>3,
            'repeatYearly'=>null,
            'neverEnds'=>0
            ));

        Repetition::create(array(
            'event_id'=>15,
            'repeatOccurrence' =>'yearly',
            'repeatInterval' =>1,
            'repeatEndDate'=>nul,
            'repeatDaily'=>null,
            'repeatWeekdays'=>null,
            'repeatWeekly'=>null,
            'repeatMonthly'=>null,
            'repeatYearly'=>'5-7',
            'neverEnds'=>1
            ));

        Repetition::create(array(
            'event_id'=>16,
            'repeatOccurrence' =>'monthly',
            'repeatInterval' =>2,
            'repeatEndDate'=>'2017-05-10 00:00:00',
            'repeatDaily'=>null,
            'repeatWeekdays'=>null,
            'repeatWeekly'=>null,
            'repeatMonthly'=>10,
            'repeatYearly'=>null,
            'neverEnds'=>0
            ));

        Repetition::create(array(
            'event_id'=>17,
            'repeatOccurrence' =>'yearly',
            'repeatInterval' =>2,
            'repeatEndDate'=>null,
            'repeatDaily'=>null,
            'repeatWeekdays'=>null,
            'repeatWeekly'=>null,
            'repeatMonthly'=>null,
            'repeatYearly'=>'5-10',
            'neverEnds'=>1
            ));
    }
}
