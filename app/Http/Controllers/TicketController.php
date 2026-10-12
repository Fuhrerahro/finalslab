<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function index(Request $request): Response
    {
        $tickets = $request->user()
            ->tickets()
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->string('search')->toString();

                $query->where(function ($subQuery) use ($search) {
                    $subQuery->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->filled('status'), function ($query) use ($request) {
                $query->where('status', $request->input('status'));
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
            'filters' => $request->only('search', 'status'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Tickets/Create');
    }

    public function store(StoreTicketRequest $request): RedirectResponse
    {
        $request->user()->tickets()->create($request->validated());

        return redirect()
            ->route('tickets.index')
            ->with('success', 'Ticket created.');
    }

    public function show(Ticket $ticket): Response
    {
        Gate::authorize('view', $ticket);

        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket->load('user:id,name'),
        ]);
    }

    public function edit(Ticket $ticket): Response
    {
        $this->authorize('update', $ticket);

        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
        ]);
    }

    public function update(
        UpdateTicketRequest $request,
        Ticket $ticket
    ): RedirectResponse {
        $this->authorize('update', $ticket);

        $ticket->update($request->validated());

        return redirect()
            ->route('tickets.index')
            ->with('success', 'Ticket updated.');
    }

    public function destroy(Ticket $ticket): RedirectResponse
    {
        $this->authorize('delete', $ticket);

        $ticket->delete();

        return redirect()
            ->route('tickets.index')
            ->with('success', 'Ticket deleted.');
    }
}