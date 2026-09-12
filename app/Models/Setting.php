<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    protected $fillable = ['key', 'value', 'group'];

    public const CACHE_KEY = 'tulungjual.settings';

    /**
     * Ambil nilai setting berdasarkan key.
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $settings = static::allCached();

        return $settings[$key] ?? $default;
    }

    /**
     * Set / update nilai setting.
     */
    public static function set(string $key, mixed $value, string $group = 'general'): void
    {
        static::updateOrCreate(
            ['key' => $key],
            ['value' => is_bool($value) ? ($value ? '1' : '0') : (string) $value, 'group' => $group],
        );

        Cache::forget(self::CACHE_KEY);
    }

    /**
     * Set banyak setting sekaligus.
     *
     * @param  array<string, mixed>  $values
     */
    public static function setMany(array $values, string $group = 'general'): void
    {
        foreach ($values as $key => $value) {
            static::updateOrCreate(
                ['key' => $key],
                ['value' => is_bool($value) ? ($value ? '1' : '0') : (string) $value, 'group' => $group],
            );
        }

        Cache::forget(self::CACHE_KEY);
    }

    /**
     * @return array<string, string|null>
     */
    public static function allCached(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, function () {
            return static::query()->pluck('value', 'key')->toArray();
        });
    }

    public static function flushCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    /**
     * Konfigurasi pembayaran untuk frontend.
     *
     * @return array<string, mixed>
     */
    public static function paymentConfig(): array
    {
        $instructions = static::get('payment_instructions', '');

        return [
            'enabled' => (bool) static::get('payment_enabled', true),
            'amount' => (int) static::get('payment_amount', 0),
            'bank_name' => static::get('payment_bank_name', ''),
            'bank_account' => static::get('payment_bank_account', ''),
            'bank_holder' => static::get('payment_bank_holder', ''),
            'instructions' => array_values(array_filter(array_map('trim', explode("\n", (string) $instructions)))),
            'wa_confirmation' => static::get('payment_wa_confirmation', ''),
        ];
    }
}
