import { Skeleton } from 'antd'

const HeroSkeleton = () => {
    return (
        <div className="relative h-150 w-full overflow-hidden bg-gray-900">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="max-w-2xl w-full space-y-6">
                    <Skeleton.Input active style={{ width: 150, height: 24 }} />
                    <Skeleton.Input active style={{ width: 400, height: 60 }} />
                    <Skeleton.Input active style={{ width: 500, height: 24 }} />
                    <Skeleton.Button active style={{ width: 140, height: 48 }} />
                </div>
            </div>
        </div>
    )
}

export default HeroSkeleton