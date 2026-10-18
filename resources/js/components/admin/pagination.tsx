import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { Paginated } from '@/types';

function decodeLabel(label: string): string {
    return (
        label
            .replace(/&laquo;/g, '')
            .replace(/&raquo;/g, '')
            .replace(/&hellip;/g, '…')
            .trim() || '…'
    );
}

export function Pagination({ meta }: { meta: Paginated<unknown> }) {
    if (meta.total === 0) {
        return null;
    }

    if (meta.last_page <= 1) {
        return (
            <p className="text-sm text-muted-foreground">
                Showing {meta.total} {meta.total === 1 ? 'item' : 'items'}
            </p>
        );
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold">{meta.from}</span>–
                <span className="font-semibold">{meta.to}</span> of{' '}
                <span className="font-semibold">{meta.total}</span>
            </p>
            <div className="flex flex-wrap items-center gap-1">
                {meta.links.map((link, index) =>
                    link.url ? (
                        <Link
                            key={index}
                            href={link.url}
                            preserveScroll
                            className={cn(
                                'min-w-9 rounded-md border border-border px-3 py-1.5 text-center text-sm font-medium transition-colors',
                                link.active
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'bg-card hover:bg-accent',
                            )}
                        >
                            {decodeLabel(link.label)}
                        </Link>
                    ) : (
                        <span
                            key={index}
                            className="min-w-9 rounded-md border border-border px-3 py-1.5 text-center text-sm text-muted-foreground/50"
                        >
                            {decodeLabel(link.label)}
                        </span>
                    ),
                )}
            </div>
        </div>
    );
}
