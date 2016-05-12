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
            'body_backgroundColor'=> '#ffffff',
            'body_color'=> '#663300',
            'body_fontFamily'=> 'Arial, Helvetica, sans-serif',
            'buttons_backgroundColor'=>'#99ffcc',
            'buttons_borderColor'=> '#b4febe',
            'navBar_backgroundColor'=> '#66ffb3',
            'navBar_color'=> '#ffffff',
            'navBar_borderColor'=> '#79ecb3',
            'menuModal_backgroundColor'=> '#E1F5E6',
            'user_id'=> 1,
        ));
    }
}
