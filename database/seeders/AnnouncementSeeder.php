<?php

namespace Database\Seeders;

use App\Models\Announcement;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    /**
     * Seed the default announcement ticker message.
     */
    public function run(): void
    {
        Announcement::query()->create([
            'text_en' => 'Admissions are now open — application details, schedules, and official notices will be published here.',
            'text_bn' => 'ভর্তি কার্যক্রম শুরু হয়েছে — আবেদন, সময়সূচি ও সকল অফিসিয়াল নোটিশ এখানে প্রকাশ করা হবে।',
            'active' => true,
        ]);
    }
}
