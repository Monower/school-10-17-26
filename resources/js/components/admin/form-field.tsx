import type { ReactNode } from 'react';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';

export function FormField({
    label,
    htmlFor,
    required = false,
    optional = false,
    error,
    hint,
    children,
}: {
    label: string;
    htmlFor?: string;
    required?: boolean;
    optional?: boolean;
    error?: string;
    hint?: string;
    children: ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
                <Label htmlFor={htmlFor} className="text-sm font-semibold">
                    {label}
                    {required && (
                        <span
                            className="ml-0.5 text-destructive"
                            aria-hidden="true"
                        >
                            *
                        </span>
                    )}
                </Label>
                {optional && (
                    <span className="text-xs font-medium text-muted-foreground">
                        Optional
                    </span>
                )}
            </div>
            {children}
            {hint && !error && (
                <p className="text-xs text-muted-foreground">{hint}</p>
            )}
            <InputError message={error} />
        </div>
    );
}
