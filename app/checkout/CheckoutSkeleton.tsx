import { Card, Skeleton } from 'antd';

export default function CheckoutSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Main form skeleton */}
            <div className="lg:col-span-2">
                <Card className="rounded-xl shadow-sm mb-6">
                    <Skeleton active paragraph={{ rows: 1 }} className="mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <Skeleton.Input active size="large" block />
                        <Skeleton.Input active size="large" block />
                    </div>
                    <Skeleton.Input active size="large" block className="mb-4" />
                    <Skeleton.Input active size="large" block className="mb-4" />
                    <Skeleton.Input active size="large" block className="mb-4" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <Skeleton.Input active size="large" block />
                        <Skeleton.Input active size="large" block />
                        <Skeleton.Input active size="large" block />
                    </div>
                    <Skeleton.Input active size="large" block className="mb-6" />
                    <div className="flex justify-between mt-8">
                        <Skeleton.Button active size="large" style={{ width: 120, height: 48 }} />
                        <Skeleton.Button active size="large" style={{ width: 180, height: 48 }} />
                    </div>
                </Card>
            </div>

            {/* Order summary skeleton */}
            <div className="hidden lg:block lg:col-span-1">
                <Card className="rounded-xl shadow-sm">
                    <Skeleton active paragraph={{ rows: 1 }} className="mb-4" />
                    <div className="space-y-3 mb-6 pb-6 border-b">
                        <div className="flex justify-between">
                            <Skeleton.Input active size="small" style={{ width: 140 }} />
                            <Skeleton.Input active size="small" style={{ width: 60 }} />
                        </div>
                        <div className="flex justify-between">
                            <Skeleton.Input active size="small" style={{ width: 160 }} />
                            <Skeleton.Input active size="small" style={{ width: 60 }} />
                        </div>
                        <div className="flex justify-between">
                            <Skeleton.Input active size="small" style={{ width: 120 }} />
                            <Skeleton.Input active size="small" style={{ width: 60 }} />
                        </div>
                    </div>
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                            <Skeleton.Input active size="small" style={{ width: 80 }} />
                            <Skeleton.Input active size="small" style={{ width: 70 }} />
                        </div>
                        <div className="flex justify-between">
                            <Skeleton.Input active size="small" style={{ width: 80 }} />
                            <Skeleton.Input active size="small" style={{ width: 70 }} />
                        </div>
                        <div className="flex justify-between">
                            <Skeleton.Input active size="small" style={{ width: 80 }} />
                            <Skeleton.Input active size="small" style={{ width: 70 }} />
                        </div>
                    </div>
                    <div className="border-t pt-4 flex justify-between">
                        <Skeleton.Input active size="default" style={{ width: 60 }} />
                        <Skeleton.Input active size="default" style={{ width: 90 }} />
                    </div>
                </Card>
            </div>
        </div>
    );
}