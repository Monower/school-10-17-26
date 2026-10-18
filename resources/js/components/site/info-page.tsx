import { Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Bilingual } from '@/lib/language';

type InfoPageProps = {
    eyebrowEn: string;
    eyebrowBn: string;
    titleEn: string;
    titleBn: string;
    introEn: string;
    introBn: string;
    pointsEn: string[];
    pointsBn: string[];
    branchHref?: string;
};

export function InfoPage({
    eyebrowEn,
    eyebrowBn,
    titleEn,
    titleBn,
    introEn,
    introBn,
    pointsEn,
    pointsBn,
    branchHref = '/contacts/bhairab-bazar',
}: InfoPageProps) {
    return (
        <>
            <section className="bg-primary py-16 text-primary-foreground sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <p className="text-sm font-bold text-sun uppercase">
                        <Bilingual en={eyebrowEn} bn={eyebrowBn} />
                    </p>
                    <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
                        <Bilingual en={titleEn} bn={titleBn} />
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/75">
                        <Bilingual en={introEn} bn={introBn} />
                    </p>
                </div>
            </section>
            <section className="py-16 sm:py-20">
                <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
                    <div>
                        <h2 className="text-2xl font-extrabold text-foreground">
                            <Bilingual
                                en="What you need to know"
                                bn="যা জানা প্রয়োজন"
                            />
                        </h2>
                        <div className="mt-7 grid gap-4">
                            {pointsEn.map((point, index) => (
                                <div
                                    key={point}
                                    className="flex gap-3 border-b border-border pb-4"
                                >
                                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
                                    <p className="leading-7 text-muted-foreground">
                                        <Bilingual
                                            en={point}
                                            bn={pointsBn[index]}
                                        />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <aside className="h-fit rounded-md bg-secondary p-7">
                        <p className="text-sm font-bold text-primary uppercase">
                            <Bilingual en="Need guidance?" bn="সহায়তা প্রয়োজন?" />
                        </p>
                        <h2 className="mt-2 text-2xl font-extrabold">
                            <Bilingual
                                en="Talk to our admission team"
                                bn="ভর্তি দলের সঙ্গে কথা বলুন"
                            />
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            <Bilingual
                                en="Official contact details and office hours will be added soon."
                                bn="অফিসিয়াল যোগাযোগ তথ্য ও অফিস সময় শীঘ্রই যোগ করা হবে।"
                            />
                        </p>
                        <Button asChild className="mt-6 w-full">
                            <Link href={branchHref}>
                                <Bilingual en="View branch" bn="শাখা দেখুন" />
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </aside>
                </div>
            </section>
        </>
    );
}
