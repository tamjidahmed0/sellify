'use client';

import { MessageSquare } from 'lucide-react';

interface RejectedNoticeProps {
    visible: boolean;
}

export default function RejectedNotice({ visible }: RejectedNoticeProps) {
    if (!visible) return null;

    return (
        <div className="mt-4 flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4">
            <MessageSquare className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
            <p className="text-xs text-red-500 leading-relaxed">
                Rejected reviews did not meet our community guidelines. You can edit and resubmit
                them for review.
            </p>
        </div>
    );
}