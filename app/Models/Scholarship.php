<?php

namespace App\Models;

use Database\Factories\ScholarshipFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $title_en
 * @property string $title_bn
 * @property string|null $body_en
 * @property string|null $body_bn
 * @property Carbon $announce_date
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['title_en', 'title_bn', 'body_en', 'body_bn', 'announce_date'])]
class Scholarship extends Model
{
    /** @use HasFactory<ScholarshipFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'announce_date' => 'date:Y-m-d',
        ];
    }
}
