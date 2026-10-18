import { ArrowLeft, ArrowRight, Images, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import achievers from '@/assets/sunshine-achievers.jpg';
import classroom from '@/assets/sunshine-classroom.jpg';
import science from '@/assets/sunshine-science.jpg';
import { Button } from '@/components/ui/button';
import { Bilingual, useLanguage } from '@/lib/language';

const photos = [
    { image: classroom, en: 'Learning together', bn: 'একসঙ্গে শেখা' },
    { image: achievers, en: 'Celebrating achievement', bn: 'সাফল্য উদযাপন' },
    {
        image: science,
        en: 'Exploring through science',
        bn: 'বিজ্ঞানের মাধ্যমে অনুসন্ধান',
    },
];

export function PhotoGallery() {
    const [selected, setSelected] = useState<number | null>(null);
    const { isBangla } = useLanguage();

    useEffect(() => {
        if (selected === null) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelected(null);
            }

            if (event.key === 'ArrowLeft') {
                setSelected((selected - 1 + photos.length) % photos.length);
            }

            if (event.key === 'ArrowRight') {
                setSelected((selected + 1) % photos.length);
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [selected]);

    const photo = selected === null ? undefined : photos[selected];

    const showPrevious = () =>
        setSelected((current) =>
            current === null
                ? 0
                : (current - 1 + photos.length) % photos.length,
        );
    const showNext = () =>
        setSelected((current) =>
            current === null ? 0 : (current + 1) % photos.length,
        );

    return (
        <section
            className="bg-secondary py-18 sm:py-24"
            aria-labelledby="gallery-heading"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div className="max-w-2xl">
                        <p className="flex items-center gap-2 text-sm font-bold text-brand-red uppercase">
                            <Images className="size-4" />
                            <Bilingual en="Photo gallery" bn="ফটো গ্যালারি" />
                        </p>
                        <h2
                            id="gallery-heading"
                            className="mt-2 text-3xl font-extrabold sm:text-4xl"
                        >
                            <Bilingual
                                en="Life at Sunshine Educare"
                                bn="সানশাইন এডুকেয়ারের জীবন"
                            />
                        </h2>
                        <p className="mt-3 leading-7 text-muted-foreground">
                            <Bilingual
                                en="A glimpse of learning, discovery, and shared success across our institute."
                                bn="আমাদের প্রতিষ্ঠানের শিক্ষা, অনুসন্ধান ও সম্মিলিত সাফল্যের কিছু মুহূর্ত।"
                            />
                        </p>
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">
                        <Bilingual
                            en="Select a photo to view"
                            bn="বড় করে দেখতে ছবি নির্বাচন করুন"
                        />
                    </p>
                </div>

                <div className="mt-10 grid auto-rows-[230px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {photos.map((item, index) => (
                        <button
                            key={item.en}
                            type="button"
                            onClick={() => setSelected(index)}
                            className={`group relative overflow-hidden rounded-md text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${index === 0 ? 'sm:row-span-2 sm:auto-rows-auto' : ''}`}
                            aria-label={`${isBangla ? item.bn : item.en} — ${isBangla ? 'বড় করে দেখুন' : 'view larger'}`}
                        >
                            <img
                                src={item.image}
                                alt={isBangla ? item.bn : item.en}
                                width={1536}
                                height={864}
                                loading="lazy"
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-primary/85 p-5 text-primary-foreground">
                                <p className="font-bold">
                                    {isBangla ? item.bn : item.en}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                    <Bilingual
                        en="Sample gallery — add your institute’s official photos here."
                        bn="নমুনা গ্যালারি — এখানে প্রতিষ্ঠানের অফিসিয়াল ছবি যোগ করুন।"
                    />
                </p>
            </div>

            {photo && selected !== null ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4 sm:p-8"
                    role="dialog"
                    aria-modal="true"
                    aria-label={
                        isBangla ? 'ছবির বড় দৃশ্য' : 'Expanded gallery photo'
                    }
                    onClick={() => setSelected(null)}
                >
                    <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-4 right-4 z-10"
                        onClick={() => setSelected(null)}
                        aria-label={isBangla ? 'বন্ধ করুন' : 'Close gallery'}
                    >
                        <X className="size-5" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-1/2 left-4 z-10 -translate-y-1/2"
                        onClick={(event) => {
                            event.stopPropagation();
                            showPrevious();
                        }}
                        aria-label={isBangla ? 'আগের ছবি' : 'Previous photo'}
                    >
                        <ArrowLeft className="size-5" />
                    </Button>
                    <figure
                        className="max-h-[88vh] max-w-5xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img
                            src={photo.image}
                            alt={isBangla ? photo.bn : photo.en}
                            width={1536}
                            height={864}
                            className="max-h-[78vh] w-auto rounded-md object-contain"
                        />
                        <figcaption className="mt-3 text-center font-bold text-background">
                            {isBangla ? photo.bn : photo.en}
                        </figcaption>
                    </figure>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-1/2 right-4 z-10 -translate-y-1/2"
                        onClick={(event) => {
                            event.stopPropagation();
                            showNext();
                        }}
                        aria-label={isBangla ? 'পরের ছবি' : 'Next photo'}
                    >
                        <ArrowRight className="size-5" />
                    </Button>
                </div>
            ) : null}
        </section>
    );
}
