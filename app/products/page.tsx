import { Suspense } from "react"
import ProductsPage from "./ProductContent"


const page = () => {
    return (
        <Suspense fallback={null}>
            <ProductsPage />
        </Suspense>
    )
}

export default page