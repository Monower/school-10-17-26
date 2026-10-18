import { Head, router, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import {
    AnnouncementsAdmin,
    ApplicationsAdmin,
    GalleryAdmin,
    NoticesAdmin,
    ResultsAdmin,
    ScholarshipsAdmin,
} from '@/components/site/admin-panels';
import { Button } from '@/components/ui/button';
import { logout } from '@/routes';
import type {
    Announcement,
    Application,
    Auth,
    GalleryPhoto,
    Notice,
    ResultItem,
    Scholarship,
    SitePageProps,
} from '@/types';

type AdminProps = {
    results: ResultItem[];
    photos: GalleryPhoto[];
    notices: Notice[];
    scholarships: Scholarship[];
    announcements: Announcement[];
    applications: Application[];
};

type TabId =
    | 'results'
    | 'notices'
    | 'gallery'
    | 'scholarships'
    | 'announcements'
    | 'applications';

const tabs: { id: TabId; label: string }[] = [
    { id: 'results', label: 'Results' },
    { id: 'notices', label: 'Notices' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'announcements', label: 'Announcement bar' },
    { id: 'applications', label: 'Applications' },
];

export default function AdminIndex({
    results,
    photos,
    notices,
    scholarships,
    announcements,
    applications,
}: AdminProps) {
    const [tab, setTab] = useState<TabId>('results');
    const { auth } = usePage<SitePageProps & { auth: Auth }>().props;

    const signOut = () => {
        router.post(logout.url());
    };

    return (
        <>
            <Head title="Admin Portal — Sunshine Educare" />
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold">
                            Admin portal
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Signed in as {auth?.user?.email}
                        </p>
                    </div>
                    <Button variant="outline" onClick={signOut}>
                        <LogOut className="size-4" />
                        Sign out
                    </Button>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                    {tabs.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setTab(item.id)}
                            className={`rounded-md px-4 py-2 text-sm font-bold ${
                                tab === item.id
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary text-foreground'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
                <div className="mt-6">
                    {tab === 'results' && <ResultsAdmin results={results} />}
                    {tab === 'notices' && <NoticesAdmin notices={notices} />}
                    {tab === 'gallery' && <GalleryAdmin photos={photos} />}
                    {tab === 'scholarships' && (
                        <ScholarshipsAdmin scholarships={scholarships} />
                    )}
                    {tab === 'announcements' && (
                        <AnnouncementsAdmin announcements={announcements} />
                    )}
                    {tab === 'applications' && (
                        <ApplicationsAdmin applications={applications} />
                    )}
                </div>
            </section>
        </>
    );
}
