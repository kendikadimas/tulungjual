import React from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function FlashMessage({ className = '' }) {
    const { flash } = usePage().props;

    const [showSuccess, setShowSuccess] = React.useState(false);
    const [showError, setShowError] = React.useState(false);

    React.useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const t = setTimeout(() => setShowSuccess(false), 4000);
            return () => clearTimeout(t);
        }
    }, [flash?.success]);

    React.useEffect(() => {
        if (flash?.error) {
            setShowError(true);
            const t = setTimeout(() => setShowError(false), 4000);
            return () => clearTimeout(t);
        }
    }, [flash?.error]);

    if (!showSuccess && !showError) return null;

    return (
        <div className={`space-y-3 ${className}`}>
            {showSuccess && flash?.success && (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-[#002B7F] text-sm font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#0070F3] shrink-0" />
                    <span className="flex-1">{flash.success}</span>
                    <button onClick={() => setShowSuccess(false)} className="text-blue-400 hover:text-blue-600 shrink-0">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
            {showError && flash?.error && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span className="flex-1">{flash.error}</span>
                    <button onClick={() => setShowError(false)} className="text-rose-400 hover:text-rose-600 shrink-0">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
