import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bilingual, useLanguage } from '@/lib/language';
import type { LeadershipMember } from '@/types';

export function DirectorsCarousel({
    leaders,
}: {
    leaders: LeadershipMember[];
}) {
    const [active, setActive] = useState(0);
    const { isBangla } = useLanguage();

    const count = leaders.length;
    const activeIndex = count > 0 ? active % count : 0;
    const member = leaders[activeIndex];

    useEffect(() => {
        if (count < 2) {
            return;
        }

        const id = window.setInterval(
            () => setActive((current) => (current + 1) % count),
            7000,
        );

        return () => window.clearInterval(id);
    }, [count]);

    if (!member) {
        return null;
    }

    const previous = () => setActive((activeIndex - 1 + count) % count);
    const next = () => setActive((activeIndex + 1) % count);

    const name = isBangla ? member.name_bn : member.name_en;
    const role = isBangla ? member.role_bn : member.role_en;
    const message = isBangla ? member.message_bn : member.message_en;

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
                            src={member.image_url}
                            alt={`${name} — ${role}`}
                            width={912}
                            height={1104}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover object-top"
                        />
                    </div>
                    <div className="flex min-h-[390px] flex-col justify-center p-7 sm:p-10 lg:p-14">
                        {message && (
                            <>
                                <Quote
                                    className="size-10 text-sun"
                                    aria-hidden="true"
                                />
                                <blockquote className="mt-6 max-w-2xl text-xl leading-9 font-medium text-foreground sm:text-2xl sm:leading-10">
                                    “{message}”
                                </blockquote>
                            </>
                        )}
                        <div className="mt-8 border-l-4 border-primary pl-4">
                            <p className="text-xl font-extrabold">{name}</p>
                            <p className="mt-1 font-semibold text-primary">
                                {role}
                            </p>
                        </div>
                        {count > 1 && (
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
                                    {leaders.map((leader, index) => (
                                        <button
                                            key={leader.id}
                                            type="button"
                                            onClick={() => setActive(index)}
                                            className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-border'}`}
                                            aria-label={`${isBangla ? 'পরিচালক' : 'Director'} ${index + 1}`}
                                            aria-current={
                                                index === activeIndex
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
                                        isBangla
                                            ? 'পরের পরিচালক'
                                            : 'Next director'
                                    }
                                >
                                    <ArrowRight className="size-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
