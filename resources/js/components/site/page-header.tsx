import { Bilingual } from '@/lib/language';

type PageHeaderProps = {
    eyebrowEn: string;
    eyebrowBn: string;
    titleEn: string;
    titleBn: string;
    introEn: string;
    introBn: string;
};

export function PageHeader({
    eyebrowEn,
    eyebrowBn,
    titleEn,
    titleBn,
    introEn,
    introBn,
}: PageHeaderProps) {
    return (
        <section className="bg-primary text-primary-foreground">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <p className="text-sm font-bold text-sun uppercase">
                    <Bilingual en={eyebrowEn} bn={eyebrowBn} />
                </p>
                <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">
                    <Bilingual en={titleEn} bn={titleBn} />
                </h1>
                <p className="mt-4 max-w-2xl text-primary-foreground/80">
                    <Bilingual en={introEn} bn={introBn} />
                </p>
            </div>
        </section>
    );
}
