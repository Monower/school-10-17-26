import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';

export function SearchInput({
    url,
    initialValue = '',
    placeholder = 'Search…',
}: {
    url: string;
    initialValue?: string;
    placeholder?: string;
}) {
    const [value, setValue] = useState(initialValue);
    const skipFirstRun = useRef(true);

    useEffect(() => {
        if (skipFirstRun.current) {
            skipFirstRun.current = false;

            return;
        }

        const handle = window.setTimeout(() => {
            router.get(url, value.trim() ? { search: value.trim() } : {}, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 350);

        return () => window.clearTimeout(handle);
    }, [value, url]);

    return (
        <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={placeholder}
                aria-label={placeholder}
                className="pl-9"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => setValue('')}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                    <X className="size-4" />
                </button>
            )}
        </div>
    );
}
