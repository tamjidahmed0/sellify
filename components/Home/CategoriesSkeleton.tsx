import { Card, Skeleton } from 'antd'

const CategoriesSkeleton = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="text-center h-full">
                    <Skeleton.Avatar active size={80} className="mb-4" />
                    <Skeleton.Input active style={{ width: 80, height: 16 }} className="mb-2" />
                    <Skeleton.Input active style={{ width: 60, height: 14 }} />
                </Card>
            ))}
        </div>
    )
}

export default CategoriesSkeleton