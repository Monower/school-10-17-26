import { Head, router, useForm } from '@inertiajs/react';
import { Megaphone, Pencil, Plus } from 'lucide-react';
import { useState } from 'react';
import { DeleteButton } from '@/components/admin/delete-button';
import { EmptyState } from '@/components/admin/empty-state';
import { FormField } from '@/components/admin/form-field';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { ResourceDialog } from '@/components/admin/resource-dialog';
import { SearchInput } from '@/components/admin/search-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { destroy, index, store, update } from '@/routes/admin/announcements';
import type { Announcement, Filters, Paginated } from '@/types';

type AnnouncementsProps = {
    announcements: Paginated<Announcement>;
    filters: Filters;
};

function AnnouncementFormDialog({
    announcement,
    open,
    onOpenChange,
}: {
    announcement: Announcement | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const form = useForm({
        text_en: announcement?.text_en ?? '',
        text_bn: announcement?.text_bn ?? '',
        active: announcement?.active ?? true,
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => onOpenChange(false),
        };

        if (announcement) {
            form.patch(update.url(announcement.id), options);
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
            title={announcement ? 'Edit announcement' : 'Add announcement'}
            description="Active messages scroll across the announcement bar on every page."
        >
            <form onSubmit={submit} className="space-y-4">
                <FormField
                    label="Message (English)"
                    htmlFor="announcement-text-en"
                    required
                    error={form.errors.text_en}
                >
                    <Input
                        id="announcement-text-en"
                        value={form.data.text_en}
                        onChange={(event) =>
                            form.setData('text_en', event.target.value)
                        }
                        placeholder="Admission open for 2026"
                    />
                </FormField>

                <FormField
                    label="Message (Bangla)"
                    htmlFor="announcement-text-bn"
                    required
                    error={form.errors.text_bn}
                >
                    <Input
                        id="announcement-text-bn"
                        value={form.data.text_bn}
                        onChange={(event) =>
                            form.setData('text_bn', event.target.value)
                        }
                        placeholder="২০২৬ ভর্তি চলছে"
                    />
                </FormField>

                <div className="flex items-center gap-2">
                    <Checkbox
                        id="announcement-active"
                        checked={form.data.active}
                        onCheckedChange={(checked) =>
                            form.setData('active', checked === true)
                        }
                    />
                    <Label
                        htmlFor="announcement-active"
                        className="text-sm font-medium"
                    >
                        Show in the announcement bar
                    </Label>
                </div>

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
                        {announcement ? 'Save changes' : 'Add announcement'}
                    </Button>
                </div>
            </form>
        </ResourceDialog>
    );
}

export default function AnnouncementsIndex({
    announcements,
    filters,
}: AnnouncementsProps) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Announcement | null>(null);

    const openCreate = () => {
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (announcement: Announcement) => {
        setEditing(announcement);
        setOpen(true);
    };

    const toggle = (announcement: Announcement, active: boolean) => {
        router.patch(
            update.url(announcement.id),
            { active },
            { preserveScroll: true },
        );
    };

    return (
        <>
            <Head title="Announcement bar" />
            <div className="space-y-6">
                <PageHeader
                    title="Announcement bar"
                    description="Manage the scrolling messages shown at the top of every public page."
                    action={
                        <Button onClick={openCreate}>
                            <Plus className="size-4" />
                            Add announcement
                        </Button>
                    }
                />

                <SearchInput
                    url={index.url()}
                    initialValue={filters.search}
                    placeholder="Search announcements…"
                />

                {announcements.data.length === 0 ? (
                    <EmptyState
                        icon={Megaphone}
                        title={
                            filters.search
                                ? 'No announcements match your search'
                                : 'No announcements yet'
                        }
                        description={
                            filters.search
                                ? 'Try a different keyword.'
                                : 'Add a message to display it in the ticker.'
                        }
                        action={
                            !filters.search && (
                                <Button onClick={openCreate}>
                                    <Plus className="size-4" />
                                    Add announcement
                                </Button>
                            )
                        }
                    />
                ) : (
                    <ul className="space-y-3">
                        {announcements.data.map((announcement) => (
                            <li
                                key={announcement.id}
                                className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
                            >
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-semibold">
                                        {announcement.text_en}
                                    </p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {announcement.text_bn}
                                    </p>
                                </div>

                                <Badge
                                    variant={
                                        announcement.active
                                            ? 'default'
                                            : 'secondary'
                                    }
                                >
                                    {announcement.active ? 'Live' : 'Hidden'}
                                </Badge>

                                <Label className="flex cursor-pointer items-center gap-2 text-xs font-semibold">
                                    <Checkbox
                                        checked={announcement.active}
                                        onCheckedChange={(checked) =>
                                            toggle(
                                                announcement,
                                                checked === true,
                                            )
                                        }
                                    />
                                    Show
                                </Label>

                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        aria-label="Edit announcement"
                                        onClick={() => openEdit(announcement)}
                                    >
                                        <Pencil className="size-4" />
                                    </Button>
                                    <DeleteButton
                                        url={destroy.url(announcement.id)}
                                        title="Delete this announcement?"
                                        description="The message will be removed from the ticker."
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <Pagination meta={announcements} />
            </div>

            <AnnouncementFormDialog
                key={editing?.id ?? 'new'}
                announcement={editing}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}
