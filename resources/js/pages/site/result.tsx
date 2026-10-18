import { Head } from '@inertiajs/react';
import { Download, Eye, FileText } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '@/components/site/page-header';
import { Bilingual, useLanguage } from '@/lib/language';
import { CLASSES, classLabel, formatDate, formatSize } from '@/lib/site';
import type { ResultItem } from '@/types';

export default function ResultPage({ results }: { results: ResultItem[] }) {
    const { isBangla } = useLanguage();
    const [filterClass, setFilterClass] = useState('all');
    const visible =
        filterClass === 'all'
            ? results
            : results.filter((result) => result.class_name === filterClass);

    return (
        <>
            <Head title="Results — Sunshine Educare" />
            <PageHeader
                eyebrowEn="Results"
                eyebrowBn="ফলাফল"
                titleEn="Class-wise Results"
                titleBn="শ্রেণিভিত্তিক ফলাফল"
                introEn="View and download exam results for every class in PDF format."
                introBn="প্রতিটি শ্রেণির পরীক্ষার ফলাফল পিডিএফ আকারে দেখুন ও ডাউনলোড করুন।"
            />
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-2xl font-extrabold text-foreground">
                        <Bilingual en="Published results" bn="প্রকাশিত ফলাফল" />
                    </h2>
                    <select
                        aria-label="Filter by class"
                        value={filterClass}
                        onChange={(event) => setFilterClass(event.target.value)}
                        className="h-11 rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground"
                    >
                        <option value="all">
                            {isBangla ? 'সকল শ্রেণি' : 'All classes'}
                        </option>
                        {CLASSES.map((className) => (
                            <option key={className} value={className}>
                                {classLabel(className, isBangla)}
                            </option>
                        ))}
                    </select>
                </div>

                {visible.length === 0 ? (
                    <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/40 px-6 py-16 text-center">
                        <FileText className="mx-auto size-10 text-muted-foreground" />
                        <p className="mt-3 font-semibold text-muted-foreground">
                            <Bilingual
                                en="No results published yet."
                                bn="এখনও কোনো ফলাফল প্রকাশিত হয়নি।"
                            />
                        </p>
                    </div>
                ) : (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {visible.map((result) => (
                            <article
                                key={result.id}
                                className="flex flex-col rounded-lg border border-border bg-card p-5 shadow-sm"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand-red/10 text-brand-red">
                                        <FileText className="size-5" />
                                    </span>
                                    <div className="min-w-0">
                                        <h3
                                            className="truncate font-bold text-foreground"
                                            title={result.title}
                                        >
                                            {result.title}
                                        </h3>
                                        <p className="text-sm font-semibold text-primary">
                                            {classLabel(
                                                result.class_name,
                                                isBangla,
                                            )}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {formatDate(
                                                result.created_at,
                                                isBangla,
                                            )}{' '}
                                            · {formatSize(result.file_size)}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <a
                                        href={result.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-3 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                                    >
                                        <Eye className="size-3.5" />
                                        <Bilingual en="View" bn="দেখুন" />
                                    </a>
                                    <a
                                        href={result.url}
                                        download={`${result.title}.pdf`}
                                        className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 text-xs font-bold text-foreground hover:bg-accent"
                                    >
                                        <Download className="size-3.5" />
                                        <Bilingual en="Download" bn="ডাউনলোড" />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
