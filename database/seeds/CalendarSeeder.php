<?php

use Illuminate\Database\Seeder;
use App\Calendar;

class CalendarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Calendar::create(array(
            'name'=> 'Brenda',
            'color'=> '0, 153, 255',
            'user_id'=>1
            ));
            
        Calendar::create(array(
            'name'=> 'one day',
            'color'=> '255, 102, 153',
            'user_id'=>1
            ));
            
        Calendar::create(array(
            'name'=> 'long events',
            'color'=> '255, 153, 102',
            'user_id'=>1
            ));
            
        Calendar::create(array(
            'name'=> 'single repeats',
            'color'=> '0, 102, 0',
            'user_id'=>1
            ));
            
        Calendar::create(array(
            'name'=> 'long repeats',
            'color'=> '0, 51, 153',
            'user_id'=>1
            ));
    }
}
