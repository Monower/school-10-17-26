import { Head } from '@inertiajs/react';
import { HomePage } from '@/components/site/home-page';
import type { GalleryPhoto, Notice } from '@/types';

export default function Home({
    notices,
    photos,
}: {
    notices: Notice[];
    photos: GalleryPhoto[];
}) {
    return (
        <>
            <Head title="Sunshine Educare — The Toppers’ Choice" />
            <HomePage notices={notices} photos={photos} />
        </>
    );
}
