<?php

use Illuminate\Database\Seeder;
use App\Task;


class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tasks')->delete();
        
        Task::create(array(
            'name'=>'shampoo',
            'id'=>1,
            'todolist_id'=>1,
            'completed'=>false
            ));
            
        Task::create(array(
            'name'=>'food',
            'id'=>2,
            'todolist_id'=>1,
            'completed'=>false
            ));
    }
}
