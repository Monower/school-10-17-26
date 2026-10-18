import { Link, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Globe2,
    LogIn,
    LogOut,
    Mail,
    MapPin,
    Menu,
    Phone,
    ShieldCheck,
    X,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Bilingual, useLanguage } from '@/lib/language';
import { about, gallery, home, login, logout, notice, result } from '@/routes';
import { apply, scholarships } from '@/routes/admission';
import { bhairabBazar, kamalpur } from '@/routes/contacts';
import type { Announcement, Auth } from '@/types';

type NavChild = { href: string; en: string; bn: string };
type NavItem = { href?: string; en: string; bn: string; children?: NavChild[] };

const nav: NavItem[] = [
    { href: home.url(), en: 'Home', bn: 'হোম' },
    { href: about.url(), en: 'About us', bn: 'আমাদের সম্পর্কে' },
    {
        en: 'Admission',
        bn: 'ভর্তি',
        children: [
            { href: apply.url(), en: 'Apply now', bn: 'এখনই আবেদন করুন' },
            { href: scholarships.url(), en: 'Scholarships', bn: 'বৃত্তি' },
        ],
    },
    { href: notice.url(), en: 'Notice', bn: 'নোটিশ' },
    { href: gallery.url(), en: 'Gallery', bn: 'গ্যালারি' },
    { href: result.url(), en: 'Result', bn: 'ফলাফল' },
    {
        en: 'Contacts',
        bn: 'যোগাযোগ',
        children: [
            {
                href: bhairabBazar.url(),
                en: 'Bhairab Bazar Branch',
                bn: 'ভৈরব বাজার শাখা',
            },
            { href: kamalpur.url(), en: 'Kamalpur Branch', bn: 'কমলপুর শাখা' },
        ],
    },
];

