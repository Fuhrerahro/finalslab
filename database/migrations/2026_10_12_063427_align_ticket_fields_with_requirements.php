<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->renameColumn('subject', 'title');
        });

        Schema::table('tickets', function (Blueprint $table) {
            $table->string('category')
                ->default('Other')
                ->after('description');
        });
    }

    public function down(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn('category');
        });

        Schema::table('tickets', function (Blueprint $table) {
            $table->renameColumn('title', 'subject');
        });
    }
};