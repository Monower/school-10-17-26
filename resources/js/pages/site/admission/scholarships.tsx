import { Head, Link } from '@inertiajs/react';
import { Award, Megaphone } from 'lucide-react';
import { PageHeader } from '@/components/site/page-header';
import { Button } from '@/components/ui/button';
import { Bilingual } from '@/lib/language';
import { apply } from '@/routes/admission';
import type { Scholarship } from '@/types';

export default function ScholarshipsPage({
    scholarships,
}: {
    scholarships: Scholarship[];
}) {
    return (
        <>
            <Head title="Scholarships — Sunshine Educare" />
            <PageHeader
                eyebrowEn="Admission"
                eyebrowBn="ভর্তি"
                titleEn="Scholarships"
                titleBn="বৃত্তি"
                introEn="Latest scholarship announcements for our students."
                introBn="আমাদের শিক্ষার্থীদের জন্য সর্বশেষ বৃত্তির ঘোষণা।"
            />
            <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
                <h2 className="flex items-center gap-2 text-2xl font-extrabold">
                    <Megaphone className="size-6 text-brand-red" />
                    <Bilingual en="Scholarship announcements" bn="বৃত্তির ঘোষণা" />
                </h2>
                {scholarships.length === 0 ? (
                    <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/40 px-6 py-16 text-center">
                        <Award className="mx-auto size-10 text-muted-foreground" />
                        <p className="mt-3 font-semibold text-muted-foreground">
                            <Bilingual
                                en="No scholarship announcements yet."
                                bn="এখনও কোনো বৃত্তির ঘোষণা নেই।"
                            />
                        </p>
                    </div>
                ) : (
                    <div className="mt-6 space-y-4">
                        {scholarships.map((scholarship) => (
                            <article
                                key={scholarship.id}
                                className="flex gap-4 rounded-md border border-l-4 border-border border-l-sun bg-card p-5"
                            >
                                <Award className="mt-1 size-6 shrink-0 text-primary" />
                                <div>
                                    <time className="text-xs font-bold text-muted-foreground">
                                        {scholarship.announce_date}
                                    </time>
                                    <h3 className="mt-1 text-lg font-bold">
                                        <Bilingual
                                            en={scholarship.title_en}
                                            bn={scholarship.title_bn}
                                        />
                                    </h3>
                                    {(scholarship.body_en ||
                                        scholarship.body_bn) && (
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            <Bilingual
                                                en={scholarship.body_en ?? ''}
                                                bn={
                                                    scholarship.body_bn ??
                                                    scholarship.body_en ??
                                                    ''
                                                }
                                            />
                                        </p>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
                <Button asChild className="mt-8">
                    <Link href={apply()}>
                        <Bilingual en="Apply now" bn="এখনই আবেদন করুন" />
                    </Link>
                </Button>
            </section>
        </>
    );
}
