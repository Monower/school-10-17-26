import { Head } from '@inertiajs/react';
import { HomePage } from '@/components/site/home-page';
import type { GalleryPhoto, LeadershipMember, Notice } from '@/types';

export default function Home({
    notices,
    photos,
    leaders,
}: {
    notices: Notice[];
    photos: GalleryPhoto[];
    leaders: LeadershipMember[];
}) {
    return (
        <>
            <Head title="Sunshine Educare — The Toppers’ Choice" />
            <HomePage notices={notices} photos={photos} leaders={leaders} />
        </>
    );
}
