import { Head, Link } from '@inertiajs/react';
import {
    Bell,
    ClipboardList,
    FileText,
    GraduationCap,
    Image as ImageIcon,
    Megaphone,
    type LucideIcon,
} from 'lucide-react';
import { EmptyState } from '@/components/admin/empty-state';
import { PageHeader } from '@/components/admin/page-header';
import { index as announcementsIndex } from '@/routes/admin/announcements';
import { index as applicationsIndex } from '@/routes/admin/applications';
import { index as galleryIndex } from '@/routes/admin/gallery';
import { index as noticesIndex } from '@/routes/admin/notices';
import { index as resultsIndex } from '@/routes/admin/results';
import { index as scholarshipsIndex } from '@/routes/admin/scholarships';
import type { AdminStats, Application, Notice } from '@/types';

type DashboardProps = {
    stats: AdminStats;
    recentApplications: Application[];
    recentNotices: Notice[];
};

function StatCard({
    label,
    value,
    icon: Icon,
    href,
    hint,
}: {
    label: string;
    value: number;
    icon: LucideIcon;
    href: string;
    hint?: string;
}) {
    return (
        <Link
            href={href}
            className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
        >
            <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-muted-foreground">
                    {label}
                </span>
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                </span>
            </div>
            <p className="mt-3 text-3xl font-extrabold tracking-tight">
                {value}
            </p>
            {hint && (
                <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
            )}
        </Link>
    );
}

const dateLabel = (value: string): string =>
    new Date(value).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

export default function AdminDashboard({
    stats,
    recentApplications,
    recentNotices,
}: DashboardProps) {
    const cards = [
        {
            label: 'Notices',
            value: stats.notices,
            icon: Bell,
            href: noticesIndex.url(),
        },
        {
            label: 'Announcements',
            value: stats.announcements,
            icon: Megaphone,
            href: announcementsIndex.url(),
            hint: `${stats.activeAnnouncements} active in the ticker`,
        },
        {
            label: 'Scholarships',
            value: stats.scholarships,
            icon: GraduationCap,
            href: scholarshipsIndex.url(),
        },
        {
            label: 'Gallery photos',
            value: stats.photos,
            icon: ImageIcon,
            href: galleryIndex.url(),
        },
        {
            label: 'Result files',
            value: stats.results,
            icon: FileText,
            href: resultsIndex.url(),
        },
        {
            label: 'Applications',
            value: stats.applications,
            icon: ClipboardList,
            href: applicationsIndex.url(),
        },
    ];

    return (
        <>
            <Head title="Admin dashboard" />
            <div className="space-y-8">
                <PageHeader
                    title="Dashboard"
                    description="Overview of everything published on the Sunshine Educare website."
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {cards.map((card) => (
                        <StatCard key={card.label} {...card} />
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <section className="rounded-xl border border-border bg-card shadow-sm">
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                            <h2 className="font-bold">Recent applications</h2>
                            <Link
                                href={applicationsIndex.url()}
                                className="text-xs font-semibold text-primary hover:underline"
                            >
                                View all
                            </Link>
                        </div>
                        {recentApplications.length === 0 ? (
                            <div className="p-5">
                                <EmptyState
                                    icon={ClipboardList}
                                    title="No applications yet"
                                    description="Admission applications submitted from the website will appear here."
                                />
                            </div>
                        ) : (
                            <ul className="divide-y divide-border">
                                {recentApplications.map((application) => (
                                    <li
                                        key={application.id}
                                        className="flex items-center gap-3 px-5 py-3"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold">
                                                {application.student_name}
                                            </p>
                                            <p className="truncate text-xs text-muted-foreground">
                                                {application.class_name} ·{' '}
                                                {application.branch}
                                            </p>
                                        </div>
                                        <time className="text-xs text-muted-foreground">
                                            {dateLabel(application.created_at)}
                                        </time>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    <section className="rounded-xl border border-border bg-card shadow-sm">
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                            <h2 className="font-bold">Latest notices</h2>
                            <Link
                                href={noticesIndex.url()}
                                className="text-xs font-semibold text-primary hover:underline"
                            >
                                View all
                            </Link>
                        </div>
                        {recentNotices.length === 0 ? (
                            <div className="p-5">
                                <EmptyState
                                    icon={Bell}
                                    title="No notices yet"
                                    description="Notices you publish will show up here and on the website."
                                />
                            </div>
                        ) : (
                            <ul className="divide-y divide-border">
                                {recentNotices.map((notice) => (
                                    <li
                                        key={notice.id}
                                        className="flex items-center gap-3 px-5 py-3"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold">
                                                {notice.title_en}
                                            </p>
                                            <p className="truncate text-xs text-muted-foreground">
                                                {notice.title_bn}
                                            </p>
                                        </div>
                                        <time className="text-xs text-muted-foreground">
                                            {dateLabel(notice.notice_date)}
                                        </time>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
}
