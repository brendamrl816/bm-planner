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
            
            $table->increments('id')->unsigned();
            $table->integer('event_id')->unsigned();
            $table->string('repeatOccurrence');
            $table->integer('repeatInterval')->nullable();
            $table->date('repeatEndDate')->nullable();
            $table->char('repeatDaily')->nullable();
            $table->char('repeatWeekdays')->nullable();
            $table->string('repeatWeekly')->nullable();
            $table->char('repeatMonthly')->nullable();
            $table->string('repeatYearly')->nullable();
            $table->boolean('neverEnds');
            $table->timestamps();
            $table->foreign('event_id')->references('id')->on('events')->onUpdate('cascade')->onDelete('cascade');
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
