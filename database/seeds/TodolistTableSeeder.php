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
        DB::table('todolists')->delete();
        
        Todolist::create(array(
            'id'=>1,
            'name'=>'To Buy'
        ));
        
        Todolist::create(array(
            'id'=>2,
            'name'=>'To Fix'
        ));
    }
}
