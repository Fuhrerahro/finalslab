
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

function Badge({ value, styles }) {
    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[value] || 'bg-gray-100 text-gray-700'}`}>
            {value}
        </span>
    );
}

export default function Show({ ticket }) {
    const { auth } = usePage().props;
    const isStaff = ['admin', 'staff'].includes(auth?.user?.role);

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Ticket Details</h2>
                    <p className="mt-1 text-sm text-gray-500">Ticket #{ticket.id}</p>
                </div>
            }
        >
            <Head title={`Ticket #${ticket.id}`} />

            <div className="py-8">
                <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <Link
                        href={route('tickets.index')}
                        className="inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                        ← Back to My Tickets
                    </Link>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                        <div className="border-b border-gray-100 p-6 sm:p-8">
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                <div>
                                    <p className="text-sm font-semibold text-gray-400">
                                        TICKET #{ticket.id}
                                    </p>
                                    <h1 className="mt-2 break-words text-2xl font-bold text-gray-900">
                                        {ticket.title}
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Submitted {new Date(ticket.created_at).toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Badge
                                        value={ticket.status}
                                        styles={{
                                            Open: 'bg-blue-100 text-blue-700',
                                            'In Progress': 'bg-amber-100 text-amber-700',
                                            Resolved: 'bg-emerald-100 text-emerald-700',
                                            Closed: 'bg-gray-100 text-gray-700',
                                        }}
                                    />
                                    <Badge
                                        value={ticket.priority}
                                        styles={{
                                            Low: 'bg-gray-100 text-gray-700',
                                            Medium: 'bg-blue-100 text-blue-700',
                                            High: 'bg-orange-100 text-orange-700',
                                            Urgent: 'bg-red-100 text-red-700',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 p-6 sm:p-8">
                            <div>
                                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                                    Category
                                </h2>
                                <p className="mt-2 text-gray-900">{ticket.category}</p>
                            </div>

                            <div>
                                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                                    Description
                                </h2>
                                <p className="mt-2 whitespace-pre-wrap break-words leading-7 text-gray-700">
                                    {ticket.description}
                                </p>
                            </div>

                            {ticket.user && (
                                <div>
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                                        Submitted By
                                    </h2>
                                    <p className="mt-2 text-gray-900">{ticket.user.name}</p>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-6">
                                <Link
                                    href={route('tickets.edit', ticket.id)}
                                    className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                                >
                                    Edit Ticket
                                </Link>

                                {isStaff && (
                                    <Link
                                        href={route('staff.dashboard')}
                                        className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                    >
                                        Staff Dashboard
                                    </Link>
                                )}

                                <Link
                                    href={route('tickets.index')}
                                    className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Back to List
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
