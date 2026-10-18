import { Head } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import achievers from '@/assets/sunshine-achievers.jpg';
import classroom from '@/assets/sunshine-classroom.jpg';
import science from '@/assets/sunshine-science.jpg';
import { PageHeader } from '@/components/site/page-header';
import type { GalleryPhoto } from '@/types';

const fallbackPhotos = [classroom, achievers, science];

export default function GalleryPage({ photos }: { photos: GalleryPhoto[] }) {
    const sources = photos.length
        ? photos.map((photo) => photo.url)
        : fallbackPhotos;
    const [open, setOpen] = useState<string | null>(null);

    return (
        <>
            <Head title="Gallery — Sunshine Educare" />
            <PageHeader
                eyebrowEn="Gallery"
                eyebrowBn="গ্যালারি"
                titleEn="Moments at Sunshine"
                titleBn="সানশাইনের মুহূর্তগুলো"
                introEn="Classes, events, and celebrations from our campuses."
                introBn="আমাদের ক্যাম্পাসের ক্লাস, অনুষ্ঠান ও উদযাপনের মুহূর্ত।"
            />
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {sources.map((src, index) => (
                        <button
                            key={`${src}-${index}`}
                            type="button"
                            onClick={() => setOpen(src)}
                            className="overflow-hidden rounded-md border border-border"
                        >
                            <img
                                src={src}
                                alt={`Gallery photo ${index + 1}`}
                                loading="lazy"
                                className="aspect-square w-full object-cover transition hover:scale-105"
                            />
                        </button>
                    ))}
                </div>
            </section>
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/85 p-4"
                    onClick={() => setOpen(null)}
                >
                    <button
                        type="button"
                        aria-label="Close"
                        className="absolute top-4 right-4 rounded-full bg-background p-2"
                    >
                        <X />
                    </button>
                    <img
                        src={open}
                        alt=""
                        className="max-h-[85vh] max-w-full rounded-md object-contain"
                    />
                </div>
            )}
        </>
    );
}
