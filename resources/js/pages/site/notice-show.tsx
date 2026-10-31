import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CalendarDays, FileText } from 'lucide-react';
import { PageHeader } from '@/components/site/page-header';
import { Bilingual } from '@/lib/language';
import { notice } from '@/routes';
import { show as noticeShow } from '@/routes/notice';
import type { Notice } from '@/types';

export default function NoticeShowPage({ notice: item }: { notice: Notice }) {
    return (
        <>
            <Head title={`${item.title_en} — Sunshine Educare`} />
            <PageHeader
                eyebrowEn="Notice"
                eyebrowBn="নোটিশ"
                titleEn={item.title_en}
                titleBn={item.title_bn}
                introEn={`Published on ${item.notice_date}.`}
                introBn={`প্রকাশের তারিখ: ${item.notice_date}।`}
            />
            <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
                <Link
                    href={notice.url()}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    <Bilingual en="Back to notices" bn="সকল নোটিশে ফিরে যান" />
                </Link>

                <article className="mt-6 rounded-xl border border-border bg-card p-6 sm:p-8">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                        <FileText className="size-4 text-brand-red" />
                        <Bilingual en="Official notice" bn="অফিসিয়াল নোটিশ" />
                        <span aria-hidden="true">•</span>
                        <CalendarDays className="size-4" />
                        <time>{item.notice_date}</time>
                    </div>

                    <h2 className="mt-4 text-2xl font-extrabold">
                        <Bilingual en={item.title_en} bn={item.title_bn} />
                    </h2>

                    {(item.body_en || item.body_bn) && (
                        <div className="mt-6 space-y-4 text-muted-foreground">
                            {item.body_en && (
                                <p className="whitespace-pre-line leading-relaxed">
                                    {item.body_en}
                                </p>
                            )}
                            {item.body_bn && (
                                <p className="whitespace-pre-line leading-relaxed">
                                    {item.body_bn}
                                </p>
                            )}
                        </div>
                    )}
                </article>
            </section>
        </>
    );
}
