import React from 'react';

export function Input({ type = 'text', className = '', ...props }) {
    return (
        <input
            type={type}
            className={`w-full px-3 py-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:border-orange-500 ${className}`}
            {...props}
        />
    );
}
