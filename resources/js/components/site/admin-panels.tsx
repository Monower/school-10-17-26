import { router, useForm } from '@inertiajs/react';
import { Download, FileText, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CLASSES, formatSize } from '@/lib/site';
import {
    destroy as destroyAnnouncement,
    store as storeAnnouncement,
    update as updateAnnouncement,
} from '@/routes/admin/announcements';
import { destroy as destroyApplication } from '@/routes/admin/applications';
import {
    destroy as destroyGallery,
    store as storeGallery,
} from '@/routes/admin/gallery';
import {
    destroy as destroyNotice,
    store as storeNotice,
} from '@/routes/admin/notices';
import {
    destroy as destroyResult,
    store as storeResult,
} from '@/routes/admin/results';
import {
    destroy as destroyScholarship,
    store as storeScholarship,
} from '@/routes/admin/scholarships';
import type {
    Announcement,
    Application,
    GalleryPhoto,
    Notice,
    ResultItem,
    Scholarship,
} from '@/types';

const input =
    'h-10 w-full rounded-md border border-input bg-background px-3 text-sm';
const card = 'rounded-lg border border-border bg-card p-5 shadow-sm';
const errorText = 'text-xs font-semibold text-destructive';

type PostRow = {
    id: number;
    title_en: string;
    title_bn: string;
} & Partial<Record<'notice_date' | 'announce_date', string>>;

function FieldError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return <p className={errorText}>{message}</p>;
}

export function ResultsAdmin({ results }: { results: ResultItem[] }) {
    const form = useForm<{ class_name: string; files: File[] }>({
        class_name: CLASSES[0] ?? 'Class 1',
        files: [],
    });

    const submit = () => {
        form.post(storeResult.url(), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => form.reset('files'),
        });
    };

    const remove = (id: number) => {
        router.delete(destroyResult.url(id), { preserveScroll: true });
    };

    return (
        <div className="space-y-6">
            <div className={card}>
                <h3 className="font-bold">Upload result PDF</h3>
                <div className="mt-3 flex flex-wrap items-end gap-3">
                    <label className="text-sm font-semibold">
                        Class
                        <select
                            value={form.data.class_name}
                            onChange={(event) =>
                                form.setData('class_name', event.target.value)
                            }
                            className={`${input} mt-1 w-40`}
                        >
                            {CLASSES.map((className) => (
                                <option key={className}>{className}</option>
                            ))}
                        </select>
                    </label>
                    <label
                        className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground ${
                            form.processing ? 'opacity-60' : ''
                        }`}
                    >
                        <Upload className="size-4" />
                        {form.processing ? 'Uploading…' : 'Choose PDF'}
                        <input
                            disabled={form.processing}
                            type="file"
                            accept="application/pdf"
                            multiple
                            className="sr-only"
                            onChange={(event) => {
                                form.setData(
                                    'files',
                                    Array.from(event.target.files ?? []),
                                );
                                submit();
                            }}
                        />
                    </label>
                </div>
                <div className="mt-2 space-y-1">
                    <FieldError message={form.errors.class_name} />
                    <FieldError message={form.errors.files} />
                </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
                {results.map((result) => (
                    <div
                        key={result.id}
                        className={`${card} flex items-center gap-3`}
                    >
                        <FileText className="size-5 shrink-0 text-brand-red" />
                        <div className="min-w-0 flex-1">
                            <p className="truncate font-bold">{result.title}</p>
                            <p className="text-xs text-muted-foreground">
                                {result.class_name} ·{' '}
                                {formatSize(result.file_size)}
                            </p>
                        </div>
                        <a
                            href={result.url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Open"
                        >
                            <Download className="size-4" />
                        </a>
                        <button
                            type="button"
                            aria-label="Delete"
                            onClick={() => remove(result.id)}
                            className="text-destructive"
                        >
                            <Trash2 className="size-4" />
                        </button>
                    </div>
                ))}
                {results.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        No results yet.
                    </p>
                )}
            </div>
        </div>
    );
}

export function GalleryAdmin({ photos }: { photos: GalleryPhoto[] }) {
    const form = useForm<{ photos: File[] }>({ photos: [] });

    const submit = () => {
        form.post(storeGallery.url(), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => form.reset('photos'),
        });
    };

    const remove = (id: number) => {
        router.delete(destroyGallery.url(id), { preserveScroll: true });
    };

    return (
        <div className="space-y-6">
            <label
                className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground ${
                    form.processing ? 'opacity-60' : ''
                }`}
            >
                <Upload className="size-4" />
                {form.processing ? 'Uploading…' : 'Upload photos'}
                <input
                    disabled={form.processing}
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(event) => {
                        form.setData(
                            'photos',
                            Array.from(event.target.files ?? []),
                        );
                        submit();
                    }}
                />
            </label>
            <FieldError message={form.errors.photos} />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="relative overflow-hidden rounded-md border border-border"
                    >
                        <img
                            src={photo.url}
                            alt={photo.caption ?? ''}
                            className="aspect-square w-full object-cover"
                        />
                        <button
                            type="button"
                            aria-label="Delete"
                            onClick={() => remove(photo.id)}
                            className="absolute top-2 right-2 rounded-full bg-background p-1.5 text-destructive shadow"
                        >
                            <Trash2 className="size-4" />
                        </button>
                    </div>
                ))}
            </div>
            {photos.length === 0 && (
                <p className="text-sm text-muted-foreground">No photos yet.</p>
            )}
        </div>
    );
}

