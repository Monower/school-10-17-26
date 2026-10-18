import { Head } from '@inertiajs/react';
import academic from '@/assets/director-academic.jpg';
import chairman from '@/assets/director-chairman.jpg';
import executive from '@/assets/director-executive.jpg';
import { PageHeader } from '@/components/site/page-header';
import { Bilingual } from '@/lib/language';

type Person = {
    image: string;
    nameEn: string;
    nameBn: string;
    roleEn: string;
    roleBn: string;
};

const board: Person[] = [
    {
        image: chairman,
        nameEn: 'Director’s name',
        nameBn: 'পরিচালকের নাম',
        roleEn: 'Chairman',
        roleBn: 'চেয়ারম্যান',
    },
    {
        image: academic,
        nameEn: 'Director’s name',
        nameBn: 'পরিচালকের নাম',
        roleEn: 'Academic Director',
        roleBn: 'একাডেমিক পরিচালক',
    },
    {
        image: executive,
        nameEn: 'Director’s name',
        nameBn: 'পরিচালকের নাম',
        roleEn: 'Executive Director',
        roleBn: 'নির্বাহী পরিচালক',
    },
];

const faculty: Person[] = [
    {
        image: academic,
        nameEn: 'Teacher’s name',
        nameBn: 'শিক্ষকের নাম',
        roleEn: 'Senior Teacher, Mathematics',
        roleBn: 'সিনিয়র শিক্ষক, গণিত',
    },
    {
        image: executive,
        nameEn: 'Teacher’s name',
        nameBn: 'শিক্ষকের নাম',
        roleEn: 'Teacher, English',
        roleBn: 'শিক্ষক, ইংরেজি',
    },
    {
        image: chairman,
        nameEn: 'Teacher’s name',
        nameBn: 'শিক্ষকের নাম',
        roleEn: 'Teacher, Physics',
        roleBn: 'শিক্ষক, পদার্থবিজ্ঞান',
    },
    {
        image: academic,
        nameEn: 'Teacher’s name',
        nameBn: 'শিক্ষকের নাম',
        roleEn: 'Teacher, Bangla',
        roleBn: 'শিক্ষক, বাংলা',
    },
];

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

export default function About() {
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
            <PeopleGrid
                people={board}
                titleEn="Board of Directors"
                titleBn="পরিচালনা পর্ষদ"
                cols="lg:grid-cols-3"
            />
            <div className="bg-secondary">
                <PeopleGrid
                    people={faculty}
                    titleEn="Faculty Members"
                    titleBn="শিক্ষকমণ্ডলী"
                    cols="lg:grid-cols-4"
                />
            </div>
        </>
    );
}
