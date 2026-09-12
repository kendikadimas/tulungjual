<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListingPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_listing_page_renders_with_empty_filters_as_object(): void
    {
        $response = $this->get('/listing');

        $response->assertOk();

        // Inertia embeds props in the data-page attribute (quotes HTML-escaped).
        // filters must serialize as a JSON object {}, not an array [].
        $this->assertStringContainsString('&quot;filters&quot;:{}', $response->getContent());
        $this->assertStringNotContainsString('&quot;filters&quot;:[]', $response->getContent());
    }
}
