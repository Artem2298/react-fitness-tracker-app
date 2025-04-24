import React from 'react';

export function Textarea({ className = '', ...props }) {
    return (
        <textarea
            className={`w-full px-3 py-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:border-orange-500 ${className}`}
            rows={4}
            {...props}
        />
    );
}
