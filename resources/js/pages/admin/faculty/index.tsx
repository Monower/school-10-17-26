import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, UserRound } from 'lucide-react';
import { useState } from 'react';
import { DeleteButton } from '@/components/admin/delete-button';
import { EmptyState } from '@/components/admin/empty-state';
import { FormField } from '@/components/admin/form-field';
import { ImagePicker } from '@/components/admin/image-picker';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { ResourceDialog } from '@/components/admin/resource-dialog';
import { SearchInput } from '@/components/admin/search-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { destroy, index, store, update } from '@/routes/admin/faculty';
import type { FacultyMember, Filters, Paginated } from '@/types';

type FacultyProps = {
    members: Paginated<FacultyMember>;
    filters: Filters;
};

function FacultyFormDialog({
    member,
    open,
    onOpenChange,
}: {
    member: FacultyMember | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const form = useForm<{
        name_en: string;
        name_bn: string;
        designation_en: string;
        designation_bn: string;
        sort_order: string;
        active: boolean;
        image: File | null;
    }>({
        name_en: member?.name_en ?? '',
        name_bn: member?.name_bn ?? '',
        designation_en: member?.designation_en ?? '',
        designation_bn: member?.designation_bn ?? '',
        sort_order: member ? String(member.sort_order) : '',
        active: member?.active ?? true,
        image: null,
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => onOpenChange(false),
        };

        if (member) {
            form.patch(update.url(member.id), options);
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
            title={member ? 'Edit faculty member' : 'Add faculty member'}
            description="Faculty members appear in the faculty section on the about page."
        >
            <form onSubmit={submit} className="space-y-4">
                <FormField
                    label="Portrait"
                    required={!member}
                    error={form.errors.image}
                >
                    <ImagePicker
                        file={form.data.image}
                        currentUrl={member?.image_url}
                        onChange={(file) => form.setData('image', file)}
                    />
                </FormField>

                <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                        label="Name (English)"
                        htmlFor="faculty-name-en"
                        required
                        error={form.errors.name_en}
                    >
                        <Input
                            id="faculty-name-en"
                            value={form.data.name_en}
                            onChange={(event) =>
                                form.setData('name_en', event.target.value)
                            }
                            placeholder="Md. Karim Uddin"
                        />
                    </FormField>

                    <FormField
                        label="Name (Bangla)"
                        htmlFor="faculty-name-bn"
                        required
                        error={form.errors.name_bn}
                    >
                        <Input
                            id="faculty-name-bn"
                            value={form.data.name_bn}
                            onChange={(event) =>
                                form.setData('name_bn', event.target.value)
                            }
                            placeholder="মো. করিম উদ্দিন"
                        />
                    </FormField>

                    <FormField
                        label="Designation (English)"
                        htmlFor="faculty-designation-en"
                        required
                        error={form.errors.designation_en}
                    >
                        <Input
                            id="faculty-designation-en"
                            value={form.data.designation_en}
                            onChange={(event) =>
                                form.setData(
                                    'designation_en',
                                    event.target.value,
                                )
                            }
                            placeholder="Senior Teacher, Mathematics"
                        />
                    </FormField>

                    <FormField
                        label="Designation (Bangla)"
                        htmlFor="faculty-designation-bn"
                        required
                        error={form.errors.designation_bn}
                    >
                        <Input
                            id="faculty-designation-bn"
                            value={form.data.designation_bn}
                            onChange={(event) =>
                                form.setData(
                                    'designation_bn',
                                    event.target.value,
                                )
                            }
                            placeholder="সিনিয়র শিক্ষক, গণিত"
                        />
                    </FormField>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                        label="Display order"
                        htmlFor="faculty-sort-order"
                        optional
                        hint="Lower numbers appear first. Leave blank to append."
                        error={form.errors.sort_order}
                    >
                        <Input
                            id="faculty-sort-order"
                            type="number"
                            min={0}
                            value={form.data.sort_order}
                            onChange={(event) =>
                                form.setData('sort_order', event.target.value)
                            }
                            placeholder="Append to end"
                        />
                    </FormField>

                    <div className="flex items-end pb-2">
                        <Label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                            <Checkbox
                                checked={form.data.active}
                                onCheckedChange={(checked) =>
                                    form.setData('active', checked === true)
                                }
                            />
                            Show on the website
                        </Label>
                    </div>
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
                        {member ? 'Save changes' : 'Add member'}
                    </Button>
                </div>
            </form>
        </ResourceDialog>
    );
}

export default function FacultyIndex({ members, filters }: FacultyProps) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<FacultyMember | null>(null);

    const openCreate = () => {
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (member: FacultyMember) => {
        setEditing(member);
        setOpen(true);
    };

    const toggle = (member: FacultyMember, active: boolean) => {
        router.patch(
            update.url(member.id),
            { active },
            { preserveScroll: true },
        );
    };

    return (
        <>
            <Head title="Faculty" />
            <div className="space-y-6">
                <PageHeader
                    title="Faculty"
                    description="Manage the teachers shown in the faculty section on the about page."
                    action={
                        <Button onClick={openCreate}>
                            <Plus className="size-4" />
                            New member
                        </Button>
                    }
                />

                <SearchInput
                    url={index.url()}
                    initialValue={filters.search}
                    placeholder="Search faculty…"
                />

                {members.data.length === 0 ? (
                    <EmptyState
                        icon={UserRound}
                        title={
                            filters.search
                                ? 'No members match your search'
                                : 'No faculty members yet'
                        }
                        description={
                            filters.search
                                ? 'Try a different keyword.'
                                : 'Add your first teacher to display the faculty section.'
                        }
                        action={
                            !filters.search && (
                                <Button onClick={openCreate}>
                                    <Plus className="size-4" />
                                    New member
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
                                            Member
                                        </th>
                                        <th className="px-5 py-3 font-bold">
                                            Designation
                                        </th>
                                        <th className="px-5 py-3 font-bold whitespace-nowrap">
                                            Order
                                        </th>
                                        <th className="px-5 py-3 font-bold">
                                            Status
                                        </th>
                                        <th className="px-5 py-3 text-right font-bold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.data.map((member) => (
                                        <tr
                                            key={member.id}
                                            className="border-b border-border last:border-0"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={member.image_url}
                                                        alt=""
                                                        className="size-12 shrink-0 rounded-lg object-cover object-top"
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="truncate font-semibold">
                                                            {member.name_en}
                                                        </p>
                                                        <p className="truncate text-xs text-muted-foreground">
                                                            {member.name_bn}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="font-medium">
                                                    {member.designation_en}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {member.designation_bn}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4 text-muted-foreground">
                                                {member.sort_order}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant={
                                                            member.active
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {member.active
                                                            ? 'Live'
                                                            : 'Hidden'}
                                                    </Badge>
                                                    <Label className="flex cursor-pointer items-center gap-2 text-xs font-semibold">
                                                        <Checkbox
                                                            checked={
                                                                member.active
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                toggle(
                                                                    member,
                                                                    checked ===
                                                                        true,
                                                                )
                                                            }
                                                        />
                                                        Show
                                                    </Label>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label="Edit member"
                                                        onClick={() =>
                                                            openEdit(member)
                                                        }
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                    <DeleteButton
                                                        url={destroy.url(
                                                            member.id,
                                                        )}
                                                        title="Delete this member?"
                                                        description="The portrait and profile will be removed from the website immediately."
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

                <Pagination meta={members} />
            </div>

            <FacultyFormDialog
                key={editing?.id ?? 'new'}
                member={editing}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}
