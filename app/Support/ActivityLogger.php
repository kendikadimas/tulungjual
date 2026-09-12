<?php

namespace App\Support;

use App\Models\ActivityLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActivityLogger
{
    /**
     * Record an activity performed by the currently authenticated user.
     *
     * @param  array<string, mixed>  $meta
     */
    public static function log(
        string $action,
        string $category,
        string $description,
        ?Model $subject = null,
        array $meta = [],
        ?string $subjectLabel = null,
    ): ActivityLog {
        /** @var \App\Models\User|null $actor */
        $actor = Auth::user();
        $request = request();

        return ActivityLog::create([
            'user_id' => $actor?->id,
            'user_name' => $actor?->name,
            'user_role' => $actor?->role,
            'action' => $action,
            'category' => $category,
            'subject_type' => $subject ? $subject::class : null,
            'subject_id' => $subject?->getKey(),
            'subject_label' => $subjectLabel,
            'description' => $description,
            'meta' => ! empty($meta) ? $meta : null,
            'ip_address' => $request instanceof Request ? $request->ip() : null,
            'user_agent' => $request instanceof Request ? substr((string) $request->userAgent(), 0, 255) : null,
        ]);
    }
}
