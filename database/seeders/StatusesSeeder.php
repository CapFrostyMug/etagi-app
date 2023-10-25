<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('statuses')->insert($this->getData());
    }

    private function getData(): array
    {
        $data = [
            [
                'name' => 'к выполнению'
            ],
            [
                'name' => 'выполняется'
            ],
            [
                'name' => 'выполнена'
            ],
            [
                'name' => 'отменена'
            ],
        ];

        return $data;
    }
}
