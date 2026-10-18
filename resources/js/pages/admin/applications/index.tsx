import { Head } from '@inertiajs/react';
import { ClipboardList } from 'lucide-react';
import { DeleteButton } from '@/components/admin/delete-button';
import { EmptyState } from '@/components/admin/empty-state';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { SearchInput } from '@/components/admin/search-input';
import { Badge } from '@/components/ui/badge';
import { destroy, index } from '@/routes/admin/applications';
import type { Application, Filters, Paginated } from '@/types';

type ApplicationsProps = {
    applications: Paginated<Application>;
    filters: Filters;
};

const dateLabel = (value: string): string =>
    new Date(value).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

export default function ApplicationsIndex({
    applications,
    filters,
}: ApplicationsProps) {
    return (
        <>
            <Head title="Applications" />
            <div className="space-y-6">
                <PageHeader
                    title="Applications"
                    description="Admission applications submitted from the website. These are read-only records."
                />

                <SearchInput
                    url={index.url()}
                    initialValue={filters.search}
                    placeholder="Search by name, phone, class…"
                />

                {applications.data.length === 0 ? (
                    <EmptyState
                        icon={ClipboardList}
                        title={
                            filters.search
                                ? 'No applications match your search'
                                : 'No applications yet'
                        }
                        description={
                            filters.search
                                ? 'Try a different keyword.'
                                : 'Applications submitted from the admission form will appear here.'
                        }
                    />
                ) : (
                    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b border-border bg-muted/50 text-left">
                                    <tr>
                                        <th className="px-5 py-3 font-bold whitespace-nowrap">
                                            Date
                                        </th>
                                        <th className="px-5 py-3 font-bold">
                                            Student
                                        </th>
                                        <th className="px-5 py-3 font-bold whitespace-nowrap">
                                            Class
                                        </th>
                                        <th className="px-5 py-3 font-bold whitespace-nowrap">
                                            Gender
                                        </th>
                                        <th className="px-5 py-3 font-bold">
                                            Parents
                                        </th>
                                        <th className="px-5 py-3 font-bold">
                                            Contact
                                        </th>
                                        <th className="px-5 py-3 font-bold">
                                            Branch
                                        </th>
                                        <th className="px-5 py-3 font-bold">
                                            Address
                                        </th>
                                        <th className="px-5 py-3 text-right font-bold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.data.map((application) => (
                                        <tr
                                            key={application.id}
                                            className="border-b border-border align-top last:border-0"
                                        >
                                            <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                                                {dateLabel(
                                                    application.created_at,
                                                )}
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="font-semibold">
                                                    {application.student_name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    DOB{' '}
                                                    {application.date_of_birth}
                                                </p>
                                                {application.previous_school && (
                                                    <p className="text-xs text-muted-foreground">
                                                        {
                                                            application.previous_school
                                                        }
                                                    </p>
                                                )}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap">
                                                <Badge variant="secondary">
                                                    {application.class_name}
                                                </Badge>
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap">
                                                {application.gender}
                                            </td>
                                            <td className="px-5 py-4">
                                                <p>{application.father_name}</p>
                                                <p className="text-muted-foreground">
                                                    {application.mother_name}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="whitespace-nowrap">
                                                    {application.phone}
                                                </p>
                                                {application.email && (
                                                    <p className="text-xs text-muted-foreground">
                                                        {application.email}
                                                    </p>
                                                )}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap">
                                                {application.branch}
                                            </td>
                                            <td className="max-w-52 px-5 py-4 text-muted-foreground">
                                                {application.address}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end">
                                                    <DeleteButton
                                                        url={destroy.url(
                                                            application.id,
                                                        )}
                                                        title="Delete this application?"
                                                        description="The application record will be permanently removed."
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

                <Pagination meta={applications} />
            </div>
        </>
    );
}
