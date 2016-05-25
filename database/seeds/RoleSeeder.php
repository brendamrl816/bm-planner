<?php

use Illuminate\Database\Seeder;
use App\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       Role::create(array(
            'name' => 'manager',
            'display_name' => 'Manager',
            'description' => 'has all access'
        ));
            
    }
}
