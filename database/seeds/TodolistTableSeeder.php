<?php

use Illuminate\Database\Seeder;
use App\Todolist;



class TodolistTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      Todolist::create(array(
            'user_id'=>'1',
            'name'=> 'To Do',
            'color'=>'0, 153, 255'
            ));
    }
}
