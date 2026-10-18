import { ImagePlus, X } from 'lucide-react';
import { useEffect, useMemo } from 'react';

export function PhotoPicker({
    files,
    onChange,
}: {
    files: File[];
    onChange: (files: File[]) => void;
}) {
    const previews = useMemo(
        () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
        [files],
    );

    useEffect(() => {
        return () =>
            previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    }, [previews]);

    const remove = (index: number) => {
        onChange(files.filter((_, fileIndex) => fileIndex !== index));
    };

    return (
        <div className="space-y-3">
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/40 px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-accent">
                <ImagePlus className="size-6 text-muted-foreground" />
                <span className="text-sm font-semibold">
                    Click to choose photos
                </span>
                <span className="text-xs text-muted-foreground">
                    JPG, PNG or WEBP &middot; up to 5 MB each
                </span>
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="sr-only"
                    onChange={(event) => {
                        onChange([
                            ...files,
                            ...Array.from(event.target.files ?? []),
                        ]);
                        event.target.value = '';
                    }}
                />
            </label>

            {previews.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {previews.map((preview, index) => (
                        <div
                            key={preview.url}
                            className="relative overflow-hidden rounded-lg border border-border"
                        >
                            <img
                                src={preview.url}
                                alt={preview.file.name}
                                className="aspect-square w-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                aria-label={`Remove ${preview.file.name}`}
                                className="absolute top-2 right-2 rounded-full bg-background/90 p-1 text-destructive shadow hover:bg-background"
                            >
                                <X className="size-4" />
                            </button>
                            <span className="absolute inset-x-0 bottom-0 truncate bg-black/60 px-2 py-1 text-xs text-white">
                                {preview.file.name}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
