import { ImagePlus, X } from 'lucide-react';
import { useEffect, useMemo } from 'react';

export function ImagePicker({
    file,
    currentUrl,
    onChange,
}: {
    file: File | null;
    currentUrl?: string | null;
    onChange: (file: File | null) => void;
}) {
    const preview = useMemo(
        () => (file ? URL.createObjectURL(file) : null),
        [file],
    );

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const image = preview ?? currentUrl ?? null;

    return (
        <div className="space-y-3">
            {image && (
                <div className="relative w-fit overflow-hidden rounded-xl border border-border">
                    <img
                        src={image}
                        alt="Selected portrait"
                        className="aspect-[4/5] w-40 object-cover object-top"
                    />
                    {file && (
                        <button
                            type="button"
                            onClick={() => onChange(null)}
                            aria-label="Remove selected portrait"
                            className="absolute top-2 right-2 rounded-full bg-background/90 p-1 text-destructive shadow hover:bg-background"
                        >
                            <X className="size-4" />
                        </button>
                    )}
                </div>
            )}

            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/40 px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-accent">
                <ImagePlus className="size-6 text-muted-foreground" />
                <span className="text-sm font-semibold">
                    {image
                        ? 'Choose a different portrait'
                        : 'Choose a portrait'}
                </span>
                <span className="text-xs text-muted-foreground">
                    JPG, PNG or WEBP &middot; up to 5 MB
                </span>
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={(event) => {
                        onChange(event.target.files?.[0] ?? null);
                        event.target.value = '';
                    }}
                />
            </label>
        </div>
    );
}
