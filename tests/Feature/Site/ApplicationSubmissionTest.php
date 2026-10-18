<?php

use App\Models\Application;

/**
 * @param  array<string, mixed>  $overrides
 * @return array<string, mixed>
 */
function validApplicationPayload(array $overrides = []): array
{
    return array_merge([
        'student_name' => 'Rafiq Hasan',
        'date_of_birth' => '2015-04-12',
        'class_name' => 'Class 5',
        'gender' => 'Male',
        'father_name' => 'Karim Hasan',
        'mother_name' => 'Rahima Begum',
        'phone' => '01712345678',
        'email' => 'karim@example.com',
        'previous_school' => 'Sunrise Primary',
        'branch' => 'Bhairab Bazar Branch',
        'address' => 'Bhairab Bazar, Kishoreganj',
    ], $overrides);
}

test('an admission application can be submitted', function () {
    $response = $this->post(route('admission.apply.store'), validApplicationPayload());

    $response->assertRedirect(route('admission.apply'));

    $this->assertDatabaseHas('applications', [
        'student_name' => 'Rafiq Hasan',
        'class_name' => 'Class 5',
        'branch' => 'Bhairab Bazar Branch',
    ]);
});

test('the optional fields may be omitted', function () {
    $payload = validApplicationPayload();
    unset($payload['email'], $payload['previous_school']);

    $this->post(route('admission.apply.store'), $payload)->assertRedirect();

    $application = Application::query()->sole();

    expect($application->email)->toBeNull()
        ->and($application->previous_school)->toBeNull();
});

test('required student details are validated', function () {
    $response = $this->from(route('admission.apply'))
        ->post(route('admission.apply.store'), []);

    $response->assertSessionHasErrors([
        'student_name',
        'date_of_birth',
        'class_name',
        'gender',
        'father_name',
        'mother_name',
        'phone',
        'branch',
        'address',
    ]);

    $this->assertDatabaseCount('applications', 0);
});

test('an unknown class name is rejected', function () {
    $this->from(route('admission.apply'))
        ->post(route('admission.apply.store'), validApplicationPayload(['class_name' => 'Class 99']))
        ->assertSessionHasErrors('class_name');

    $this->assertDatabaseCount('applications', 0);
});

test('a future date of birth is rejected', function () {
    $this->from(route('admission.apply'))
        ->post(route('admission.apply.store'), validApplicationPayload([
            'date_of_birth' => now()->addDay()->toDateString(),
        ]))
        ->assertSessionHasErrors('date_of_birth');

    $this->assertDatabaseCount('applications', 0);
});
