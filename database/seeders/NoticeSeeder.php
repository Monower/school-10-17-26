<?php

namespace Database\Seeders;

use App\Models\Notice;
use Illuminate\Database\Seeder;

class NoticeSeeder extends Seeder
{
    /**
     * Seed the sample notices shown on the public site.
     */
    public function run(): void
    {
        $notices = [
            [
                'title_en' => 'Admission open for Class 1–12 (sample)',
                'title_bn' => '১ম–১২শ শ্রেণিতে ভর্তি চলছে (নমুনা)',
                'notice_date' => '2026-09-27',
            ],
            [
                'title_en' => 'Monthly exam schedule published (sample)',
                'title_bn' => 'মাসিক পরীক্ষার সময়সূচি প্রকাশ (নমুনা)',
                'notice_date' => '2026-09-22',
            ],
            [
                'title_en' => 'Parent–teacher meeting (sample)',
                'title_bn' => 'অভিভাবক–শিক্ষক সভা (নমুনা)',
                'notice_date' => '2026-09-15',
            ],
            [
                'title_en' => 'Holiday notice (sample)',
                'title_bn' => 'ছুটির নোটিশ (নমুনা)',
                'notice_date' => '2026-08-10',
            ],
        ];

        foreach ($notices as $notice) {
            Notice::query()->create($notice);
        }
    }
}
