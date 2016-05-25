<?php

use Illuminate\Database\Seeder;
use App\Style;

class StyleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Style::create(array(
             'theme_name'=>'default',
            'body_backgroundColor'=> '189, 129, 97',
            'buttons_backgroundColor'=>'117, 168, 202',
            'buttons_borderColor'=> '89, 105, 114',
            'navBar_backgroundColor'=> '201, 216, 197',
            'menuModal_backgroundColor'=> '255, 246, 253',
            'user_id'=> 1,
        ));
    }
}
