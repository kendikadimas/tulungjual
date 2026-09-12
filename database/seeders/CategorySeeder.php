<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Rumah',
            'Tanah',
            'Apartemen',
            'Ruko',
            'Kios',
            'Gudang',
            'Kost',
            'Villa',
            'Kantor',
            'Pabrik',
            'Kavling',
            'Cluster',
            'Hotel',
            'Komersial',
            'Lainnya',
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(
                ['slug' => Str::slug($cat)],
                [
                    'name' => $cat,
                    'is_active' => true,
                ]
            );
        }
    }
}
