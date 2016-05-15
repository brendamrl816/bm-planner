<?php

use Illuminate\Database\Seeder;
use App\Event;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //user:1
        //one day: 2
        //long events:3
        
        Event::create(array(
            'name'=>'test1',
            'user_id'=>1,
            'calendar_id'=>2,
            'startDate'=>'2016-05-09 17:19:00',
            'endDate'=>'2016-05-09 20:52:00',
            'length_hours'=> 4,
            'length_days'=> 0,
            'allDay'=>false,
            'repeats'=>false
            ));
            
        Event::create(array(
            'name'=>'test2',
            'user_id'=>1,
            'calendar_id'=>2,
            'startDate'=>'2016-05-09 14:50:00',
            'endDate'=>'2016-05-09 21:10:00',
            'length_hours'=> 7,
            'length_days'=> 0,
            'allDay'=>false,
            'repeats'=>false
            ));
        
        Event::create(array(
            'name'=>'test3',
            'user_id'=>1,
            'calendar_id'=>2,
            'startDate'=>'2016-05-11 21:56:00',
            'endDate'=>'2016-05-12 00:00:00',
            'length_hours'=> 3,
            'length_days'=> 0,
            'allDay'=>false,
            'repeats'=>false
            ));
            
        Event::create(array(
            'name'=>'test4',
            'user_id'=>1,
            'calendar_id'=>2,
            'startDate'=>'2016-05-18 00:00:00',
            'endDate'=>'2016-05-19 00:00:00',
            'length_hours'=> 24,
            'length_days'=> 0,
            'allDay'=>false,
            'repeats'=>false
            ));
            
            Event::create(array(
            'name'=>'test5',
            'user_id'=>1,
            'calendar_id'=>2,
            'startDate'=>'2016-05-23 00:00:00',
            'endDate'=>'2016-05-23 19:45:00',
            'length_hours'=> 20,
            'length_days'=> 0,
            'allDay'=>false,
            'repeats'=>false
            ));
            
            Event::create(array(
            'name'=>'test6',
            'user_id'=>1,
            'calendar_id'=>1,
            'startDate'=>'2016-05-18 18:56:00',
            'endDate'=>'2016-05-19 04:20:00',
            'length_hours'=> 10,
            'length_days'=> 2,
            'allDay'=>false,
            'repeats'=>false
            ));
            
            //*****Long Events***********
            Event::create(array(
            'name'=>'test7',
            'user_id'=>1,
            'calendar_id'=>3,
            'startDate'=>'2016-05-02 19:14:00',
            'endDate'=>'2016-05-04 22:57:00',
            'length_hours'=>51.72,
            'length_days'=> 3,
            'allDay'=>false,
            'repeats'=>false
            ));
            
            Event::create(array(
            'name'=>'test8',
            'user_id'=>1,
            'calendar_id'=>3,
            'startDate'=>'2016-05-12 21:36:00',
            'endDate'=>'2016-05-16 00:00:00',
            'length_hours'=>75,
            'length_days'=> 4,
            'allDay'=>false,
            'repeats'=>false
            ));
            
            Event::create(array(
            'name'=>'test9',
            'user_id'=>1,
            'calendar_id'=>3,
            'startDate'=>'2016-05-11 00:00:00',
            'endDate'=>'2016-05-16 00:00:00',
            'length_hours'=>120,
            'length_days'=> 5,
            'allDay'=>false,
            'repeats'=>false
            ));
            
            Event::create(array(
            'name'=>'test10',
            'user_id'=>1,
            'calendar_id'=>3,
            'startDate'=>'2016-05-20 00:00:00',
            'endDate'=>'2016-05-23 22:52:00',
            'length_hours'=>95,
            'length_days'=> 4,
            'allDay'=>false,
            'repeats'=>false
            ));
            
        //*****************repetitions*************************************
        //single reps calendar:4
        //long reps calendar:5
        
            Event::create(array(
            'name'=>'rep1',
            'user_id'=>1,
            'calendar_id'=>4,
            'startDate'=>'2016-05-30 13:07:00 ',
            'endDate'=>' 2016-05-30 23:39:00',
            'length_hours'=>10.53,
            'length_days'=> 0,
            'allDay'=>false,
            'repeats'=>1
            ));

            Event::create(array(
            'name'=>'rep11',
            'user_id'=>1,
            'calendar_id'=>5,
            'startDate'=>'2016-08-09 13:13:00',
            'endDate'=>'2016-08-13 00:00:00',
            'length_hours'=>83,
            'length_days'=> 4,
            'allDay'=>false,
            'repeats'=>1
            ));

            Event::create(array(
            'name'=>'rep13',
            'user_id'=>1,
            'calendar_id'=>5,
            'startDate'=>'2016-05-16 00:00:00',
            'endDate'=>'2016-05-18 16:18:00',
            'length_hours'=>65,
            'length_days'=> 3,
            'allDay'=>false,
            'repeats'=>1
            ));

            Event::create(array(
            'name'=>'montly1',
            'user_id'=>1,
            'calendar_id'=>6,
            'startDate'=>'2016-05-03 00:00:00',
            'endDate'=>'2016-05-03 15:19:00',
            'length_hours'=>16,
            'length_days'=>0,
            'allDay'=>false,
            'repeats'=>1
            ));
            
            Event::create(array(
            'name'=>'year1',
            'user_id'=>1,
            'calendar_id'=>1,
            'startDate'=>'2016-05-03 00:00:00',
            'endDate'=>'2016-05-03 15:13:00',
            'length_hours'=>15.22,
            'length_days'=>0,
            'allDay'=>false,
            'repeats'=>1
            ));

            Event::create(array(
            'name'=>'montly long',
            'user_id'=>1,
            'calendar_id'=>6,
            'startDate'=>"2016-05-10 00:00:00",
            'endDate'=>'2016-05-13 00:00:00',
            'length_hours'=>72,
            'length_days'=>3,
            'allDay'=>false,
            'repeats'=>1
            ));

            Event::create(array(
            'name'=>'year long',
            'user_id'=>1,
            'calendar_id'=>5,
            'startDate'=>'2016-05-10 14:00:00',
            'endDate'=>'2016-05-13 00:00:00',
            'length_hours'=>58,
            'length_days'=>3,
            'allDay'=>false,
            'repeats'=>1
            ));
    }
}
