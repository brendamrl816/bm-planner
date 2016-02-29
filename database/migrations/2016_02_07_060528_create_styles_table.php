<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStylesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('styles', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->string('theme_name');
            $table->string('body_backgroundColor');
            $table->string('body_color');
            $table->string('body_fontFamily');
            $table->string('buttons_backgroundColor');
            $table->string('buttons_color');
            $table->string('buttons_fontFamily');
            $table->string('buttons_borderColor');
            $table->string('navBar_backgroundColor');
            $table->string('navBar_color');
            $table->string('navBar_borderColor');
            $table->string('menuModal_backgroundColor');
            $table->string('addModal_backgroundColor');
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
        Schema::drop('styles');
    }
}
