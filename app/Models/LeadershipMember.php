<?php

namespace App\Models;

use Database\Factories\LeadershipMemberFactory;
use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string $name_en
 * @property string $name_bn
 * @property string $role_en
 * @property string $role_bn
 * @property string|null $message_en
 * @property string|null $message_bn
 * @property string $image_path
 * @property string $image_url
 * @property int $sort_order
 * @property bool $active
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['name_en', 'name_bn', 'role_en', 'role_bn', 'message_en', 'message_bn', 'image_path', 'sort_order', 'active'])]
#[Hidden(['image_path'])]
#[Appends(['image_url'])]
class LeadershipMember extends Model
{
    /** @use HasFactory<LeadershipMemberFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'active' => 'boolean',
        ];
    }

    /**
     * Scope the query to the members shown on the website.
     *
     * @param  Builder<LeadershipMember>  $query
     */
    public function scopeActive(Builder $query): void
    {
        $query->where('active', true);
    }

    /**
     * Scope the query to the configured display order.
     *
     * @param  Builder<LeadershipMember>  $query
     */
    public function scopeOrdered(Builder $query): void
    {
        $query->orderBy('sort_order')->orderBy('id');
    }

    /**
     * Get the public URL of the uploaded portrait.
     *
     * @return Attribute<string, never>
     */
    protected function imageUrl(): Attribute
    {
        return Attribute::get(fn (): string => Storage::disk('public')->url($this->image_path));
    }
}
