import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { useEffect, useState } from 'react';
import academicDirector from '@/assets/director-academic.jpg';
import chairman from '@/assets/director-chairman.jpg';
import executiveDirector from '@/assets/director-executive.jpg';
import { Button } from '@/components/ui/button';
import { Bilingual, useLanguage } from '@/lib/language';

const directors = [
    {
        image: chairman,
        nameEn: 'Director’s name',
        nameBn: 'পরিচালকের নাম',
        roleEn: 'Chairman',
        roleBn: 'চেয়ারম্যান',
        speechEn:
            'Education should inspire every learner to think independently, act with integrity, and pursue excellence with confidence.',
        speechBn:
            'শিক্ষা প্রতিটি শিক্ষার্থীকে স্বাধীনভাবে ভাবতে, সততার সঙ্গে চলতে এবং আত্মবিশ্বাসের সঙ্গে উৎকর্ষ অর্জনে অনুপ্রাণিত করবে।',
    },
    {
        image: academicDirector,
        nameEn: 'Director’s name',
        nameBn: 'পরিচালকের নাম',
        roleEn: 'Academic Director',
        roleBn: 'একাডেমিক পরিচালক',
        speechEn:
            'Our goal is to make every lesson meaningful, every question welcome, and every student’s progress visible.',
        speechBn:
            'প্রতিটি পাঠকে অর্থবহ করা, প্রতিটি প্রশ্নকে স্বাগত জানানো এবং প্রত্যেক শিক্ষার্থীর অগ্রগতি দৃশ্যমান করাই আমাদের লক্ষ্য।',
    },
    {
        image: executiveDirector,
        nameEn: 'Director’s name',
        nameBn: 'পরিচালকের নাম',
        roleEn: 'Executive Director',
        roleBn: 'নির্বাহী পরিচালক',
        speechEn:
            'We are committed to creating an institute where care, discipline, and modern learning come together for every child.',
        speechBn:
            'প্রতিটি শিশুর জন্য যত্ন, শৃঙ্খলা ও আধুনিক শিক্ষার সমন্বয়ে একটি প্রতিষ্ঠান গড়ে তুলতে আমরা প্রতিশ্রুতিবদ্ধ।',
    },
];

export function DirectorsCarousel() {
    const [active, setActive] = useState(0);
    const { isBangla } = useLanguage();

    useEffect(() => {
        const id = window.setInterval(
            () => setActive((current) => (current + 1) % directors.length),
            7000,
        );

        return () => window.clearInterval(id);
    }, []);

    const director = directors[active];

    if (!director) {
        return null;
    }

    const previous = () =>
        setActive((active - 1 + directors.length) % directors.length);
    const next = () => setActive((active + 1) % directors.length);

    return (
        <section
            className="bg-secondary py-18 sm:py-24"
            aria-labelledby="directors-heading"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 max-w-2xl">
                    <p className="text-sm font-bold text-brand-red uppercase">
                        <Bilingual en="Leadership" bn="নেতৃত্ব" />
                    </p>
                    <h2
                        id="directors-heading"
                        className="mt-2 text-3xl font-extrabold sm:text-4xl"
                    >
                        <Bilingual
                            en="From our Board of Directors"
                            bn="পরিচালনা পর্ষদের বার্তা"
                        />
                    </h2>
                </div>

                <div className="grid overflow-hidden rounded-md border border-border bg-card lg:grid-cols-[minmax(280px,0.82fr)_1.18fr]">
                    <div className="relative min-h-[390px] bg-muted sm:min-h-[470px]">
                        <img
                            src={director.image}
                            alt={
                                isBangla
                                    ? `${director.roleBn}-এর নমুনা ছবি`
                                    : `Sample portrait for ${director.roleEn}`
                            }
                            width={912}
                            height={1104}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover object-top"
                        />
                        <span className="absolute top-4 left-4 rounded-md bg-background/90 px-3 py-1 text-xs font-bold text-foreground uppercase shadow-sm">
                            <Bilingual en="Sample profile" bn="নমুনা প্রোফাইল" />
                        </span>
                    </div>
                    <div className="flex min-h-[390px] flex-col justify-center p-7 sm:p-10 lg:p-14">
                        <Quote
                            className="size-10 text-sun"
                            aria-hidden="true"
                        />
                        <blockquote className="mt-6 max-w-2xl text-xl leading-9 font-medium text-foreground sm:text-2xl sm:leading-10">
                            “{isBangla ? director.speechBn : director.speechEn}”
                        </blockquote>
                        <div className="mt-8 border-l-4 border-primary pl-4">
                            <p className="text-xl font-extrabold">
                                {isBangla ? director.nameBn : director.nameEn}
                            </p>
                            <p className="mt-1 font-semibold text-primary">
                                {isBangla ? director.roleBn : director.roleEn}
                            </p>
                        </div>
                        <div className="mt-10 flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={previous}
                                aria-label={
                                    isBangla
                                        ? 'আগের পরিচালক'
                                        : 'Previous director'
                                }
                            >
                                <ArrowLeft className="size-4" />
                            </Button>
                            <div
                                className="flex gap-2"
                                aria-label={
                                    isBangla
                                        ? 'পরিচালক নির্বাচন'
                                        : 'Choose director'
                                }
                            >
                                {directors.map((item, index) => (
                                    <button
                                        key={item.roleEn}
                                        type="button"
                                        onClick={() => setActive(index)}
                                        className={`h-2 rounded-full transition-all ${index === active ? 'w-8 bg-primary' : 'w-2 bg-border'}`}
                                        aria-label={`${isBangla ? 'পরিচালক' : 'Director'} ${index + 1}`}
                                        aria-current={
                                            index === active
                                                ? 'true'
                                                : undefined
                                        }
                                    />
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={next}
                                aria-label={
                                    isBangla ? 'পরের পরিচালক' : 'Next director'
                                }
                            >
                                <ArrowRight className="size-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                    <Bilingual
                        en="Sample portraits and text — replace with official director details."
                        bn="নমুনা ছবি ও লেখা — পরিচালকদের অফিসিয়াল তথ্য দিয়ে পরিবর্তন করুন।"
                    />
                </p>
            </div>
        </section>
    );
}
