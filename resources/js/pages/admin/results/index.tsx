import { Head, useForm } from '@inertiajs/react';
import { Download, FileText, Pencil, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { DeleteButton } from '@/components/admin/delete-button';
import { EmptyState } from '@/components/admin/empty-state';
import { FormField } from '@/components/admin/form-field';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { ResourceDialog } from '@/components/admin/resource-dialog';
import { SearchInput } from '@/components/admin/search-input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CLASSES, formatSize } from '@/lib/site';
import { destroy, index, store, update } from '@/routes/admin/results';
import type { Filters, Paginated, ResultItem } from '@/types';

type ResultsProps = {
    results: Paginated<ResultItem>;
    filters: Filters;
};

const selectClass =
    'h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]';

function UploadResultsForm() {
    const form = useForm<{ class_name: string; files: File[] }>({
        class_name: CLASSES[0] ?? 'Class 1',
        files: [],
    });

    const removeFile = (index: number) => {
        form.setData(
            'files',
            form.data.files.filter((_, fileIndex) => fileIndex !== index),
        );
    };

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        form.post(store.url(), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => form.reset('files'),
        });
    };

    return (
        <form
            onSubmit={submit}
            className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm"
        >
            <div>
                <h2 className="font-bold">Upload result PDFs</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Choose the class, then select one or more PDF files.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    label="Class"
                    htmlFor="result-class"
                    required
                    error={form.errors.class_name}
                >
                    <select
                        id="result-class"
                        value={form.data.class_name}
                        onChange={(event) =>
                            form.setData('class_name', event.target.value)
                        }
                        className={selectClass}
                    >
                        {CLASSES.map((className) => (
                            <option key={className} value={className}>
                                {className}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="PDF files" required error={form.errors.files}>
                    <label className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-input bg-background px-3 text-sm font-semibold transition-colors hover:bg-accent">
                        <Upload className="size-4" />
                        Choose PDF files
                        <input
                            type="file"
                            accept="application/pdf"
                            multiple
                            className="sr-only"
                            onChange={(event) => {
                                form.setData('files', [
                                    ...form.data.files,
                                    ...Array.from(event.target.files ?? []),
                                ]);
                                event.target.value = '';
                            }}
                        />
                    </label>
                </FormField>
            </div>

            {Object.entries(form.errors)
                .filter(([key]) => key.startsWith('files'))
                .map(([key, message]) => (
                    <InputError key={key} message={message} />
                ))}

            {form.data.files.length > 0 && (
                <ul className="space-y-2">
                    {form.data.files.map((file, fileIndex) => (
                        <li
                            key={`${file.name}-${fileIndex}`}
                            className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-sm"
                        >
                            <FileText className="size-4 shrink-0 text-brand-red" />
                            <span className="min-w-0 flex-1 truncate">
                                {file.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {formatSize(file.size)}
                            </span>
                            <button
                                type="button"
                                aria-label={`Remove ${file.name}`}
                                onClick={() => removeFile(fileIndex)}
                                className="text-muted-foreground hover:text-destructive"
                            >
                                <X className="size-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={form.processing || form.data.files.length === 0}
                >
                    <Upload className="size-4" />
                    {form.processing ? 'Uploading…' : 'Upload results'}
                </Button>
            </div>
        </form>
    );
}

function ResultFormDialog({
    result,
    open,
    onOpenChange,
}: {
    result: ResultItem;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const form = useForm({
        title: result.title,
        class_name: result.class_name,
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        form.patch(update.url(result.id), {
            preserveScroll: true,
            onSuccess: () => onOpenChange(false),
        });
    };

    return (
        <ResourceDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Edit result"
            description="Rename the result or move it to another class."
        >
            <form onSubmit={submit} className="space-y-4">
                <FormField
                    label="Title"
                    htmlFor="result-title"
                    required
                    error={form.errors.title}
                >
                    <Input
                        id="result-title"
                        value={form.data.title}
                        onChange={(event) =>
                            form.setData('title', event.target.value)
                        }
                    />
                </FormField>

                <FormField
                    label="Class"
                    htmlFor="result-edit-class"
                    required
                    error={form.errors.class_name}
                >
                    <select
                        id="result-edit-class"
                        value={form.data.class_name}
                        onChange={(event) =>
                            form.setData('class_name', event.target.value)
                        }
                        className={selectClass}
                    >
                        {CLASSES.map((className) => (
                            <option key={className} value={className}>
                                {className}
                            </option>
                        ))}
                    </select>
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

export default function ResultsIndex({ results, filters }: ResultsProps) {
    const [editing, setEditing] = useState<ResultItem | null>(null);

    return (
        <>
            <Head title="Results" />
            <div className="space-y-6">
                <PageHeader
                    title="Results"
                    description="Upload result PDFs per class and manage the published files."
                />

                <UploadResultsForm />

                <SearchInput
                    url={index.url()}
                    initialValue={filters.search}
                    placeholder="Search results…"
                />

                {results.data.length === 0 ? (
                    <EmptyState
                        icon={FileText}
                        title={
                            filters.search
                                ? 'No results match your search'
                                : 'No results yet'
                        }
                        description={
                            filters.search
                                ? 'Try a different keyword.'
                                : 'Upload a result PDF to publish it on the website.'
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
                                            Class
                                        </th>
                                        <th className="px-5 py-3 font-bold whitespace-nowrap">
                                            Size
                                        </th>
                                        <th className="px-5 py-3 text-right font-bold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.data.map((result) => (
                                        <tr
                                            key={result.id}
                                            className="border-b border-border last:border-0"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="size-4 shrink-0 text-brand-red" />
                                                    <span className="font-semibold">
                                                        {result.title}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                                                {result.class_name}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                                                {formatSize(result.file_size)}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        asChild
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <a
                                                            href={result.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            aria-label="Open PDF"
                                                        >
                                                            <Download className="size-4" />
                                                        </a>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label="Edit result"
                                                        onClick={() =>
                                                            setEditing(result)
                                                        }
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                    <DeleteButton
                                                        url={destroy.url(
                                                            result.id,
                                                        )}
                                                        title="Delete this result?"
                                                        description="The PDF will be permanently removed."
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

                <Pagination meta={results} />
            </div>

            {editing && (
                <ResultFormDialog
                    key={editing.id}
                    result={editing}
                    open={editing !== null}
                    onOpenChange={(open) => !open && setEditing(null)}
                />
            )}
        </>
    );
}
