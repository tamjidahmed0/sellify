'use client';

import { Tabs } from 'antd';

interface TabCounts {
    all: number;
  
}

interface ReviewTabsProps {
    activeTab: string;
    tabCounts: TabCounts;
    onChange: (key: string) => void;
}

export default function ReviewTabs({ activeTab, tabCounts, onChange }: ReviewTabsProps) {
    const tabItems = [
        { key: 'all', label: `All (${tabCounts.all})` },

    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-x-auto">
            <Tabs
                activeKey={activeTab}
                onChange={onChange}
                items={tabItems}
                className="px-4"
                tabBarStyle={{ marginBottom: 0 }}
            />
        </div>
    );
}