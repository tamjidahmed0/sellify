'use client';

import { Card, Skeleton } from 'antd';

export default function CartSkeleton() {
  return (
    <div className="space-y-4">
      {/*  Cart items skeleton */}
      {[1, 2].map((i) => (
        <Card key={i}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton.Image className="w-32 h-32" />
            <div className="flex-1 flex flex-col justify-between space-y-2">
              <Skeleton.Input style={{ width: 200 }} active />
              <Skeleton.Input style={{ width: 100 }} active />
            </div>
          </div>
        </Card>
      ))}

      {/* Order summary skeleton */}
      <Card>
        <div className="space-y-2">
          <Skeleton.Input style={{ width: '80%' }} active />
          <Skeleton.Input style={{ width: '60%' }} active />
          <Skeleton.Input style={{ width: '40%' }} active />
          <Skeleton.Button active block />
        </div>
      </Card>
    </div>
  );
}
