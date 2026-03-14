import Categories from "@/components/Home/Categories";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Hero from "@/components/Home/Hero";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />

      </main>
      <Footer />
    </div>
  );
}
