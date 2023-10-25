<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrioritiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('priorities')->insert($this->getData());
    }

    private function getData(): array
    {
        $data = [
            [
                'name' => 'Высокий'
            ],
            [
                'name' => 'Средний'
            ],
            [
                'name' => 'Низкий'
            ],
        ];

        return $data;
    }
}
