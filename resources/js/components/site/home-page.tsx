import { Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Award,
    BookOpen,
    CalendarDays,
    ChevronRight,
    GraduationCap,
    MapPin,
    Microscope,
    ShieldCheck,
    Sparkles,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import achievers from '@/assets/sunshine-achievers.jpg';
import classroom from '@/assets/sunshine-classroom.jpg';
import science from '@/assets/sunshine-science.jpg';
import { DirectorsCarousel } from '@/components/site/directors-carousel';
import { PhotoGallery } from '@/components/site/photo-gallery';
import { Button } from '@/components/ui/button';
import { Bilingual, useLanguage } from '@/lib/language';
import { about, notice } from '@/routes';
import { apply, scholarships } from '@/routes/admission';
import { bhairabBazar, kamalpur } from '@/routes/contacts';
import type { GalleryPhoto, Notice } from '@/types';

const slides = [
    {
        image: classroom,
        kickerEn: 'Welcome to Sunshine Educare',
        kickerBn: 'সানশাইন এডুকেয়ারে স্বাগতম',
        titleEn: 'The Toppers’ Choice',
        titleBn: 'মেধাবীদের প্রথম পছন্দ',
        bodyEn: 'Focused guidance, caring mentors, and a learning environment built for ambitious students.',
        bodyBn: 'লক্ষ্যভিত্তিক নির্দেশনা, যত্নশীল শিক্ষক এবং স্বপ্নবান শিক্ষার্থীদের জন্য অনুপ্রেরণামূলক পরিবেশ।',
    },
    {
        image: achievers,
        kickerEn: 'Dream. Learn. Achieve.',
        kickerBn: 'স্বপ্ন দেখো। শেখো। জয় করো।',
        titleEn: 'Confidence for every milestone',
        titleBn: 'প্রতিটি অর্জনে আত্মবিশ্বাস',
        bodyEn: 'We help learners strengthen foundations and move forward with purpose.',
        bodyBn: 'মজবুত ভিত্তি তৈরি করে শিক্ষার্থীদের লক্ষ্যপূরণে এগিয়ে নিয়ে যাই।',
    },
    {
        image: science,
        kickerEn: 'Learning beyond textbooks',
        kickerBn: 'বইয়ের বাইরেও শিক্ষা',
        titleEn: 'Curiosity becomes capability',
        titleBn: 'কৌতূহল থেকে দক্ষতা',
        bodyEn: 'Engaging lessons connect concepts with the skills students need for tomorrow.',
        bodyBn: 'আনন্দময় পাঠে জ্ঞানের সঙ্গে ভবিষ্যতের প্রয়োজনীয় দক্ষতার সংযোগ।',
    },
];

const strengths = [
    {
        icon: Users,
        en: 'Dedicated mentors',
        bn: 'নিবেদিত শিক্ষক',
        descEn: 'Attentive guidance for every learner.',
        descBn: 'প্রতিটি শিক্ষার্থীর প্রতি যত্নশীল দিকনির্দেশনা।',
    },
    {
        icon: BookOpen,
        en: 'Strong foundations',
        bn: 'মজবুত ভিত্তি',
        descEn: 'Clear concepts, practice, and feedback.',
        descBn: 'স্পষ্ট ধারণা, অনুশীলন ও নিয়মিত মূল্যায়ন।',
    },
    {
        icon: Microscope,
        en: 'Active learning',
        bn: 'সক্রিয় শিক্ষা',
        descEn: 'Lessons that make knowledge meaningful.',
        descBn: 'জ্ঞানকে অর্থবহ করে এমন প্রাণবন্ত পাঠ।',
    },
    {
        icon: ShieldCheck,
        en: 'Caring environment',
        bn: 'নিরাপদ পরিবেশ',
        descEn: 'A respectful space to learn and grow.',
        descBn: 'শেখা ও বিকাশের জন্য সম্মানজনক পরিবেশ।',
    },
];

const admissionCards = [
    {
        icon: GraduationCap,
        href: () => apply(),
        en: 'Apply now',
        bn: 'এখনই আবেদন করুন',
        dEn: 'Start with a clear, guided application process.',
        dBn: 'সহজ ও সুস্পষ্ট প্রক্রিয়ায় আবেদন শুরু করুন।',
    },
    {
        icon: CalendarDays,
        href: () => notice(),
        en: 'Notices',
        bn: 'নোটিশ',
        dEn: 'Stay up to date with admission notices.',
        dBn: 'ভর্তি সংক্রান্ত নোটিশ দেখুন।',
    },
    {
        icon: Award,
        href: () => scholarships(),
        en: 'Scholarships',
        bn: 'বৃত্তি',
        dEn: 'Explore support for promising students.',
        dBn: 'মেধাবী শিক্ষার্থীদের সহায়তার সুযোগ জানুন।',
    },
];

export function HomePage({
    notices,
    photos,
}: {
    notices: Notice[];
    photos: GalleryPhoto[];
}) {
    const [slide, setSlide] = useState(0);
    const { isBangla } = useLanguage();

    useEffect(() => {
        const id = window.setInterval(
            () => setSlide((value) => (value + 1) % slides.length),
            6500,
        );

        return () => window.clearInterval(id);
    }, []);

    const current = slides[slide] ?? slides[0];

    if (!current) {
        return null;
    }

    return (
        <>
            <section className="relative min-h-[620px] overflow-hidden bg-primary text-primary-foreground sm:min-h-[650px]">
                {slides.map((item, index) => (
                    <img
                        key={item.image}
                        src={item.image}
                        alt="Students learning at Sunshine Educare"
                        width={1536}
                        height={864}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === slide ? 'opacity-100' : 'opacity-0'}`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                    />
                ))}
                <div className="bg-hero-overlay absolute inset-0" />
                <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-16 sm:min-h-[650px] sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="mb-5 flex items-center gap-2 text-sm font-bold text-sun uppercase">
                            <Sparkles className="size-4" />
                            {isBangla ? current.kickerBn : current.kickerEn}
                        </p>
                        <h1 className="text-5xl leading-tight font-extrabold sm:text-6xl lg:text-7xl">
                            {isBangla ? current.titleBn : current.titleEn}
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/85 sm:text-xl">
                            {isBangla ? current.bodyBn : current.bodyEn}
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <Button asChild variant="gold" size="lg">
                                <Link href={apply()}>
                                    <Bilingual
                                        en="Apply now"
                                        bn="এখনই আবেদন করুন"
                                    />
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                className="border border-primary-foreground/40 bg-primary-foreground/10 hover:bg-primary-foreground/20"
                            >
                                <Link href={about()}>
                                    <Bilingual
                                        en="Discover our approach"
                                        bn="আমাদের সম্পর্কে জানুন"
                                    />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        className="border-primary-foreground/40 bg-primary/30 text-primary-foreground hover:bg-primary"
                        onClick={() =>
                            setSlide(
                                (slide - 1 + slides.length) % slides.length,
                            )
                        }
                        aria-label="Previous slide"
                    >
                        <ArrowLeft className="size-4" />
                    </Button>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setSlide(index)}
                            className={`h-2 rounded-full transition-all ${index === slide ? 'w-8 bg-sun' : 'w-2 bg-primary-foreground/60'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                    <Button
                        variant="outline"
                        size="icon"
                        className="border-primary-foreground/40 bg-primary/30 text-primary-foreground hover:bg-primary"
                        onClick={() => setSlide((slide + 1) % slides.length)}
                        aria-label="Next slide"
                    >
                        <ArrowRight className="size-4" />
                    </Button>
                </div>
            </section>

            <DirectorsCarousel />

            <section className="bg-background py-18 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-bold text-brand-red uppercase">
                            <Bilingual
                                en="Why Sunshine Educare"
                                bn="কেন সানশাইন এডুকেয়ার"
                            />
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
                            <Bilingual
                                en="Where effort meets opportunity"
                                bn="প্রচেষ্টা যেখানে সম্ভাবনার সঙ্গে মেলে"
                            />
                        </h2>
                        <p className="mt-4 leading-7 text-muted-foreground">
                            <Bilingual
                                en="A thoughtful academic experience designed to help students understand deeply, practise consistently, and progress confidently."
                                bn="গভীরভাবে বোঝা, নিয়মিত অনুশীলন এবং আত্মবিশ্বাসের সঙ্গে এগিয়ে যাওয়ার জন্য পরিকল্পিত শিক্ষাযাত্রা।"
                            />
                        </p>
                    </div>
                    <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
                        {strengths.map((strength) => (
                            <div key={strength.en} className="bg-card p-7">
                                <strength.icon className="size-8 text-primary" />
                                <h3 className="mt-5 text-xl font-bold">
                                    <Bilingual
                                        en={strength.en}
                                        bn={strength.bn}
                                    />
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    <Bilingual
                                        en={strength.descEn}
                                        bn={strength.descBn}
                                    />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-secondary py-18 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-bold text-brand-red uppercase">
                                <Bilingual en="Admissions" bn="ভর্তি" />
                            </p>
                            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                                <Bilingual
                                    en="Begin your Sunshine journey"
                                    bn="সানশাইনে শুরু হোক নতুন যাত্রা"
                                />
                            </h2>
                        </div>
                        <Button asChild variant="outline">
                            <Link href={apply()}>
                                <Bilingual
                                    en="Admission details"
                                    bn="ভর্তির বিস্তারিত"
                                />
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {admissionCards.map((card) => (
                            <Link
                                key={card.en}
                                href={card.href()}
                                className="group rounded-md border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                            >
                                <card.icon className="size-9 text-primary" />
                                <h3 className="mt-6 flex items-center justify-between text-xl font-bold">
                                    <Bilingual en={card.en} bn={card.bn} />
                                    <ChevronRight className="size-5 transition group-hover:translate-x-1" />
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    <Bilingual en={card.dEn} bn={card.dBn} />
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-18 sm:py-24">
                <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
                    <div>
                        <p className="text-sm font-bold text-brand-red uppercase">
                            <Bilingual en="Latest updates" bn="সর্বশেষ আপডেট" />
                        </p>
                        <h2 className="mt-2 text-3xl font-extrabold">
                            <Bilingual
                                en="Notices & announcements"
                                bn="নোটিশ ও ঘোষণা"
                            />
                        </h2>
                        <div className="mt-8 divide-y divide-border border-y border-border">
                            {notices.length === 0 ? (
                                <p className="py-8 text-sm text-muted-foreground">
                                    <Bilingual
                                        en="No notices published yet."
                                        bn="এখনও কোনো নোটিশ প্রকাশিত হয়নি।"
                                    />
                                </p>
                            ) : (
                                notices.map((noticeItem) => {
                                    const publishedAt = new Date(
                                        noticeItem.notice_date,
                                    );

                                    return (
                                        <Link
                                            key={noticeItem.id}
                                            href={notice()}
                                            className="group flex gap-5 py-5"
                                        >
                                            <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md bg-primary text-primary-foreground">
                                                <span className="text-lg font-extrabold">
                                                    {publishedAt.getDate()}
                                                </span>
                                                <span className="text-[10px] uppercase">
                                                    {publishedAt.toLocaleDateString(
                                                        'en-GB',
                                                        { month: 'short' },
                                                    )}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-success uppercase">
                                                    <Bilingual
                                                        en="General notice"
                                                        bn="সাধারণ নোটিশ"
                                                    />
                                                </span>
                                                <h3 className="mt-1 font-bold group-hover:text-primary">
                                                    <Bilingual
                                                        en={noticeItem.title_en}
                                                        bn={noticeItem.title_bn}
                                                    />
                                                </h3>
                                                {(noticeItem.body_en ||
                                                    noticeItem.body_bn) && (
                                                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                                        <Bilingual
                                                            en={
                                                                noticeItem.body_en ??
                                                                noticeItem.body_bn ??
                                                                ''
                                                            }
                                                            bn={
                                                                noticeItem.body_bn ??
                                                                noticeItem.body_en ??
                                                                ''
                                                            }
                                                        />
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })
                            )}
                        </div>
                    </div>
                    <div className="rounded-md bg-primary p-8 text-primary-foreground sm:p-10">
                        <MapPin className="size-9 text-sun" />
                        <p className="mt-6 text-sm font-bold text-sun uppercase">
                            <Bilingual
                                en="Two convenient branches"
                                bn="দুটি সুবিধাজনক শাখা"
                            />
                        </p>
                        <h2 className="mt-2 text-3xl font-extrabold">
                            <Bilingual
                                en="Learn closer to home"
                                bn="ঘরের কাছেই মানসম্মত শিক্ষা"
                            />
                        </h2>
                        <p className="mt-4 leading-7 text-primary-foreground/75">
                            <Bilingual
                                en="Visit our Bhairab Bazar or Kamalpur branch. Exact addresses and office hours will be confirmed soon."
                                bn="ভৈরব বাজার অথবা কমলপুর শাখায় আসুন। সঠিক ঠিকানা ও অফিস সময় শীঘ্রই নিশ্চিত করা হবে।"
                            />
                        </p>
                        <div className="mt-7 grid gap-3">
                            <Button asChild variant="gold">
                                <Link href={bhairabBazar()}>
                                    <Bilingual
                                        en="Bhairab Bazar Branch"
                                        bn="ভৈরব বাজার শাখা"
                                    />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                className="border border-primary-foreground/30 bg-primary-foreground/10 hover:bg-primary-foreground/20"
                            >
                                <Link href={kamalpur()}>
                                    <Bilingual
                                        en="Kamalpur Branch"
                                        bn="কমলপুর শাখা"
                                    />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <PhotoGallery photos={photos} />
        </>
    );
}
