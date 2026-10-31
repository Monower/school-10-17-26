import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Award, Megaphone } from 'lucide-react';
import { PageHeader } from '@/components/site/page-header';
import { scholarships as scholarshipsRoute } from '@/routes/admission';
import { show as scholarshipShow } from '@/routes/admission/scholarships';
import { Bilingual } from '@/lib/language';
import type { Scholarship } from '@/types';

export default function ScholarshipShowPage({
    scholarship,
}: {
    scholarship: Scholarship;
}) {
    return (
        <>
            <Head title={`${scholarship.title_en} — Sunshine Educare`} />
            <PageHeader
                eyebrowEn="Scholarship"
                eyebrowBn="বৃত্তি"
                titleEn={scholarship.title_en}
                titleBn={scholarship.title_bn}
                introEn={`Announced on ${scholarship.announce_date}.`}
                introBn={`ঘোষণার তারিখ: ${scholarship.announce_date}।`}
            />
            <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
                <Link
                    href={scholarshipsRoute()}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    <Bilingual
                        en="Back to scholarships"
                        bn="সকল বৃত্তিতে ফিরে যান"
                    />
                </Link>

                <article className="mt-6 rounded-xl border border-l-4 border-border border-l-sun bg-card p-6 sm:p-8">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                        <Megaphone className="size-4 text-brand-red" />
                        <Bilingual
                            en="Scholarship announcement"
                            bn="বৃত্তির ঘোষণা"
                        />
                        <span aria-hidden="true">•</span>
                        <Award className="size-4" />
                        <time>{scholarship.announce_date}</time>
                    </div>

                    <h2 className="mt-4 text-2xl font-extrabold">
                        <Bilingual
                            en={scholarship.title_en}
                            bn={scholarship.title_bn}
                        />
                    </h2>

                    {(scholarship.body_en || scholarship.body_bn) && (
                        <div className="mt-6 space-y-4 text-muted-foreground">
                            {scholarship.body_en && (
                                <p className="whitespace-pre-line leading-relaxed">
                                    {scholarship.body_en}
                                </p>
                            )}
                            {scholarship.body_bn && (
                                <p className="whitespace-pre-line leading-relaxed">
                                    {scholarship.body_bn}
                                </p>
                            )}
                        </div>
                    )}
                </article>
            </section>
        </>
    );
}
