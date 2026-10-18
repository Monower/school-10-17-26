import { Head } from '@inertiajs/react';
import { Images, X } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '@/components/site/page-header';
import { Bilingual } from '@/lib/language';
import type { GalleryPhoto } from '@/types';

export default function GalleryPage({ photos }: { photos: GalleryPhoto[] }) {
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
                {photos.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-border bg-muted/40 px-6 py-16 text-center">
                        <Images className="mx-auto size-10 text-muted-foreground" />
                        <p className="mt-3 font-semibold text-muted-foreground">
                            <Bilingual
                                en="No photos published yet."
                                bn="এখনও কোনো ছবি প্রকাশিত হয়নি।"
                            />
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {photos.map((photo) => (
                            <button
                                key={photo.id}
                                type="button"
                                onClick={() => setOpen(photo.url)}
                                className="group relative overflow-hidden rounded-md border border-border"
                            >
                                <img
                                    src={photo.url}
                                    alt={
                                        photo.caption ??
                                        'Sunshine Educare gallery photo'
                                    }
                                    loading="lazy"
                                    className="aspect-square w-full object-cover transition hover:scale-105"
                                />
                                {photo.caption && (
                                    <span className="absolute inset-x-0 bottom-0 truncate bg-primary/85 px-3 py-2 text-left text-xs font-semibold text-primary-foreground">
                                        {photo.caption}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </section>
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/85 p-4"
                    onClick={() => setOpen(null)}
                >
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={() => setOpen(null)}
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
