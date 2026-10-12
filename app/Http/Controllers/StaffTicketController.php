<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class StaffTicketController extends Controller
{
    private function authorizeStaff(Request $request): void
    {
        abort_unless(
            in_array($request->user()->role, ['staff', 'admin'], true),
            403,
            'You are not authorized to access the staff dashboard.'
        );
    }

    public function index(Request $request): Response
    {
        $this->authorizeStaff($request);

        $tickets = Ticket::with(['user:id,name,email'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Staff/Dashboard', [
            'tickets' => $tickets,
            'stats' => [
                'total' => Ticket::count(),
                'open' => Ticket::where('status', 'Open')->count(),
                'inProgress' => Ticket::where('status', 'In Progress')->count(),
                'closed' => Ticket::where('status', 'Closed')->count(),
            ],
        ]);
    }

    public function update(
        Request $request,
        string $ticket
    ): RedirectResponse {
        $this->authorizeStaff($request);

        $validated = $request->validate([
            'status' => [
                'required',
                'in:Open,In Progress,Closed',
            ],
            'priority' => [
                'required',
                'in:Low,Medium,High',
            ],
        ]);

        $record = Ticket::findOrFail($ticket);
        $record->update($validated);

        return redirect()
            ->back()
            ->with('success', 'Ticket updated successfully.');
    }
}