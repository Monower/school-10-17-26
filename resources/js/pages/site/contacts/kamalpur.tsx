import { Head } from '@inertiajs/react';
import { InfoPage } from '@/components/site/info-page';
import { kamalpur } from '@/routes/contacts';

export default function Kamalpur() {
    return (
        <>
            <Head title="Kamalpur Branch — Sunshine Educare" />
            <InfoPage
                eyebrowEn="Our branches"
                eyebrowBn="আমাদের শাখা"
                titleEn="Kamalpur Branch"
                titleBn="কমলপুর শাখা"
                introEn="Sunshine Educare’s Kamalpur location brings focused academic guidance closer to local families."
                introBn="সানশাইন এডুকেয়ারের কমলপুর শাখা স্থানীয় পরিবারের আরও কাছে লক্ষ্যভিত্তিক শিক্ষা পৌঁছে দেয়।"
                pointsEn={[
                    'Location: Kamalpur area',
                    'Exact address: awaiting official confirmation',
                    'Phone number: awaiting official confirmation',
                    'Office hours: awaiting official confirmation',
                ]}
                pointsBn={[
                    'অবস্থান: কমলপুর এলাকা',
                    'সঠিক ঠিকানা: অফিসিয়াল নিশ্চিতকরণের অপেক্ষায়',
                    'ফোন নম্বর: অফিসিয়াল নিশ্চিতকরণের অপেক্ষায়',
                    'অফিস সময়: অফিসিয়াল নিশ্চিতকরণের অপেক্ষায়',
                ]}
                branchHref={kamalpur.url()}
            />
        </>
    );
}
