import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category: 'Software',
        priority: 'Medium',
        status: 'Open',
    });

    function submit(e) {
        e.preventDefault();
        post(route('tickets.store'));
    }

    const fieldClass =
        'mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-bold text-slate-900">Create Ticket</h2>}
        >
            <Head title="Create Ticket" />

            <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
                <div className="mx-auto max-w-3xl">
                    <Link
                        href={route('tickets.index')}
                        className="text-sm font-semibold text-blue-700 hover:underline"
                    >
                        ← Back to My Tickets
                    </Link>

                    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Submit a support request
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Describe the issue so the support team can help you.
                        </p>

                        <form onSubmit={submit} className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-slate-700">
                                    Ticket title
                                </label>
                                <input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className={fieldClass}
                                    placeholder="e.g. Cannot access school portal"
                                    required
                                    minLength={5}
                                    maxLength={255}
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className={fieldClass}
                                    rows={5}
                                    placeholder="Explain what happened and what you already tried."
                                    required
                                    minLength={10}
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-semibold text-slate-700">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className={fieldClass}
                                    >
                                        {['Hardware', 'Software', 'Network', 'Account', 'Other'].map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                </div>

                                <div>
                                    <label htmlFor="priority" className="block text-sm font-semibold text-slate-700">
                                        Priority
                                    </label>
                                    <select
                                        id="priority"
                                        value={data.priority}
                                        onChange={(e) => setData('priority', e.target.value)}
                                        className={fieldClass}
                                    >
                                        {['Low', 'Medium', 'High', 'Urgent'].map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                        ))}
                                    </select>
                                    {errors.priority && <p className="mt-1 text-sm text-red-600">{errors.priority}</p>}
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-semibold text-slate-700">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className={fieldClass}
                                    >
                                        {['Open', 'In Progress', 'Resolved', 'Closed'].map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                        ))}
                                    </select>
                                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
                                <Link
                                    href={route('tickets.index')}
                                    className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Submitting...' : 'Submit Ticket'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}