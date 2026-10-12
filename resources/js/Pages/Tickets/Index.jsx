
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

function StatusBadge({ status }) {
    const styles = {
        Open: 'bg-blue-100 text-blue-700',
        'In Progress': 'bg-amber-100 text-amber-700',
        Resolved: 'bg-emerald-100 text-emerald-700',
        Closed: 'bg-gray-100 text-gray-700',
    };

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || styles.Open}`}>
            {status}
        </span>
    );
}

function PriorityBadge({ priority }) {
    const styles = {
        Low: 'bg-gray-100 text-gray-700',
        Medium: 'bg-blue-100 text-blue-700',
        High: 'bg-orange-100 text-orange-700',
        Urgent: 'bg-red-100 text-red-700',
    };

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[priority] || styles.Medium}`}>
            {priority}
        </span>
    );
}

export default function Index({ tickets, filters = {} }) {
    const { flash = {} } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    function applyFilters(event) {
        event.preventDefault();

        router.get(
            route('tickets.index'),
            { search, status },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    }

    function deleteTicket(ticket) {
        if (!window.confirm(`Are you sure you want to delete "${ticket.title}"?`)) {
            return;
        }

        router.delete(route('tickets.destroy', ticket.id), {
            preserveScroll: true,
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-bold text-gray-800">My Support Tickets</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        View and manage your help desk requests.
                    </p>
                </div>
            }
        >
            <Head title="My Tickets" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                            {flash.success}
                        </div>
                    )}

                    <div className="flex flex-col justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Tickets</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Track the progress of your support requests.
                            </p>
                        </div>

                        <Link
                            href={route('tickets.create')}
                            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            + Create New Ticket
                        </Link>
                    </div>

                    <form
                        onSubmit={applyFilters}
                        className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm sm:flex-row"
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search ticket title or description..."
                            className="min-w-0 flex-1 rounded-xl border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />

                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                            className="rounded-xl border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">All statuses</option>
                            {statuses.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700"
                        >
                            Search
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setSearch('');
                                setStatus('');
                                router.get(route('tickets.index'));
                            }}
                            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Reset
                        </button>
                    </form>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                        {tickets.data.length === 0 ? (
                            <div className="px-6 py-16 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-2xl">
                                    🎫
                                </div>
                                <h3 className="mt-4 text-lg font-bold text-gray-900">
                                    No tickets found
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Create a ticket or adjust your search filters.
                                </p>
                                <Link
                                    href={route('tickets.create')}
                                    className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                                >
                                    Create a Ticket
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Mobile ticket cards */}
                                <div className="divide-y divide-gray-100 md:hidden">
                                    {tickets.data.map((ticket) => (
                                        <div key={ticket.id} className="space-y-3 p-5">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="text-xs font-medium text-gray-400">
                                                        TICKET #{ticket.id}
                                                    </p>
                                                    <Link
                                                        href={route('tickets.show', ticket.id)}
                                                        className="mt-1 block break-words font-semibold text-gray-900 hover:text-indigo-600"
                                                    >
                                                        {ticket.title}
                                                    </Link>
                                                </div>
                                                <StatusBadge status={ticket.status} />
                                            </div>

                                            <p className="text-sm text-gray-500">
                                                {ticket.category} · Created{' '}
                                                {new Date(ticket.created_at).toLocaleDateString()}
                                            </p>

                                            <div className="flex items-center justify-between gap-3">
                                                <PriorityBadge priority={ticket.priority} />
                                                <div className="flex gap-3 text-sm font-semibold">
                                                    <Link
                                                        href={route('tickets.edit', ticket.id)}
                                                        className="text-indigo-600 hover:text-indigo-800"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteTicket(ticket)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop ticket table */}
                                <div className="hidden overflow-x-auto md:block">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {['Ticket', 'Category', 'Priority', 'Status', 'Created', 'Actions'].map((heading) => (
                                                    <th
                                                        key={heading}
                                                        className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                                                    >
                                                        {heading}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100">
                                            {tickets.data.map((ticket) => (
                                                <tr key={ticket.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <p className="text-xs text-gray-400">#{ticket.id}</p>
                                                        <Link
                                                            href={route('tickets.show', ticket.id)}
                                                            className="mt-1 block font-semibold text-gray-900 hover:text-indigo-600"
                                                        >
                                                            {ticket.title}
                                                        </Link>
                                                        <p className="mt-1 max-w-xs truncate text-sm text-gray-500">
                                                            {ticket.description}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {ticket.category}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <PriorityBadge priority={ticket.priority} />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <StatusBadge status={ticket.status} />
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {new Date(ticket.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold">
                                                        <div className="flex gap-3">
                                                            <Link
                                                                href={route('tickets.show', ticket.id)}
                                                                className="text-gray-700 hover:text-indigo-600"
                                                            >
                                                                View
                                                            </Link>
                                                            <Link
                                                                href={route('tickets.edit', ticket.id)}
                                                                className="text-indigo-600 hover:text-indigo-800"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                onClick={() => deleteTicket(ticket)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {tickets.links && tickets.links.length > 3 && (
                                    <div className="flex flex-wrap items-center justify-center gap-2 border-t border-gray-100 p-5">
                                        {tickets.links.map((link, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                disabled={!link.url}
                                                onClick={() => link.url && router.visit(link.url)}
                                                className={`rounded-lg px-3 py-2 text-sm ${link.active
                                                        ? 'bg-indigo-600 font-semibold text-white'
                                                        : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                                                    } disabled:cursor-not-allowed disabled:opacity-40`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
