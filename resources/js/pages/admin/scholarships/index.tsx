import { Head, useForm } from '@inertiajs/react';
import { GraduationCap, Pencil, Plus } from 'lucide-react';
import { useState } from 'react';
import { DeleteButton } from '@/components/admin/delete-button';
import { EmptyState } from '@/components/admin/empty-state';
import { FormField } from '@/components/admin/form-field';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { ResourceDialog } from '@/components/admin/resource-dialog';
import { SearchInput } from '@/components/admin/search-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { destroy, index, store, update } from '@/routes/admin/scholarships';
import type { Filters, Paginated, Scholarship } from '@/types';

type ScholarshipsProps = {
    scholarships: Paginated<Scholarship>;
    filters: Filters;
};

function ScholarshipFormDialog({
    scholarship,
    open,
    onOpenChange,
}: {
    scholarship: Scholarship | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const form = useForm({
        title_en: scholarship?.title_en ?? '',
        title_bn: scholarship?.title_bn ?? '',
        body_en: scholarship?.body_en ?? '',
        body_bn: scholarship?.body_bn ?? '',
        announce_date:
            scholarship?.announce_date?.slice(0, 10) ??
            new Date().toISOString().slice(0, 10),
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => onOpenChange(false),
        };

        if (scholarship) {
            form.patch(update.url(scholarship.id), options);
        } else {
            form.post(store.url(), {
                ...options,
                onSuccess: () => {
                    form.reset();
                    onOpenChange(false);
                },
            });
        }
    };

    return (
        <ResourceDialog
            open={open}
            onOpenChange={onOpenChange}
            title={scholarship ? 'Edit scholarship' : 'Publish a scholarship'}
            description="Scholarships appear on the public scholarships page."
        >
            <form onSubmit={submit} className="space-y-4">
                <FormField
                    label="Title (English)"
                    htmlFor="scholarship-title-en"
                    required
                    error={form.errors.title_en}
                >
                    <Input
                        id="scholarship-title-en"
                        value={form.data.title_en}
                        onChange={(event) =>
                            form.setData('title_en', event.target.value)
                        }
                        placeholder="Merit scholarship"
                    />
                </FormField>

                <FormField
                    label="Title (Bangla)"
                    htmlFor="scholarship-title-bn"
                    required
                    error={form.errors.title_bn}
                >
                    <Input
                        id="scholarship-title-bn"
                        value={form.data.title_bn}
                        onChange={(event) =>
                            form.setData('title_bn', event.target.value)
                        }
                        placeholder="মেধা বৃত্তি"
                    />
                </FormField>

                <FormField
                    label="Details (English)"
                    htmlFor="scholarship-body-en"
                    optional
                    error={form.errors.body_en}
                >
                    <Textarea
                        id="scholarship-body-en"
                        value={form.data.body_en}
                        onChange={(event) =>
                            form.setData('body_en', event.target.value)
                        }
                        placeholder="Eligibility and details"
                        rows={3}
                    />
                </FormField>

                <FormField
                    label="Details (Bangla)"
                    htmlFor="scholarship-body-bn"
                    optional
                    error={form.errors.body_bn}
                >
                    <Textarea
                        id="scholarship-body-bn"
                        value={form.data.body_bn}
                        onChange={(event) =>
                            form.setData('body_bn', event.target.value)
                        }
                        placeholder="যোগ্যতা ও বিবরণ"
                        rows={3}
                    />
                </FormField>

                <FormField
                    label="Announcement date"
                    htmlFor="scholarship-date"
                    required
                    error={form.errors.announce_date}
                >
                    <Input
                        id="scholarship-date"
                        type="date"
                        value={form.data.announce_date}
                        onChange={(event) =>
                            form.setData('announce_date', event.target.value)
                        }
                    />
                </FormField>

                <div className="flex justify-end gap-2 pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={form.processing}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={form.processing}>
                        {scholarship ? 'Save changes' : 'Publish scholarship'}
                    </Button>
                </div>
            </form>
        </ResourceDialog>
    );
}

export default function ScholarshipsIndex({
    scholarships,
    filters,
}: ScholarshipsProps) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Scholarship | null>(null);

    const openCreate = () => {
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (scholarship: Scholarship) => {
        setEditing(scholarship);
        setOpen(true);
    };

    return (
        <>
            <Head title="Scholarships" />
            <div className="space-y-6">
                <PageHeader
                    title="Scholarships"
                    description="Announce scholarship opportunities on the public website."
                    action={
                        <Button onClick={openCreate}>
                            <Plus className="size-4" />
                            New scholarship
                        </Button>
                    }
                />

                <SearchInput
                    url={index.url()}
                    initialValue={filters.search}
                    placeholder="Search scholarships…"
                />

                {scholarships.data.length === 0 ? (
                    <EmptyState
                        icon={GraduationCap}
                        title={
                            filters.search
                                ? 'No scholarships match your search'
                                : 'No scholarships yet'
                        }
                        description={
                            filters.search
                                ? 'Try a different keyword.'
                                : 'Publish your first scholarship to get started.'
                        }
                        action={
                            !filters.search && (
                                <Button onClick={openCreate}>
                                    <Plus className="size-4" />
                                    New scholarship
                                </Button>
                            )
                        }
                    />
                ) : (
                    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b border-border bg-muted/50 text-left">
                                    <tr>
                                        <th className="px-5 py-3 font-bold">
                                            Title
                                        </th>
                                        <th className="px-5 py-3 font-bold whitespace-nowrap">
                                            Announced
                                        </th>
                                        <th className="px-5 py-3 text-right font-bold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scholarships.data.map((scholarship) => (
                                        <tr
                                            key={scholarship.id}
                                            className="border-b border-border last:border-0"
                                        >
                                            <td className="px-5 py-4">
                                                <p className="font-semibold">
                                                    {scholarship.title_en}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {scholarship.title_bn}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                                                {scholarship.announce_date}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label="Edit scholarship"
                                                        onClick={() =>
                                                            openEdit(
                                                                scholarship,
                                                            )
                                                        }
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                    <DeleteButton
                                                        url={destroy.url(
                                                            scholarship.id,
                                                        )}
                                                        title="Delete this scholarship?"
                                                        description="The scholarship will be removed from the website immediately."
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <Pagination meta={scholarships} />
            </div>

            <ScholarshipFormDialog
                key={editing?.id ?? 'new'}
                scholarship={editing}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}
