'use client';

import { useState, useEffect, useRef } from 'react';
import { searchIcons } from './icon-actions';
import { Search, Loader2 } from 'lucide-react';

export default function IconPicker({ name, defaultValue }: { name: string, defaultValue?: string }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If there's a default value, we should ideally fetch its info, but for simplicity we can just set it as the value.
    if (defaultValue) {
      searchIcons(defaultValue).then(res => {
        const exact = res.find(r => r.slug === defaultValue);
        if (exact) setSelectedIcon(exact);
      });
    }
  }, [defaultValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length > 0) {
        setIsSearching(true);
        searchIcons(query).then(res => {
          setResults(res);
          setIsSearching(false);
        });
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative" ref={wrapperRef}>
      <input type="hidden" name={name} value={selectedIcon?.slug || defaultValue || ''} />
      
      {selectedIcon ? (
        <div className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-700 rounded-md">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill={`#${selectedIcon.hex}`}>
            <path d={selectedIcon.path} />
          </svg>
          <span className="text-white font-medium flex-1">{selectedIcon.title}</span>
          <button 
            type="button" 
            onClick={() => { setSelectedIcon(null); setIsOpen(true); }}
            className="text-sm text-zinc-400 hover:text-white px-2 py-1 bg-zinc-800 rounded"
          >
            Change
          </button>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Search technology icons (e.g. react, node)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
        </div>
      )}

      {isOpen && !selectedIcon && (
        <div className="absolute z-10 w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-md shadow-xl max-h-60 overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center p-4 text-zinc-400">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              <span>Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <ul className="py-1">
              {results.map(icon => (
                <li key={icon.slug}>
                  <button
                    type="button"
                    className="flex items-center w-full px-4 py-2 hover:bg-zinc-800 transition-colors text-left gap-3"
                    onClick={() => {
                      setSelectedIcon(icon);
                      setIsOpen(false);
                      setQuery('');
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={`#${icon.hex}`}>
                      <path d={icon.path} />
                    </svg>
                    <span className="text-white">{icon.title}</span>
                    <span className="text-zinc-500 text-xs ml-auto">{icon.slug}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : query.length > 0 ? (
            <div className="p-4 text-zinc-400 text-center text-sm">No icons found for "{query}"</div>
          ) : (
            <div className="p-4 text-zinc-500 text-center text-sm">Type to search over 3,000 technology icons</div>
          )}
        </div>
      )}
    </div>
  );
}
