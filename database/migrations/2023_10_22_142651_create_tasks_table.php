<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title', 150)->nullable(false);
            $table->text('description')->nullable(false);
            $table->foreignId('priority_id')
                ->nullable(false)
                ->constrained('priorities')
                ->onUpdate('cascade')
                ->onDelete('restrict');
            $table->foreignId('status_id')
                ->nullable(false)
                ->constrained('statuses')
                ->onUpdate('cascade')
                ->onDelete('restrict');
            $table->foreignId('executor')
                ->nullable(false)
                ->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('restrict');
            $table->foreignId('creator')
                ->nullable(false)
                ->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('restrict');
            $table->date('date_end')->nullable(false);
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
        Schema::dropIfExists('tasks');
    }
};
