import { Head } from '@inertiajs/react';
import { InfoPage } from '@/components/site/info-page';
import { bhairabBazar } from '@/routes/contacts';

export default function BhairabBazar() {
    return (
        <>
            <Head title="Bhairab Bazar Branch — Sunshine Educare" />
            <InfoPage
                eyebrowEn="Our branches"
                eyebrowBn="আমাদের শাখা"
                titleEn="Bhairab Bazar Branch"
                titleBn="ভৈরব বাজার শাখা"
                introEn="Our primary location serves learners in Bhairab, Kishoreganj. Exact street address and office hours will be published after confirmation."
                introBn="আমাদের প্রধান শাখা ভৈরব, কিশোরগঞ্জের শিক্ষার্থীদের সেবা দেয়। নিশ্চিত হওয়ার পর সঠিক ঠিকানা ও অফিস সময় প্রকাশ করা হবে।"
                pointsEn={[
                    'Location: Bhairab Bazar, Kishoreganj',
                    'Phone number: awaiting official confirmation',
                    'Office hours: awaiting official confirmation',
                    'Email: info@sunshineeducare.edu.bd',
                ]}
                pointsBn={[
                    'অবস্থান: ভৈরব বাজার, কিশোরগঞ্জ',
                    'ফোন নম্বর: অফিসিয়াল নিশ্চিতকরণের অপেক্ষায়',
                    'অফিস সময়: অফিসিয়াল নিশ্চিতকরণের অপেক্ষায়',
                    'ইমেইল: info@sunshineeducare.edu.bd',
                ]}
                branchHref={bhairabBazar.url()}
            />
        </>
    );
}
