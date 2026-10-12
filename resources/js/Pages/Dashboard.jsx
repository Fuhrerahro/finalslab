
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

function StatusBadge({ status }) {
    const styles = {
        Open: 'bg-blue-100 text-blue-700',
        'In Progress': 'bg-amber-100 text-amber-700',
        Closed: 'bg-green-100 text-green-700',
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-700'
                }`}
        >
            {status}
        </span>
    );
}

function PriorityBadge({ priority }) {
    const styles = {
        Low: 'bg-gray-100 text-gray-700',
        Medium: 'bg-orange-100 text-orange-700',
        High: 'bg-red-100 text-red-700',
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[priority] || 'bg-gray-100 text-gray-700'
                }`}
        >
            {priority}
        </span>
    );
}

export default function Dashboard({ auth, stats, recentTickets }) {
    const cards = [
        {
            title: 'Total Tickets',
            value: stats.total,
            description: 'All your support requests',
            icon: '🎫',
            color: 'bg-blue-100',
        },
        {
            title: 'Open',
            value: stats.open,
            description: 'Waiting for attention',
            icon: '📬',
            color: 'bg-sky-100',
        },
        {
            title: 'In Progress',
            value: stats.inProgress,
            description: 'Currently being handled',
            icon: '⚙️',
            color: 'bg-amber-100',
        },
        {
            title: 'Closed',
            value: stats.closed,
            description: 'Resolved requests',
            icon: '✓',
            color: 'bg-green-100',
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">

                    {/* Welcome banner */}
                    <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white shadow-sm sm:p-9">
                        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
                                    Support Center
                                </p>

                                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                                    Welcome back, {auth.user.name}!
                                </h1>

                                <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                                    Manage your support requests, monitor
                                    ticket progress, and keep track of your
                                    issues in one place.
                                </p>
                            </div>

                            <Link
                                href={route('tickets.create')}
                                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 shadow transition hover:bg-blue-50"
                            >
                                + Create Ticket
                            </Link>
                        </div>
                    </section>

                    {/* Live statistics */}
                    <section>
                        <div className="mb-4">
                            <h2 className="text-lg font-bold text-gray-900">
                                Ticket Overview
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                A summary of your current support requests.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            {cards.map((card) => (
                                <div
                                    key={card.title}
                                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-500">
                                            {card.title}
                                        </p>

                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${card.color}`}
                                        >
                                            {card.icon}
                                        </div>
                                    </div>

                                    <p className="mt-4 text-3xl font-bold text-gray-900">
                                        {card.value}
                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">
                                        {card.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Recent tickets */}
                    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex flex-col justify-between gap-3 border-b border-gray-200 p-5 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Recent Tickets
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Your five latest support requests.
                                </p>
                            </div>

                            <Link
                                href={route('tickets.index')}
                                className="text-sm font-semibold text-blue-700 hover:text-blue-900"
                            >
                                View all tickets →
                            </Link>
                        </div>

                        {recentTickets.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <div className="text-4xl">🎫</div>

                                <h3 className="mt-3 font-semibold text-gray-900">
                                    No tickets yet
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Create your first support ticket to get
                                    started.
                                </p>

                                <Link
                                    href={route('tickets.create')}
                                    className="mt-5 inline-flex rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                                >
                                    Create your first ticket
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Ticket
                                                </th>
                                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Priority
                                                </th>
                                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Status
                                                </th>
                                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Created
                                                </th>
                                                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100 bg-white">
                                            {recentTickets.map((ticket) => (
                                                <tr
                                                    key={ticket.id}
                                                    className="transition hover:bg-gray-50"
                                                >
                                                    <td className="px-5 py-4">
                                                        <p className="font-semibold text-gray-900">
                                                            {ticket.title}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            Ticket #{ticket.id}
                                                        </p>
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4">
                                                        <PriorityBadge
                                                            priority={ticket.priority}
                                                        />
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4">
                                                        <StatusBadge
                                                            status={ticket.status}
                                                        />
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                                                        {new Date(
                                                            ticket.created_at
                                                        ).toLocaleDateString()}
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-right">
                                                        <Link
                                                            href={route(
                                                                'tickets.show',
                                                                ticket.id
                                                            )}
                                                            className="font-semibold text-blue-700 hover:text-blue-900"
                                                        >
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="border-t border-gray-200 bg-gray-50 px-5 py-3 text-sm text-gray-500">
                                    Showing {recentTickets.length} recent
                                    {recentTickets.length === 1
                                        ? ' ticket'
                                        : ' tickets'}
                                </div>
                            </>
                        )}
                    </section>

                    {/* Quick actions */}
                    <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Link
                            href={route('tickets.create')}
                            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
                                    +
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        Submit a Request
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Tell us about an issue you need help
                                        with.
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            href={route('profile.edit')}
                            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl">
                                    👤
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        Account Settings
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Manage your profile information.
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </section>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
