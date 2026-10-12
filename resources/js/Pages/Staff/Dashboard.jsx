import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function StaffDashboard({ auth, tickets, stats }) {
    function updateTicket(ticket, status, priority) {
        router.patch(
            route('staff.tickets.update', ticket.id),
            { status, priority },
            { preserveScroll: true }
        );
    }

    const cards = [
        {
            label: 'Total Tickets',
            value: stats.total,
            icon: '▤',
            color: 'blue',
        },
        {
            label: 'Open Tickets',
            value: stats.open,
            icon: '◷',
            color: 'amber',
        },
        {
            label: 'In Progress',
            value: stats.inProgress,
            icon: '↻',
            color: 'violet',
        },
        {
            label: 'Resolved Tickets',
            value: stats.closed,
            icon: '✓',
            color: 'emerald',
        },
    ];

    const cardColors = {
        blue: 'bg-blue-50 text-blue-700',
        amber: 'bg-amber-50 text-amber-700',
        violet: 'bg-violet-50 text-violet-700',
        emerald: 'bg-emerald-50 text-emerald-700',
    };

    const statusColors = {
        Open: 'bg-amber-50 text-amber-700 ring-amber-600/20',
        'In Progress':
            'bg-blue-50 text-blue-700 ring-blue-600/20',
        Closed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    };

    const priorityColors = {
        Low: 'bg-slate-100 text-slate-700',
        Medium: 'bg-amber-50 text-amber-700',
        High: 'bg-rose-50 text-rose-700',
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                            Administration
                        </p>
                        <h2 className="mt-1 text-xl font-bold text-gray-900">
                            Staff Dashboard
                        </h2>
                    </div>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        Administrator
                    </span>
                </div>
            }
        >
            <Head title="Staff Dashboard" />

            <div className="min-h-screen bg-slate-50 py-8 sm:py-10">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">

                    {/* Page heading */}
                    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-6 text-white shadow-lg sm:p-9">
                        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl" />

                        <div className="relative">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-100">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                HELPDESK ADMINISTRATION
                            </div>

                            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                                Support Ticket Management
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                                Welcome back,{' '}
                                <span className="font-semibold text-white">
                                    {auth.user.name}
                                </span>
                                . Monitor support requests, manage priorities,
                                and keep every ticket moving toward resolution.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-blue-50"
                                >
                                    <span aria-hidden="true">←</span>
                                    My Dashboard
                                </Link>

                                <span className="text-xs text-slate-400">
                                    Signed in as {auth.user.email}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Statistics */}
                    <section>
                        <div className="mb-4">
                            <h2 className="text-lg font-bold text-gray-900">
                                Overview
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                A summary of all support tickets in the system.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {cards.map((card) => (
                                <div
                                    key={card.label}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm font-medium text-slate-500">
                                            {card.label}
                                        </p>

                                        <div
                                            className={`flex h - 11 w - 11 items - center justify - center rounded - xl text - xl font - bold ${cardColors[card.color]} `}
                                            aria-hidden="true"
                                        >
                                            {card.icon}
                                        </div>
                                    </div>

                                    <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                                        {card.value}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Across all submitted tickets
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Ticket management */}
                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    All Support Tickets
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Review requests and update their status or priority.
                                </p>
                            </div>

                            <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                {tickets.total} total{' '}
                                {tickets.total === 1 ? 'ticket' : 'tickets'}
                            </span>
                        </div>

                        {tickets.data.length === 0 ? (
                            <div className="px-6 py-16 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-500">
                                    ▤
                                </div>
                                <h3 className="mt-4 font-semibold text-slate-900">
                                    No tickets yet
                                </h3>
                                <p className="mt-2 text-sm text-slate-500">
                                    Support requests will appear here when users submit them.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            {[
                                                'Ticket',
                                                'Submitted By',
                                                'Priority',
                                                'Status',
                                                'Actions',
                                            ].map((heading) => (
                                                <th
                                                    key={heading}
                                                    scope="col"
                                                    className="whitespace-nowrap px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500"
                                                >
                                                    {heading}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {tickets.data.map((ticket) => (
                                            <tr
                                                key={ticket.id}
                                                className="transition hover:bg-slate-50/80"
                                            >
                                                <td className="min-w-64 px-5 py-5">
                                                    <p className="font-semibold text-slate-900">
                                                        {ticket.title}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        Ticket #{ticket.id}
                                                        {' · '}
                                                        {ticket.created_at
                                                            ? new Date(
                                                                ticket.created_at
                                                            ).toLocaleDateString()
                                                            : 'Date unavailable'}
                                                    </p>

                                                    <Link
                                                        href={route(
                                                            'tickets.index'
                                                        )}
                                                        className="mt-2 inline-flex text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                                                    >
                                                        My ticket list
                                                        <span className="ml-1" aria-hidden="true">
                                                            →
                                                        </span>
                                                    </Link>
                                                </td>

                                                <td className="min-w-52 px-5 py-5">
                                                    <p className="text-sm font-semibold text-slate-800">
                                                        {ticket.user?.name ??
                                                            'Unknown user'}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {ticket.user?.email ?? ''}
                                                    </p>
                                                </td>

                                                <td className="px-5 py-5">
                                                    <div className="flex flex-col items-start gap-2">
                                                        <span
                                                            className={`inline - flex rounded - full px - 2.5 py - 1 text - xs font - semibold ${priorityColors[ticket.priority] ?? priorityColors.Medium} `}
                                                        >
                                                            {ticket.priority}
                                                        </span>

                                                        <select
                                                            aria-label={`Priority for ticket ${ticket.id}`}
                                                            defaultValue={ticket.priority}
                                                            id={`priority - ${ticket.id} `}
                                                            className="w-32 rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                        >
                                                            <option value="Low">
                                                                Low
                                                            </option>
                                                            <option value="Medium">
                                                                Medium
                                                            </option>
                                                            <option value="High">
                                                                High
                                                            </option>
                                                        </select>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-5">
                                                    <div className="flex flex-col items-start gap-2">
                                                        <span
                                                            className={`inline - flex whitespace - nowrap rounded - full px - 2.5 py - 1 text - xs font - semibold ring - 1 ring - inset ${statusColors[ticket.status] ?? 'bg-slate-100 text-slate-700 ring-slate-600/20'} `}
                                                        >
                                                            {ticket.status}
                                                        </span>

                                                        <select
                                                            aria-label={`Status for ticket ${ticket.id}`}
                                                            defaultValue={ticket.status}
                                                            id={`status - ${ticket.id} `}
                                                            className="w-36 rounded-lg border-slate-300 bg-white text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                        >
                                                            <option value="Open">
                                                                Open
                                                            </option>
                                                            <option value="In Progress">
                                                                In Progress
                                                            </option>
                                                            <option value="Closed">
                                                                Closed
                                                            </option>
                                                        </select>
                                                    </div>
                                                </td>

                                                <td className="whitespace-nowrap px-5 py-5">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const status =
                                                                document.getElementById(
                                                                    `status - ${ticket.id} `
                                                                ).value;

                                                            const priority =
                                                                document.getElementById(
                                                                    `priority - ${ticket.id} `
                                                                ).value;

                                                            updateTicket(
                                                                ticket,
                                                                status,
                                                                priority
                                                            );
                                                        }}
                                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                    >
                                                        Save Changes
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {tickets.links && tickets.links.length > 0 && (
                            <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                                <p className="text-sm text-slate-500">
                                    Showing{' '}
                                    <span className="font-semibold text-slate-800">
                                        {tickets.from ?? 0}–{tickets.to ?? 0}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-semibold text-slate-800">
                                        {tickets.total}
                                    </span>{' '}
                                    tickets
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {tickets.links.map((link, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            disabled={!link.url || link.active}
                                            onClick={() =>
                                                link.url &&
                                                router.visit(link.url, {
                                                    preserveScroll: true,
                                                })
                                            }
                                            className={`rounded - lg border px - 3 py - 2 text - sm font - medium transition ${link.active
                                                    ? 'border-blue-700 bg-blue-700 text-white'
                                                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                                                } disabled: cursor - not - allowed disabled: opacity - 40`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    <footer className="pb-2 text-center text-xs text-slate-400">
                        HelpDesk Ticket Management System
                    </footer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
