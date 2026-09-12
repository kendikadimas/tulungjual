<?php

namespace App\Mail;

use App\Models\Listing;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ListingApproved extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Listing $listing) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Iklan Properti Anda Telah Disetujui — TulungJual.id',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.listing.approved',
            with: [
                'listing' => $this->listing,
                'listingUrl' => url('/listing/' . $this->listing->slug),
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
