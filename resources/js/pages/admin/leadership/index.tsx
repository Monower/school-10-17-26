import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Users } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { destroy, index, store, update } from '@/routes/admin/leadership';
import type { Filters, LeadershipMember, Paginated } from '@/types';

type LeadershipProps = {
    members: Paginated<LeadershipMember>;
    filters: Filters;
};

function LeadershipFormDialog({
    member,
    open,
    onOpenChange,
}: {
    member: LeadershipMember | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const form = useForm<{
        name_en: string;
        name_bn: string;
        role_en: string;
        role_bn: string;
        message_en: string;
        message_bn: string;
        sort_order: string;
        active: boolean;
        image: File | null;
    }>({
        name_en: member?.name_en ?? '',
        name_bn: member?.name_bn ?? '',
        role_en: member?.role_en ?? '',
        role_bn: member?.role_bn ?? '',
        message_en: member?.message_en ?? '',
        message_bn: member?.message_bn ?? '',
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
            title={member ? 'Edit leadership member' : 'Add leadership member'}
            description="Members appear in the leadership carousel on the home page and the board section on the about page."
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
                        htmlFor="leader-name-en"
                        required
                        error={form.errors.name_en}
                    >
                        <Input
                            id="leader-name-en"
                            value={form.data.name_en}
                            onChange={(event) =>
                                form.setData('name_en', event.target.value)
                            }
                            placeholder="Md. Rahim Uddin"
                        />
                    </FormField>

                    <FormField
                        label="Name (Bangla)"
                        htmlFor="leader-name-bn"
                        required
                        error={form.errors.name_bn}
                    >
                        <Input
                            id="leader-name-bn"
                            value={form.data.name_bn}
                            onChange={(event) =>
                                form.setData('name_bn', event.target.value)
                            }
                            placeholder="মো. রহিম উদ্দিন"
                        />
                    </FormField>

                    <FormField
                        label="Role (English)"
                        htmlFor="leader-role-en"
                        required
                        error={form.errors.role_en}
                    >
                        <Input
                            id="leader-role-en"
                            value={form.data.role_en}
                            onChange={(event) =>
                                form.setData('role_en', event.target.value)
                            }
                            placeholder="Chairman"
                        />
                    </FormField>

                    <FormField
                        label="Role (Bangla)"
                        htmlFor="leader-role-bn"
                        required
                        error={form.errors.role_bn}
                    >
                        <Input
                            id="leader-role-bn"
                            value={form.data.role_bn}
                            onChange={(event) =>
                                form.setData('role_bn', event.target.value)
                            }
                            placeholder="চেয়ারম্যান"
                        />
                    </FormField>
                </div>

                <FormField
                    label="Message (English)"
                    htmlFor="leader-message-en"
                    optional
                    error={form.errors.message_en}
                >
                    <Textarea
                        id="leader-message-en"
                        value={form.data.message_en}
                        onChange={(event) =>
                            form.setData('message_en', event.target.value)
                        }
                        placeholder="A short message shown beside the portrait"
                        rows={3}
                    />
                </FormField>

                <FormField
                    label="Message (Bangla)"
                    htmlFor="leader-message-bn"
                    optional
                    error={form.errors.message_bn}
                >
                    <Textarea
                        id="leader-message-bn"
                        value={form.data.message_bn}
                        onChange={(event) =>
                            form.setData('message_bn', event.target.value)
                        }
                        placeholder="ছবির পাশে দেখানো সংক্ষিপ্ত বার্তা"
                        rows={3}
                    />
                </FormField>

                <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                        label="Display order"
                        htmlFor="leader-sort-order"
                        optional
                        hint="Lower numbers appear first. Leave blank to append."
                        error={form.errors.sort_order}
                    >
                        <Input
                            id="leader-sort-order"
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

export default function LeadershipIndex({ members, filters }: LeadershipProps) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<LeadershipMember | null>(null);

    const openCreate = () => {
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (member: LeadershipMember) => {
        setEditing(member);
        setOpen(true);
    };

    const toggle = (member: LeadershipMember, active: boolean) => {
        router.patch(
            update.url(member.id),
            { active },
            { preserveScroll: true },
        );
    };

    return (
        <>
            <Head title="Leadership" />
            <div className="space-y-6">
                <PageHeader
                    title="Leadership"
                    description="Manage the directors shown in the home page carousel and on the about page."
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
                    placeholder="Search members…"
                />

                {members.data.length === 0 ? (
                    <EmptyState
                        icon={Users}
                        title={
                            filters.search
                                ? 'No members match your search'
                                : 'No leadership members yet'
                        }
                        description={
                            filters.search
                                ? 'Try a different keyword.'
                                : 'Add your first director to display the leadership section.'
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
                                            Role
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
                                                    {member.role_en}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {member.role_bn}
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

            <LeadershipFormDialog
                key={editing?.id ?? 'new'}
                member={editing}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}