function PostsAdmin({
    rows,
    storeUrl,
    destroyUrl,
    dateField,
}: {
    rows: PostRow[];
    storeUrl: string;
    destroyUrl: (id: number) => string;
    dateField: 'notice_date' | 'announce_date';
}) {
    const form = useForm<Record<string, string>>({
        title_en: '',
        title_bn: '',
        body_en: '',
        body_bn: '',
        [dateField]: new Date().toISOString().slice(0, 10),
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        form.post(storeUrl, {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    const remove = (id: number) => {
        router.delete(destroyUrl(id), { preserveScroll: true });
    };

    return (
        <div className="space-y-6">
            <form
                onSubmit={submit}
                className={`${card} grid gap-3 sm:grid-cols-2`}
            >
                <div>
                    <input
                        required
                        placeholder="Title (English)"
                        value={form.data.title_en}
                        onChange={(event) =>
                            form.setData('title_en', event.target.value)
                        }
                        className={input}
                    />
                    <FieldError message={form.errors.title_en} />
                </div>
                <div>
                    <input
                        required
                        placeholder="শিরোনাম (বাংলা)"
                        value={form.data.title_bn}
                        onChange={(event) =>
                            form.setData('title_bn', event.target.value)
                        }
                        className={input}
                    />
                    <FieldError message={form.errors.title_bn} />
                </div>
                <textarea
                    placeholder="Details (English, optional)"
                    value={form.data.body_en}
                    onChange={(event) =>
                        form.setData('body_en', event.target.value)
                    }
                    className={`${input} h-20 py-2`}
                />
                <textarea
                    placeholder="বিস্তারিত (বাংলা, ঐচ্ছিক)"
                    value={form.data.body_bn}
                    onChange={(event) =>
                        form.setData('body_bn', event.target.value)
                    }
                    className={`${input} h-20 py-2`}
                />
                <div>
                    <input
                        type="date"
                        required
                        value={form.data[dateField]}
                        onChange={(event) =>
                            form.setData(dateField, event.target.value)
                        }
                        className={input}
                    />
                    <FieldError message={form.errors[dateField]} />
                </div>
                <Button type="submit" disabled={form.processing}>
                    Publish
                </Button>
            </form>
            <ul className="divide-y divide-border rounded-md border border-border bg-card">
                {rows.map((row) => (
                    <li key={row.id} className="flex items-center gap-3 p-4">
                        <div className="flex-1">
                            <p className="font-semibold">{row.title_en}</p>
                            <p className="text-sm text-muted-foreground">
                                {row.title_bn}
                            </p>
                        </div>
                        <time className="text-xs text-muted-foreground">
                            {row[dateField]}
                        </time>
                        <button
                            type="button"
                            aria-label="Delete"
                            onClick={() => remove(row.id)}
                            className="text-destructive"
                        >
                            <Trash2 className="size-4" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function NoticesAdmin({ notices }: { notices: Notice[] }) {
    return (
        <PostsAdmin
            rows={notices}
            storeUrl={storeNotice.url()}
            destroyUrl={(id) => destroyNotice.url(id)}
            dateField="notice_date"
        />
    );
}

export function ScholarshipsAdmin({
    scholarships,
}: {
    scholarships: Scholarship[];
}) {
    return (
        <PostsAdmin
            rows={scholarships}
            storeUrl={storeScholarship.url()}
            destroyUrl={(id) => destroyScholarship.url(id)}
            dateField="announce_date"
        />
    );
}

export function AnnouncementsAdmin({
    announcements,
}: {
    announcements: Announcement[];
}) {
    const form = useForm({ text_en: '', text_bn: '' });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        form.post(storeAnnouncement.url(), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    const toggle = (id: number, active: boolean) => {
        router.patch(
            updateAnnouncement.url(id),
            { active },
            { preserveScroll: true },
        );
    };

    const remove = (id: number) => {
        router.delete(destroyAnnouncement.url(id), { preserveScroll: true });
    };

    return (
        <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
                Active messages scroll in the announcement bar at the top of
                every page.
            </p>
            <form onSubmit={submit} className={`${card} grid gap-3`}>
                <div>
                    <input
                        required
                        placeholder="Message (English)"
                        value={form.data.text_en}
                        onChange={(event) =>
                            form.setData('text_en', event.target.value)
                        }
                        className={input}
                    />
                    <FieldError message={form.errors.text_en} />
                </div>
                <div>
                    <input
                        required
                        placeholder="বার্তা (বাংলা)"
                        value={form.data.text_bn}
                        onChange={(event) =>
                            form.setData('text_bn', event.target.value)
                        }
                        className={input}
                    />
                    <FieldError message={form.errors.text_bn} />
                </div>
                <Button
                    type="submit"
                    disabled={form.processing}
                    className="justify-self-start"
                >
                    Add announcement
                </Button>
            </form>
            <ul className="divide-y divide-border rounded-md border border-border bg-card">
                {announcements.map((announcement) => (
                    <li
                        key={announcement.id}
                        className="flex items-center gap-3 p-4"
                    >
                        <div className="flex-1">
                            <p className="font-semibold">
                                {announcement.text_en}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {announcement.text_bn}
                            </p>
                        </div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold">
                            <input
                                type="checkbox"
                                checked={announcement.active}
                                onChange={(event) =>
                                    toggle(
                                        announcement.id,
                                        event.target.checked,
                                    )
                                }
                            />
                            Show
                        </label>
                        <button
                            type="button"
                            aria-label="Delete"
                            onClick={() => remove(announcement.id)}
                            className="text-destructive"
                        >
                            <Trash2 className="size-4" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function ApplicationsAdmin({
    applications,
}: {
    applications: Application[];
}) {
    const remove = (id: number) => {
        router.delete(destroyApplication.url(id), { preserveScroll: true });
    };

    if (applications.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                No applications yet.
            </p>
        );
    }

    return (
        <div className="overflow-x-auto rounded-md border border-border bg-card">
            <table className="w-full text-sm">
                <thead className="bg-muted text-left">
                    <tr>
                        {[
                            'Date',
                            'Student',
                            'Class',
                            'Gender',
                            'Father / Mother',
                            'Phone',
                            'Branch',
                            'Address',
                            '',
                        ].map((heading) => (
                            <th key={heading} className="p-3 font-bold">
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application) => (
                        <tr
                            key={application.id}
                            className="border-t border-border align-top"
                        >
                            <td className="p-3 whitespace-nowrap">
                                {new Date(
                                    application.created_at,
                                ).toLocaleDateString('en-GB')}
                            </td>
                            <td className="p-3">
                                <p className="font-semibold">
                                    {application.student_name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    DOB {application.date_of_birth}
                                    {application.previous_school
                                        ? ` · ${application.previous_school}`
                                        : ''}
                                </p>
                            </td>
                            <td className="p-3">{application.class_name}</td>
                            <td className="p-3">{application.gender}</td>
                            <td className="p-3">
                                {application.father_name}
                                <br />
                                {application.mother_name}
                            </td>
                            <td className="p-3">
                                {application.phone}
                                {application.email && (
                                    <>
                                        <br />
                                        <span className="text-xs">
                                            {application.email}
                                        </span>
                                    </>
                                )}
                            </td>
                            <td className="p-3">{application.branch}</td>
                            <td className="p-3">{application.address}</td>
                            <td className="p-3">
                                <button
                                    type="button"
                                    aria-label="Delete"
                                    onClick={() => remove(application.id)}
                                    className="text-destructive"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
