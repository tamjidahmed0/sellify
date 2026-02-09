'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge, Drawer, Input } from 'antd';
import {
    ShoppingCart,
    Search,
    Menu,
    X,
    Heart,
    User,
    Store,
} from 'lucide-react';

const { Search: AntSearch } = Input;

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartCount] = useState(3);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'Categories', href: '/categories' },

    ];

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="flex items-center space-x-2">
                                <Store className="h-8 w-8 text-blue-600" />
                                <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    ShopHub
                                </span>
                            </Link>

                            <nav className="hidden lg:flex items-center space-x-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                            <AntSearch
                                placeholder="Search products..."
                                size="large"
                                prefix={<Search className="h-4 w-4 text-gray-400" />}
                                className="w-full"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                                <Heart className="h-6 w-6" />
                            </button>

                            <button className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                                <User className="h-6 w-6" />
                            </button>

                            <Link
                                href="/cart"
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                <Badge count={cartCount} showZero>
                                    <ShoppingCart className="h-6 w-6" />
                                </Badge>
                            </Link>

                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="lg:hidden text-gray-700"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Drawer
                title="Menu"
                placement="right"
                onClose={() => setMobileMenuOpen(false)}
                open={mobileMenuOpen}
                size={280}
            >
                <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-lg text-gray-700 hover:text-blue-600 font-medium py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </Drawer>
        </header>
    );
}
