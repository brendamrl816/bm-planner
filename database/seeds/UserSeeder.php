<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'first_name' => 'Brenda',
            'last_name' => 'Castillo',
            'email' => 'brendamrl816@gmail.com',
            'dob' => '1989-08-16',
            'gender' => 'female',
            'password' => bcrypt('samsung15')]);
    }
}
