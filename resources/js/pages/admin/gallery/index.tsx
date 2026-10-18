import { Head, useForm } from '@inertiajs/react';
import { Image as ImageIcon, Pencil, Upload } from 'lucide-react';
import { useState } from 'react';
import { DeleteButton } from '@/components/admin/delete-button';
import { EmptyState } from '@/components/admin/empty-state';
import { FormField } from '@/components/admin/form-field';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { PhotoPicker } from '@/components/admin/photo-picker';
import { ResourceDialog } from '@/components/admin/resource-dialog';
import { SearchInput } from '@/components/admin/search-input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { destroy, index, store, update } from '@/routes/admin/gallery';
import type { Filters, GalleryPhoto, Paginated } from '@/types';

type GalleryProps = {
    photos: Paginated<GalleryPhoto>;
    filters: Filters;
};

function UploadPhotosForm() {
    const form = useForm<{ photos: File[] }>({ photos: [] });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        form.post(store.url(), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    return (
        <form
            onSubmit={submit}
            className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm"
        >
            <div>
                <h2 className="font-bold">Upload photos</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Selected photos are previewed below before you upload them.
                </p>
            </div>

            <PhotoPicker
                files={form.data.photos}
                onChange={(files) => form.setData('photos', files)}
            />
            <div className="space-y-1">
                {Object.entries(form.errors)
                    .filter(([key]) => key.startsWith('photos'))
                    .map(([key, message]) => (
                        <InputError key={key} message={message} />
                    ))}
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={form.processing || form.data.photos.length === 0}
                >
                    <Upload className="size-4" />
                    {form.processing
                        ? 'Uploading…'
                        : `Upload ${form.data.photos.length || ''} ${
                              form.data.photos.length === 1 ? 'photo' : 'photos'
                          }`.trim()}
                </Button>
            </div>
        </form>
    );
}

function CaptionFormDialog({
    photo,
    open,
    onOpenChange,
}: {
    photo: GalleryPhoto;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const form = useForm({ caption: photo.caption ?? '' });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        form.patch(update.url(photo.id), {
            preserveScroll: true,
            onSuccess: () => onOpenChange(false),
        });
    };

    return (
        <ResourceDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Edit photo"
            description="Add a caption to describe this photo."
        >
            <form onSubmit={submit} className="space-y-4">
                <img
                    src={photo.url}
                    alt={photo.caption ?? 'Gallery photo'}
                    className="max-h-64 w-full rounded-lg border border-border object-cover"
                />

                <FormField
                    label="Caption"
                    htmlFor="photo-caption"
                    optional
                    error={form.errors.caption}
                >
                    <Input
                        id="photo-caption"
                        value={form.data.caption}
                        onChange={(event) =>
                            form.setData('caption', event.target.value)
                        }
                        placeholder="Annual sports day"
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
                        Save changes
                    </Button>
                </div>
            </form>
        </ResourceDialog>
    );
}

export default function GalleryIndex({ photos, filters }: GalleryProps) {
    const [editing, setEditing] = useState<GalleryPhoto | null>(null);

    return (
        <>
            <Head title="Gallery" />
            <div className="space-y-6">
                <PageHeader
                    title="Gallery"
                    description="Upload and manage the photos shown on the public gallery page."
                />

                <UploadPhotosForm />

                <SearchInput
                    url={index.url()}
                    initialValue={filters.search}
                    placeholder="Search by caption…"
                />

                {photos.data.length === 0 ? (
                    <EmptyState
                        icon={ImageIcon}
                        title={
                            filters.search
                                ? 'No photos match your search'
                                : 'No photos yet'
                        }
                        description={
                            filters.search
                                ? 'Try a different keyword.'
                                : 'Use the uploader above to add your first photo.'
                        }
                    />
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                        {photos.data.map((photo) => (
                            <div
                                key={photo.id}
                                className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.caption ?? 'Gallery photo'}
                                    className="aspect-square w-full object-cover"
                                />
                                <div className="flex items-center gap-2 p-3">
                                    <p className="min-w-0 flex-1 truncate text-sm">
                                        {photo.caption ?? (
                                            <span className="text-muted-foreground">
                                                No caption
                                            </span>
                                        )}
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        aria-label="Edit photo"
                                        onClick={() => setEditing(photo)}
                                    >
                                        <Pencil className="size-4" />
                                    </Button>
                                    <DeleteButton
                                        url={destroy.url(photo.id)}
                                        title="Delete this photo?"
                                        description="The photo will be removed from the gallery."
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Pagination meta={photos} />
            </div>

            {editing && (
                <CaptionFormDialog
                    key={editing.id}
                    photo={editing}
                    open={editing !== null}
                    onOpenChange={(open) => !open && setEditing(null)}
                />
            )}
        </>
    );
}
