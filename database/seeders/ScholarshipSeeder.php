<?php

namespace Database\Seeders;

use App\Models\Scholarship;
use Illuminate\Database\Seeder;

class ScholarshipSeeder extends Seeder
{
    /**
     * Seed the sample scholarship announcements shown on the public site.
     */
    public function run(): void
    {
        $scholarships = [
            [
                'title_en' => 'Merit scholarship test — sample announcement',
                'title_bn' => 'মেধা বৃত্তি পরীক্ষা — নমুনা ঘোষণা',
                'body_en' => 'Registration details and exam date will be published here.',
                'body_bn' => 'নিবন্ধনের তথ্য ও পরীক্ষার তারিখ এখানে প্রকাশ করা হবে।',
                'announce_date' => '2026-09-25',
            ],
            [
                'title_en' => 'Need-based financial support — sample announcement',
                'title_bn' => 'প্রয়োজনভিত্তিক আর্থিক সহায়তা — নমুনা ঘোষণা',
                'body_en' => 'Families may contact the branch office for eligibility details.',
                'body_bn' => 'যোগ্যতার বিষয়ে জানতে শাখা অফিসে যোগাযোগ করুন।',
                'announce_date' => '2026-09-10',
            ],
        ];

        foreach ($scholarships as $scholarship) {
            Scholarship::query()->create($scholarship);
        }
    }
}
