<?php

namespace App\Mail;

use App\Models\Listing;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ListingRejected extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Listing $listing) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Iklan Properti Anda Ditolak — TulungJual.id',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.listing.rejected',
            with: [
                'listing' => $this->listing,
                'editUrl' => url('/iklan-saya/' . $this->listing->id . '/edit'),
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
