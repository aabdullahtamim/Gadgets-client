import "react-multi-carousel/lib/styles.css";
import BannerCategories from "./ui/BannerCategories";
import HomeBanner from "./ui/HomeBanner";
import Categories from "./ui/Categories";
import ProductList from "./ui/ProductList";
import DiscountedBanner from "./ui/DiscountedBanner";
import Blog from "./ui/Blog";
import Highlights from "./ui/Highlights";

function App() {
  return (
    <main>
      <BannerCategories />
      <HomeBanner />
      <Highlights />
      <Categories />
      {/* ProductList */}
      <ProductList />
      {/* DiscountedBanner */}
      <DiscountedBanner />
      {/* Blog */}
      <Blog />
    </main>
  );
}

export default App;