export default function PublicLayout({ children }: { children: ReactNode }) {
    const { language, setLanguage, isBangla } = useLanguage();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { url, props } = usePage<{
        announcements: Announcement[];
        auth: Auth;
    }>();
    const pathname = url.split('?')[0];
    const announcements = props.announcements ?? [];
    const user = props.auth?.user;

    const label = (en: string, bn: string): string => (isBangla ? bn : en);

    const tickerEn = announcements.length
        ? announcements
              .map((announcement) => announcement.text_en)
              .join('   •   ')
        : 'Welcome to Sunshine Educare — The Toppers’ Choice.';
    const tickerBn = announcements.length
        ? announcements
              .map((announcement) => announcement.text_bn)
              .join('   •   ')
        : 'সানশাইন এডুকেয়ারে স্বাগতম — দ্য টপার্স চয়েস।';

    return (
        <div className={isBangla ? 'font-bangla' : 'font-barlow'}>
            <header className="relative z-40 bg-background">
                <div className="border-b border-border bg-primary text-primary-foreground">
                    <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
                        <div className="hidden items-center gap-5 sm:flex">
                            <span className="flex items-center gap-1.5">
                                <Phone className="size-3.5" />
                                <Bilingual
                                    en="Contact details coming soon"
                                    bn="যোগাযোগের তথ্য শীঘ্রই আসছে"
                                />
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Mail className="size-3.5" />
                                info@sunshineeducare.edu.bd
                            </span>
                        </div>
                        <div className="ml-auto flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <Globe2 className="size-3.5" />
                                <button
                                    type="button"
                                    onClick={() => setLanguage('en')}
                                    className={
                                        language === 'en'
                                            ? 'font-bold text-sun'
                                            : 'opacity-75'
                                    }
                                >
                                    EN
                                </button>
                                <span className="opacity-40">|</span>
                                <button
                                    type="button"
                                    onClick={() => setLanguage('bn')}
                                    className={
                                        language === 'bn'
                                            ? 'font-bold text-sun'
                                            : 'opacity-75'
                                    }
                                >
                                    বাংলা
                                </button>
                            </div>
                            {user ? (
                                <div className="flex items-center gap-2">
                                    {user.is_admin && (
                                        <Button
                                            asChild
                                            variant="gold"
                                            size="sm"
                                        >
                                            <Link href="/admin">
                                                <ShieldCheck className="size-4" />
                                                <Bilingual
                                                    en="Admin portal"
                                                    bn="অ্যাডমিন পোর্টাল"
                                                />
                                            </Link>
                                        </Button>
                                    )}
                                    <Link
                                        href={logout()}
                                        method="post"
                                        as="button"
                                        className="flex items-center gap-1.5 text-xs font-bold opacity-90 hover:opacity-100"
                                    >
                                        <LogOut className="size-3.5" />
                                        <Bilingual en="Log out" bn="লগ আউট" />
                                    </Link>
                                </div>
                            ) : (
                                <Button asChild variant="gold" size="sm">
                                    <Link href={login()}>
                                        <LogIn className="size-4" />
                                        <Bilingual en="Log in" bn="লগ ইন" />
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link
                        href={home()}
                        className="flex min-w-0 items-center gap-3"
                    >
                        <div className="min-w-0">
                            <span className="block text-xl font-extrabold text-brand-red sm:text-2xl">
                                Sunshine Educare
                            </span>
                            <span className="block text-xs font-bold text-success uppercase sm:text-sm">
                                The Toppers’ Choice
                            </span>
                        </div>
                    </Link>

                    <nav
                        className="hidden items-center gap-1 lg:flex"
                        aria-label="Main navigation"
                    >
                        {nav.map((item) =>
                            item.children ? (
                                <div className="group relative" key={item.en}>
                                    <button
                                        type="button"
                                        className="flex h-11 items-center gap-1 rounded-md px-4 font-semibold text-foreground hover:bg-accent hover:text-primary"
                                    >
                                        {label(item.en, item.bn)}
                                        <ChevronDown className="size-4" />
                                    </button>
                                    <div className="invisible absolute top-full right-0 z-50 w-56 translate-y-1 rounded-md border border-border bg-popover p-2 opacity-0 shadow-lg transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="block rounded px-3 py-2.5 text-sm font-semibold text-popover-foreground hover:bg-accent hover:text-primary"
                                            >
                                                {label(child.en, child.bn)}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : item.href ? (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`rounded-md px-4 py-3 font-semibold transition-colors hover:bg-accent hover:text-primary ${
                                        pathname === item.href
                                            ? 'text-primary'
                                            : 'text-foreground'
                                    }`}
                                >
                                    {label(item.en, item.bn)}
                                </Link>
                            ) : null,
                        )}
                    </nav>

                    <Button
                        variant="outline"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X /> : <Menu />}
                    </Button>
                </div>

                {mobileOpen && (
                    <nav className="border-t border-border bg-background px-4 py-4 lg:hidden">
                        {nav.map((item) =>
                            item.children ? (
                                <div key={item.en} className="py-2">
                                    <p className="px-3 py-2 font-bold text-primary">
                                        {label(item.en, item.bn)}
                                    </p>
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="block px-6 py-2 text-sm text-foreground"
                                        >
                                            {label(child.en, child.bn)}
                                        </Link>
                                    ))}
                                </div>
                            ) : item.href ? (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-3 py-3 font-semibold text-foreground"
                                >
                                    {label(item.en, item.bn)}
                                </Link>
                            ) : null,
                        )}
                    </nav>
                )}

                <div className="relative z-0 flex h-11 overflow-hidden bg-announcement text-announcement-foreground">
                    <div className="z-10 flex shrink-0 items-center bg-brand-red px-4 text-sm font-bold text-white sm:px-8">
                        <Bilingual en="Announcement" bn="ঘোষণা" />
                    </div>
                    <div className="relative flex flex-1 items-center overflow-hidden">
                        <p className="announcement-scroll font-semibold whitespace-nowrap">
                            <Bilingual en={tickerEn} bn={tickerBn} />
                        </p>
                    </div>
                </div>
            </header>

            <main>{children}</main>

            <footer className="bg-primary text-primary-foreground">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <div className="flex items-center gap-3">
                            <div>
                                <p className="text-xl font-extrabold">
                                    Sunshine Educare
                                </p>
                                <p className="text-sm text-sun">
                                    The Toppers’ Choice
                                </p>
                            </div>
                        </div>
                        <p className="mt-4 max-w-sm text-sm leading-6 text-primary-foreground/75">
                            <Bilingual
                                en="A focused learning community helping students grow with knowledge, discipline, and confidence."
                                bn="জ্ঞান, শৃঙ্খলা ও আত্মবিশ্বাসে শিক্ষার্থীদের বিকশিত করার এক নিবেদিত শিক্ষাঙ্গন।"
                            />
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-sun">
                            <Bilingual en="Quick links" bn="প্রয়োজনীয় লিংক" />
                        </h2>
                        <div className="mt-4 grid gap-2 text-sm">
                            <Link href={about()}>
                                <Bilingual en="About us" bn="আমাদের সম্পর্কে" />
                            </Link>
                            <Link href={apply()}>
                                <Bilingual en="Apply now" bn="এখনই আবেদন করুন" />
                            </Link>
                            <Link href={notice()}>
                                <Bilingual en="Notices" bn="নোটিশ" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold text-sun">
                            <Bilingual en="Our branches" bn="আমাদের শাখা" />
                        </h2>
                        <div className="mt-4 space-y-3 text-sm">
                            <Link href={bhairabBazar()} className="flex gap-2">
                                <MapPin className="mt-0.5 size-4 shrink-0" />
                                <Bilingual
                                    en="Bhairab Bazar, Kishoreganj"
                                    bn="ভৈরব বাজার, কিশোরগঞ্জ"
                                />
                            </Link>
                            <Link href={kamalpur()} className="flex gap-2">
                                <MapPin className="mt-0.5 size-4 shrink-0" />
                                <Bilingual en="Kamalpur Branch" bn="কমলপুর শাখা" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-t border-primary-foreground/15 px-4 py-5 text-center text-xs text-primary-foreground/65">
                    © 2026 Sunshine Educare.{' '}
                    <Bilingual
                        en="All rights reserved."
                        bn="সর্বস্বত্ব সংরক্ষিত।"
                    />
                </div>
            </footer>
        </div>
    );
}
