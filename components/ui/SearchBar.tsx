'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useProductSuggestions } from '@/hooks/useProductSuggestions';
import { useDebounce } from '@/hooks/useDebounce';
import Image from 'next/image';

export default function SearchBar() {
    const router = useRouter();
    const [input, setInput] = useState('');
    const [show, setShow] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const debouncedQuery = useDebounce(input, 300);
    const { data: suggestions = [], isFetching } = useProductSuggestions(debouncedQuery);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShow(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSelect = (slug: string, name: string) => {
        setInput(name);
        setShow(false);
        router.push(`/products?search=${encodeURIComponent(slug)}`);
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setShow(false);
        router.push(`/products?search=${encodeURIComponent(input)}`);
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <form onSubmit={handleSubmit} className="flex">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setShow(true);
                        }}
                        onFocus={() => input.length >= 1 && setShow(true)}
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-l-lg text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-400 transition-colors bg-white"
                    />
                </div>
                <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-r-lg transition-colors"
                >
                    Search
                </button>
            </form>

            {show && input.length >= 1 && (
                <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-lg z-9999 overflow-hidden">

                    {isFetching && (
                        <div className="px-4 py-3 text-sm text-gray-400">
                            Searching...
                        </div>
                    )}

                    {!isFetching && suggestions.length === 0 && (
                        <div className="px-4 py-3 text-sm text-gray-400">
                            No results found for &quot;{input}&quot;
                        </div>
                    )}

                    {suggestions.map((s: any) => (
                        <div
                            key={s.id}
                            onMouseDown={() => handleSelect(s.slug, s.name)}
                            className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                {s.image ? (
                                    <Image
                                        src={s.image}
                                        alt={s.name}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200" />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-800 truncate">{s.name}</p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {s.category && <span>{s.category} · </span>}
                                    <span className="text-blue-600 font-medium">৳{s.price}</span>
                                </p>
                            </div>

                            <Search className="h-3.5 w-3.5 text-gray-300 shrink-0" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}