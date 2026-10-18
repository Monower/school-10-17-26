<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('student_name');
            $table->date('date_of_birth');
            $table->string('class_name');
            $table->string('gender');
            $table->string('father_name');
            $table->string('mother_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('previous_school')->nullable();
            $table->string('branch');
            $table->text('address');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
