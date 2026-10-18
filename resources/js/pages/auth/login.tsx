import { Form, Head, Link } from '@inertiajs/react';
import { LockKeyhole } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Bilingual } from '@/lib/language';
import { home } from '@/routes';
import { store } from '@/routes/login';

const field =
    'mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status }: Props) {
    return (
        <>
            <Head title="Admin Log In — Sunshine Educare" />

            <section className="bg-secondary py-16 sm:py-24">
                <div className="mx-auto max-w-md px-4">
                    <div className="rounded-md border border-border bg-card p-7 shadow-lg sm:p-9">
                        <div className="flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <LockKeyhole />
                        </div>
                        <h1 className="mt-6 text-3xl font-extrabold">
                            <Bilingual en="Admin log in" bn="অ্যাডমিন লগ ইন" />
                        </h1>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            <Bilingual
                                en="Staff sign-in for managing results, notices, gallery and more."
                                bn="ফলাফল, নোটিশ, গ্যালারি ইত্যাদি পরিচালনার জন্য স্টাফ লগ ইন।"
                            />
                        </p>

                        {status && (
                            <div className="mt-4 rounded-md bg-muted p-3 text-sm font-medium text-success">
                                {status}
                            </div>
                        )}

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="mt-7 space-y-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <label className="block text-sm font-bold">
                                        <Bilingual en="Email" bn="ইমেইল" />
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            autoFocus
                                            autoComplete="email"
                                            className={field}
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </label>
                                    <label className="block text-sm font-bold">
                                        <Bilingual en="Password" bn="পাসওয়ার্ড" />
                                        <input
                                            required
                                            type="password"
                                            name="password"
                                            autoComplete="current-password"
                                            className={field}
                                        />
                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </label>
                                    <label className="flex items-center gap-2 text-sm font-semibold">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                        />
                                        <Bilingual
                                            en="Remember me"
                                            bn="মনে রাখুন"
                                        />
                                    </label>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full"
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner />}
                                        <Bilingual en="Log in" bn="লগ ইন" />
                                    </Button>
                                </>
                            )}
                        </Form>

                        <Button
                            asChild
                            variant="outline"
                            className="mt-4 w-full"
                        >
                            <Link href={home()}>
                                <Bilingual en="Return home" bn="হোমে ফিরে যান" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
