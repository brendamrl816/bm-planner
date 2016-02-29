<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->integer('calendar_id');
            $table->string('name');
            $table->date('startDate');
            $table->date('endDate');
            $table->integer('eventLength');
            $table->time('startTime');
            $table->time('endTime');
            $table->string('startTimeDisplay');
            $table->string('endTimeDisplay');
            $table->boolean('allDay');
            $table->boolean('repeats');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('events');
    }
}
