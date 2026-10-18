import { Head, useForm } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '@/components/site/page-header';
import { Button } from '@/components/ui/button';
import { Bilingual, useLanguage } from '@/lib/language';
import {
    BRANCHES,
    CLASSES,
    branchLabel,
    classLabel,
    genderLabel,
    GENDERS,
} from '@/lib/site';
import { store } from '@/routes/admission/apply';

const input =
    'mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30';

function Field({
    en,
    bn,
    error,
    children,
}: {
    en: string;
    bn: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <label className="block text-sm font-semibold">
            <Bilingual en={en} bn={bn} />
            {children}
            {error && (
                <span className="mt-1 block text-xs font-semibold text-destructive">
                    {error}
                </span>
            )}
        </label>
    );
}

export default function ApplyPage() {
    const { isBangla } = useLanguage();
    const [done, setDone] = useState(false);
    const form = useForm({
        student_name: '',
        date_of_birth: '',
        class_name: '',
        gender: '',
        father_name: '',
        mother_name: '',
        phone: '',
        email: '',
        previous_school: '',
        branch: '',
        address: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post(store.url(), {
            preserveScroll: true,
            onSuccess: () => {
                setDone(true);
                form.reset();
            },
        });
    };

    return (
        <>
            <Head title="Apply Now — Sunshine Educare" />
            <PageHeader
                eyebrowEn="Admission"
                eyebrowBn="ভর্তি"
                titleEn="Apply now"
                titleBn="এখনই আবেদন করুন"
                introEn="Fill in the student’s details below. Our admission team will contact you."
                introBn="নিচে শিক্ষার্থীর তথ্য পূরণ করুন। আমাদের ভর্তি টিম আপনার সঙ্গে যোগাযোগ করবে।"
            />
            <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
                {done ? (
                    <div className="rounded-md border border-border bg-card p-10 text-center">
                        <CheckCircle2 className="mx-auto size-12 text-success" />
                        <h2 className="mt-4 text-2xl font-bold">
                            <Bilingual
                                en="Application received"
                                bn="আবেদন গৃহীত হয়েছে"
                            />
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            <Bilingual
                                en="Thank you! We will contact you soon."
                                bn="ধন্যবাদ! আমরা শীঘ্রই আপনার সঙ্গে যোগাযোগ করব।"
                            />
                        </p>
                        <Button
                            type="button"
                            className="mt-6"
                            onClick={() => setDone(false)}
                        >
                            <Bilingual
                                en="Submit another"
                                bn="আরেকটি আবেদন করুন"
                            />
                        </Button>
                    </div>
                ) : (
                    <form
                        onSubmit={submit}
                        className="grid gap-5 rounded-md border border-border bg-card p-6 sm:grid-cols-2 sm:p-8"
                    >
                        <Field
                            en="Student’s full name"
                            bn="শিক্ষার্থীর পূর্ণ নাম"
                            error={form.errors.student_name}
                        >
                            <input
                                required
                                maxLength={100}
                                value={form.data.student_name}
                                onChange={(event) =>
                                    form.setData(
                                        'student_name',
                                        event.target.value,
                                    )
                                }
                                className={input}
                            />
                        </Field>
                        <Field
                            en="Date of birth"
                            bn="জন্ম তারিখ"
                            error={form.errors.date_of_birth}
                        >
                            <input
                                required
                                type="date"
                                max={new Date().toISOString().slice(0, 10)}
                                value={form.data.date_of_birth}
                                onChange={(event) =>
                                    form.setData(
                                        'date_of_birth',
                                        event.target.value,
                                    )
                                }
                                className={input}
                            />
                        </Field>
                        <Field
                            en="Class"
                            bn="শ্রেণি"
                            error={form.errors.class_name}
                        >
                            <select
                                required
                                value={form.data.class_name}
                                onChange={(event) =>
                                    form.setData(
                                        'class_name',
                                        event.target.value,
                                    )
                                }
                                className={input}
                            >
                                <option value="" disabled>
                                    {isBangla
                                        ? 'শ্রেণি নির্বাচন করুন'
                                        : 'Select class'}
                                </option>
                                {CLASSES.map((className) => (
                                    <option key={className} value={className}>
                                        {classLabel(className, isBangla)}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field en="Gender" bn="লিঙ্গ" error={form.errors.gender}>
                            <select
                                required
                                value={form.data.gender}
                                onChange={(event) =>
                                    form.setData('gender', event.target.value)
                                }
                                className={input}
                            >
                                <option value="" disabled>
                                    {isBangla ? 'নির্বাচন করুন' : 'Select'}
                                </option>
                                {GENDERS.map((gender) => (
                                    <option key={gender} value={gender}>
                                        {genderLabel(gender, isBangla)}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field
                            en="Father’s name"
                            bn="পিতার নাম"
                            error={form.errors.father_name}
                        >
                            <input
                                required
                                maxLength={100}
                                value={form.data.father_name}
                                onChange={(event) =>
                                    form.setData(
                                        'father_name',
                                        event.target.value,
                                    )
                                }
                                className={input}
                            />
                        </Field>
                        <Field
                            en="Mother’s name"
                            bn="মাতার নাম"
                            error={form.errors.mother_name}
                        >
                            <input
                                required
                                maxLength={100}
                                value={form.data.mother_name}
                                onChange={(event) =>
                                    form.setData(
                                        'mother_name',
                                        event.target.value,
                                    )
                                }
                                className={input}
                            />
                        </Field>
                        <Field
                            en="Guardian’s phone"
                            bn="অভিভাবকের ফোন"
                            error={form.errors.phone}
                        >
                            <input
                                required
                                type="tel"
                                pattern="[0-9+\- ]{8,15}"
                                value={form.data.phone}
                                onChange={(event) =>
                                    form.setData('phone', event.target.value)
                                }
                                className={input}
                            />
                        </Field>
                        <Field
                            en="Email (optional)"
                            bn="ইমেইল (ঐচ্ছিক)"
                            error={form.errors.email}
                        >
                            <input
                                type="email"
                                maxLength={255}
                                value={form.data.email}
                                onChange={(event) =>
                                    form.setData('email', event.target.value)
                                }
                                className={input}
                            />
                        </Field>
                        <Field
                            en="Previous school"
                            bn="পূর্ববর্তী বিদ্যালয়"
                            error={form.errors.previous_school}
                        >
                            <input
                                maxLength={150}
                                value={form.data.previous_school}
                                onChange={(event) =>
                                    form.setData(
                                        'previous_school',
                                        event.target.value,
                                    )
                                }
                                className={input}
                            />
                        </Field>
                        <Field
                            en="Preferred branch"
                            bn="পছন্দের শাখা"
                            error={form.errors.branch}
                        >
                            <select
                                required
                                value={form.data.branch}
                                onChange={(event) =>
                                    form.setData('branch', event.target.value)
                                }
                                className={input}
                            >
                                <option value="" disabled>
                                    {isBangla
                                        ? 'শাখা নির্বাচন করুন'
                                        : 'Select branch'}
                                </option>
                                {BRANCHES.map((branch) => (
                                    <option key={branch} value={branch}>
                                        {branchLabel(branch, isBangla)}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <div className="sm:col-span-2">
                            <Field
                                en="Address"
                                bn="ঠিকানা"
                                error={form.errors.address}
                            >
                                <textarea
                                    required
                                    rows={3}
                                    maxLength={300}
                                    value={form.data.address}
                                    onChange={(event) =>
                                        form.setData(
                                            'address',
                                            event.target.value,
                                        )
                                    }
                                    className={input}
                                />
                            </Field>
                        </div>
                        {form.hasErrors && !form.isDirty && (
                            <p className="text-sm font-semibold text-destructive sm:col-span-2">
                                <Bilingual
                                    en="Could not submit. Please check the form and try again."
                                    bn="জমা দেওয়া যায়নি, তথ্য যাচাই করে আবার চেষ্টা করুন।"
                                />
                            </p>
                        )}
                        <div className="sm:col-span-2">
                            <Button
                                type="submit"
                                size="lg"
                                disabled={form.processing}
                                className="w-full sm:w-auto"
                            >
                                <Bilingual
                                    en="Submit application"
                                    bn="আবেদন জমা দিন"
                                />
                            </Button>
                        </div>
                    </form>
                )}
            </section>
        </>
    );
}
