import { Head } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '@/components/site/page-header';
import { Bilingual } from '@/lib/language';
import type { Notice } from '@/types';

export default function NoticePage({ notices }: { notices: Notice[] }) {
    const [tab, setTab] = useState<'recent' | 'all'>('recent');
    const list = tab === 'recent' ? notices.slice(0, 3) : notices;
    const tabClass = (currentTab: string) =>
        `rounded-md px-5 py-2.5 text-sm font-bold ${
            tab === currentTab
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground'
        }`;

    return (
        <>
            <Head title="Notices — Sunshine Educare" />
            <PageHeader
                eyebrowEn="Updates"
                eyebrowBn="আপডেট"
                titleEn="Notices"
                titleBn="নোটিশ"
                introEn="Official academic, admission, and event notices."
                introBn="একাডেমিক, ভর্তি ও অনুষ্ঠানসংক্রান্ত অফিসিয়াল নোটিশ।"
            />
            <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
                <div className="flex gap-2" role="tablist">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === 'recent'}
                        className={tabClass('recent')}
                        onClick={() => setTab('recent')}
                    >
                        <Bilingual en="Recent notices" bn="সাম্প্রতিক নোটিশ" />
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === 'all'}
                        className={tabClass('all')}
                        onClick={() => setTab('all')}
                    >
                        <Bilingual en="All notices" bn="সকল নোটিশ" />
                    </button>
                </div>
                <ul className="mt-6 divide-y divide-border rounded-md border border-border bg-card">
                    {list.length === 0 && (
                        <li className="p-5 text-muted-foreground">
                            <Bilingual
                                en="No notices yet."
                                bn="এখনও কোনো নোটিশ নেই।"
                            />
                        </li>
                    )}
                    {list.map((notice) => (
                        <li
                            key={notice.id}
                            className="flex items-start gap-4 p-5"
                        >
                            <FileText className="mt-0.5 size-5 shrink-0 text-brand-red" />
                            <div className="flex-1">
                                <p className="font-semibold">
                                    <Bilingual
                                        en={notice.title_en}
                                        bn={notice.title_bn}
                                    />
                                </p>
                                {(notice.body_en || notice.body_bn) && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        <Bilingual
                                            en={
                                                notice.body_en ??
                                                notice.body_bn ??
                                                ''
                                            }
                                            bn={
                                                notice.body_bn ??
                                                notice.body_en ??
                                                ''
                                            }
                                        />
                                    </p>
                                )}
                            </div>
                            <time className="text-xs font-bold text-muted-foreground">
                                {notice.notice_date}
                            </time>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
