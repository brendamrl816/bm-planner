<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRepetitionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('repetitions', function (Blueprint $table) {
            
            $table->increments('id');
            $table->integer('eventId')->unsigned();
            $table->foreign('eventId')->references('id')->on('events');
            $table->string('repeatOccurrence');
            $table->date('endRepetitionDate')->nullable();
            $table->char('repeatDaily')->nullable();
            $table->char('repeatWeekdays')->nullable();
            $table->integer('repeatWeekly')->nullable();
            $table->char('repeatMonthly')->nullable();
            $table->string('repeatYearly')->nullable();
            $table->boolean('neverEnds');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('repetitions');
    }
}
