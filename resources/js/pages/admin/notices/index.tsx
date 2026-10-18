import { Head, useForm } from '@inertiajs/react';
import { Bell, Pencil, Plus } from 'lucide-react';
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
import { destroy, index, store, update } from '@/routes/admin/notices';
import type { Filters, Notice, Paginated } from '@/types';

type NoticesProps = {
    notices: Paginated<Notice>;
    filters: Filters;
};

function NoticeFormDialog({
    notice,
    open,
    onOpenChange,
}: {
    notice: Notice | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const form = useForm({
        title_en: notice?.title_en ?? '',
        title_bn: notice?.title_bn ?? '',
        body_en: notice?.body_en ?? '',
        body_bn: notice?.body_bn ?? '',
        notice_date:
            notice?.notice_date?.slice(0, 10) ??
            new Date().toISOString().slice(0, 10),
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => onOpenChange(false),
        };

        if (notice) {
            form.patch(update.url(notice.id), options);
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
            title={notice ? 'Edit notice' : 'Publish a notice'}
            description="Notices appear on the public notices page in both English and Bangla."
        >
            <form onSubmit={submit} className="space-y-4">
                <FormField
                    label="Title (English)"
                    htmlFor="notice-title-en"
                    required
                    error={form.errors.title_en}
                >
                    <Input
                        id="notice-title-en"
                        value={form.data.title_en}
                        onChange={(event) =>
                            form.setData('title_en', event.target.value)
                        }
                        placeholder="Exam schedule"
                    />
                </FormField>

                <FormField
                    label="Title (Bangla)"
                    htmlFor="notice-title-bn"
                    required
                    error={form.errors.title_bn}
                >
                    <Input
                        id="notice-title-bn"
                        value={form.data.title_bn}
                        onChange={(event) =>
                            form.setData('title_bn', event.target.value)
                        }
                        placeholder="পরীক্ষার সময়সূচি"
                    />
                </FormField>

                <FormField
                    label="Details (English)"
                    htmlFor="notice-body-en"
                    optional
                    error={form.errors.body_en}
                >
                    <Textarea
                        id="notice-body-en"
                        value={form.data.body_en}
                        onChange={(event) =>
                            form.setData('body_en', event.target.value)
                        }
                        placeholder="Additional details"
                        rows={3}
                    />
                </FormField>

                <FormField
                    label="Details (Bangla)"
                    htmlFor="notice-body-bn"
                    optional
                    error={form.errors.body_bn}
                >
                    <Textarea
                        id="notice-body-bn"
                        value={form.data.body_bn}
                        onChange={(event) =>
                            form.setData('body_bn', event.target.value)
                        }
                        placeholder="অতিরিক্ত বিবরণ"
                        rows={3}
                    />
                </FormField>

                <FormField
                    label="Notice date"
                    htmlFor="notice-date"
                    required
                    error={form.errors.notice_date}
                >
                    <Input
                        id="notice-date"
                        type="date"
                        value={form.data.notice_date}
                        onChange={(event) =>
                            form.setData('notice_date', event.target.value)
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
                        {notice ? 'Save changes' : 'Publish notice'}
                    </Button>
                </div>
            </form>
        </ResourceDialog>
    );
}

export default function NoticesIndex({ notices, filters }: NoticesProps) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Notice | null>(null);

    const openCreate = () => {
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (notice: Notice) => {
        setEditing(notice);
        setOpen(true);
    };

    return (
        <>
            <Head title="Notices" />
            <div className="space-y-6">
                <PageHeader
                    title="Notices"
                    description="Publish and manage public notices for both languages."
                    action={
                        <Button onClick={openCreate}>
                            <Plus className="size-4" />
                            New notice
                        </Button>
                    }
                />

                <SearchInput
                    url={index.url()}
                    initialValue={filters.search}
                    placeholder="Search notices…"
                />

                {notices.data.length === 0 ? (
                    <EmptyState
                        icon={Bell}
                        title={
                            filters.search
                                ? 'No notices match your search'
                                : 'No notices yet'
                        }
                        description={
                            filters.search
                                ? 'Try a different keyword.'
                                : 'Publish your first notice to get started.'
                        }
                        action={
                            !filters.search && (
                                <Button onClick={openCreate}>
                                    <Plus className="size-4" />
                                    New notice
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
                                            Date
                                        </th>
                                        <th className="px-5 py-3 text-right font-bold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notices.data.map((notice) => (
                                        <tr
                                            key={notice.id}
                                            className="border-b border-border last:border-0"
                                        >
                                            <td className="px-5 py-4">
                                                <p className="font-semibold">
                                                    {notice.title_en}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {notice.title_bn}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                                                {notice.notice_date}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label="Edit notice"
                                                        onClick={() =>
                                                            openEdit(notice)
                                                        }
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                    <DeleteButton
                                                        url={destroy.url(
                                                            notice.id,
                                                        )}
                                                        title="Delete this notice?"
                                                        description="The notice will be removed from the website immediately."
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

                <Pagination meta={notices} />
            </div>

            <NoticeFormDialog
                key={editing?.id ?? 'new'}
                notice={editing}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}
