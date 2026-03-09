import { Tabs } from 'antd';
import { ApiOrder, OrderStatus } from './types/Order.types';

interface OrderTabsProps {
    orders: ApiOrder[] | undefined;
    activeTab: string;
    onChange: (key: string) => void;
}

const TAB_STATUSES: { key: string; label: string; status?: OrderStatus }[] = [
    { key: 'all',        label: 'All'        },
    { key: 'PENDING',    label: 'Pending',    status: 'PENDING'    },
    { key: 'PROCESSING', label: 'Processing', status: 'PROCESSING' },
    { key: 'SHIPPED',    label: 'Shipped',    status: 'SHIPPED'    },
    { key: 'DELIVERED',  label: 'Delivered',  status: 'DELIVERED'  },
    { key: 'CANCELLED',  label: 'Cancelled',  status: 'CANCELLED'  },
];

export default function OrderTabs({ orders = [], activeTab, onChange }: OrderTabsProps) {
    const getCount = (status?: OrderStatus) =>
        status ? orders.filter((o) => o.status === status).length : orders.length;

    const tabItems = TAB_STATUSES.map(({ key, label, status }) => ({
        key,
        label: `${label} (${getCount(status)})`,
    }));

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