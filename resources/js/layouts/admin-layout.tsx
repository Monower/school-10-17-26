import { Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    ClipboardList,
    ExternalLink,
    FileText,
    GraduationCap,
    Image as ImageIcon,
    LayoutDashboard,
    LogOut,
    Megaphone,
    Menu,
    ShieldCheck,
    X,
    type LucideIcon,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { home, logout } from '@/routes';
import { index as dashboard } from '@/routes/admin';
import { index as announcementsIndex } from '@/routes/admin/announcements';
import { index as applicationsIndex } from '@/routes/admin/applications';
import { index as galleryIndex } from '@/routes/admin/gallery';
import { index as noticesIndex } from '@/routes/admin/notices';
import { index as resultsIndex } from '@/routes/admin/results';
import { index as scholarshipsIndex } from '@/routes/admin/scholarships';
import { cn } from '@/lib/utils';
import type { Auth } from '@/types';

type AdminNavItem = {
    label: string;
    href: string;
    icon: LucideIcon;
};

const navigation: AdminNavItem[] = [
    { label: 'Dashboard', href: dashboard.url(), icon: LayoutDashboard },
    { label: 'Notices', href: noticesIndex.url(), icon: Bell },
    {
        label: 'Scholarships',
        href: scholarshipsIndex.url(),
        icon: GraduationCap,
    },
    {
        label: 'Announcement bar',
        href: announcementsIndex.url(),
        icon: Megaphone,
    },
    { label: 'Gallery', href: galleryIndex.url(), icon: ImageIcon },
    { label: 'Results', href: resultsIndex.url(), icon: FileText },
    {
        label: 'Applications',
        href: applicationsIndex.url(),
        icon: ClipboardList,
    },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isCurrentUrl } = useCurrentUrl();
    const user = usePage<{ auth: Auth }>().props.auth?.user;

    const currentLabel =
        navigation.find((item) => isCurrentUrl(item.href))?.label ?? 'Admin';

    const signOut = () => {
        router.post(logout.url());
    };

    const nav = (
        <nav className="space-y-1" aria-label="Admin navigation">
            {navigation.map((item) => {
                const active = isCurrentUrl(item.href);
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        prefetch
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                            active
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                        )}
                    >
                        <Icon className="size-4 shrink-0" />
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );

    const sidebarBody = (
        <div className="flex h-full flex-col">
            <div className="border-b border-border px-4 py-4">
                <Link
                    href={dashboard.url()}
                    className="flex items-center gap-3"
                    onClick={() => setMobileOpen(false)}
                >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-red text-white">
                        <ShieldCheck className="size-5" />
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate text-sm font-extrabold">
                            Sunshine Educare
                        </span>
                        <span className="block text-xs font-semibold text-muted-foreground">
                            Admin console
                        </span>
                    </span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">{nav}</div>

            <div className="border-t border-border p-4">
                <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary uppercase">
                        {user?.name?.charAt(0) ?? 'A'}
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">
                            {user?.name}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                            {user?.email}
                        </span>
                    </span>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full"
                    onClick={signOut}
                >
                    <LogOut className="size-4" />
                    Sign out
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-svh bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-card lg:block">
                {sidebarBody}
            </aside>

            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    />
                    <aside className="absolute inset-y-0 left-0 w-72 max-w-[85%] border-r border-border bg-card">
                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Close menu"
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                        >
                            <X className="size-5" />
                        </button>
                        {sidebarBody}
                    </aside>
                </div>
            )}

            <div className="flex min-h-svh flex-col lg:pl-72">
                <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
                    <Button
                        variant="outline"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="size-4" />
                    </Button>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">
                            {currentLabel}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                            Signed in as {user?.email}
                        </p>
                    </div>
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="hidden sm:inline-flex"
                    >
                        <Link href={home()}>
                            <ExternalLink className="size-4" />
                            View site
                        </Link>
                    </Button>
                </header>

                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
