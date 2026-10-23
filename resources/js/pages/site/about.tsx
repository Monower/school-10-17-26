import { Head } from '@inertiajs/react';
import { PageHeader } from '@/components/site/page-header';
import { Bilingual } from '@/lib/language';
import type { FacultyMember, LeadershipMember } from '@/types';

type Person = {
    image: string;
    nameEn: string;
    nameBn: string;
    roleEn: string;
    roleBn: string;
};

function PeopleGrid({
    people,
    titleEn,
    titleBn,
    cols,
}: {
    people: Person[];
    titleEn: string;
    titleBn: string;
    cols: string;
}) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold">
                <Bilingual en={titleEn} bn={titleBn} />
            </h2>
            <div className={`mt-8 grid gap-6 sm:grid-cols-2 ${cols}`}>
                {people.map((person, index) => (
                    <article
                        key={index}
                        className="overflow-hidden rounded-md border border-border bg-card"
                    >
                        <img
                            src={person.image}
                            alt={person.roleEn}
                            loading="lazy"
                            className="aspect-[4/5] w-full object-cover object-top"
                        />
                        <div className="p-5">
                            <h3 className="text-lg font-bold">
                                <Bilingual
                                    en={person.nameEn}
                                    bn={person.nameBn}
                                />
                            </h3>
                            <p className="text-sm font-semibold text-brand-red">
                                <Bilingual
                                    en={person.roleEn}
                                    bn={person.roleBn}
                                />
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default function About({
    leaders,
    faculty,
}: {
    leaders: LeadershipMember[];
    faculty: FacultyMember[];
}) {
    const board: Person[] = leaders.map((leader) => ({
        image: leader.image_url,
        nameEn: leader.name_en,
        nameBn: leader.name_bn,
        roleEn: leader.role_en,
        roleBn: leader.role_bn,
    }));

    const teachers: Person[] = faculty.map((member) => ({
        image: member.image_url,
        nameEn: member.name_en,
        nameBn: member.name_bn,
        roleEn: member.designation_en,
        roleBn: member.designation_bn,
    }));

    return (
        <>
            <Head title="About Us — Sunshine Educare" />
            <PageHeader
                eyebrowEn="About us"
                eyebrowBn="আমাদের সম্পর্কে"
                titleEn="The people behind Sunshine Educare"
                titleBn="সানশাইন এডুকেয়ারের পেছনের মানুষেরা"
                introEn="Meet the leadership and teachers guiding our students in Bhairab, Kishoreganj."
                introBn="ভৈরব, কিশোরগঞ্জে আমাদের শিক্ষার্থীদের পথ দেখানো নেতৃত্ব ও শিক্ষকমণ্ডলীর সঙ্গে পরিচিত হোন।"
            />
            {board.length > 0 && (
                <PeopleGrid
                    people={board}
                    titleEn="Board of Directors"
                    titleBn="পরিচালনা পর্ষদ"
                    cols="lg:grid-cols-3"
                />
            )}
            {teachers.length > 0 && (
                <div className="bg-secondary">
                    <PeopleGrid
                        people={teachers}
                        titleEn="Faculty Members"
                        titleBn="শিক্ষকমণ্ডলী"
                        cols="lg:grid-cols-4"
                    />
                </div>
            )}
        </>
    );
}
