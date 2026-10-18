import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export function DeleteButton({
    url,
    title = 'Delete this item?',
    description = 'This action cannot be undone.',
    label = 'Delete',
    withLabel = false,
    className,
}: {
    url: string;
    title?: string;
    description?: string;
    label?: string;
    withLabel?: boolean;
    className?: string;
}) {
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const confirm = () => {
        router.delete(url, {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <>
            <Button
                type="button"
                variant={withLabel ? 'destructive' : 'ghost'}
                size={withLabel ? 'sm' : 'icon'}
                aria-label={label}
                className={cn(
                    !withLabel &&
                        'text-destructive hover:bg-destructive/10 hover:text-destructive',
                    className,
                )}
                onClick={() => setOpen(true)}
            >
                <Trash2 className="size-4" />
                {withLabel && label}
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirm}
                            disabled={processing}
                        >
                            {processing ? 'Deleting…' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
