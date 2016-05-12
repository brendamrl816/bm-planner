<?php


use App\Todolist;
use App\Task;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        $this->call('UserSeeder');
        $this->call('StyleSeeder');
        $this->call('CalendarSeeder');
        $this->call('EventSeeder');
        $this->call('RepetitionTableSeeder');
        $this->call('EventChangeTableSeeder');
        $this->call('TodolistTableSeeder');
        $this->call('TaskSeeder');
    

        Model::reguard();
    }
}
