<?php

namespace App\Models;

use Database\Factories\ApplicationFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $student_name
 * @property Carbon $date_of_birth
 * @property string $class_name
 * @property string $gender
 * @property string $father_name
 * @property string $mother_name
 * @property string $phone
 * @property string|null $email
 * @property string|null $previous_school
 * @property string $branch
 * @property string $address
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'student_name',
    'date_of_birth',
    'class_name',
    'gender',
    'father_name',
    'mother_name',
    'phone',
    'email',
    'previous_school',
    'branch',
    'address',
])]
class Application extends Model
{
    /** @use HasFactory<ApplicationFactory> */
    use HasFactory;

    /**
     * The class names a student may apply for.
     *
     * @var list<string>
     */
    public const CLASS_NAMES = [
        'Class 1',
        'Class 2',
        'Class 3',
        'Class 4',
        'Class 5',
        'Class 6',
        'Class 7',
        'Class 8',
        'Class 9',
        'Class 10',
        'Class 11',
        'Class 12',
    ];

    /**
     * The branch names a student may apply to.
     *
     * @var list<string>
     */
    public const BRANCHES = [
        'Bhairab Bazar Branch',
        'Kamalpur Branch',
    ];

    /**
     * The gender values stored for an application.
     *
     * @var list<string>
     */
    public const GENDERS = [
        'Male',
        'Female',
    ];
}
