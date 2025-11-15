import { useEffect, useState } from "react";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import { FaChevronDown, FaBars } from "react-icons/fa";
import { FiShoppingBag, FiStar, FiUser } from "react-icons/fi";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import Container from "./Container";
import { config } from "../../config";
import { getData } from "../lib";
import type { CategoryProps, ProductProps } from "../../type";
import ProductCard from "./ProductCard";
import { store } from "../lib/store";

const bottomNavigation = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/product" },
    { title: "Cart", link: "/cart" },
    { title: "Orders", link: "/orders" },
    { title: "Blog", link: "/blog" },
    { title: "My Account", link: "/profile" },
];

const Header = () => {
    const [searchText, setSearchText] = useState("");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const { cartProduct, favoriteProduct, currentUser } = store();

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getData(`${config?.baseUrl}/products`);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getData(`${config?.baseUrl}/categories`);
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Filter products by search
    useEffect(() => {
        const filtered = products.filter((item: ProductProps) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchText, products]);

    // Scroll hide/show
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowHeader(false); // scroll down → hide
            } else {
                setShowHeader(true); // scroll up → show
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div
            className={`w-full z-50 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            {/* Top header */}
            <div className="max-w-screen-xl mx-auto h-20 flex items-center justify-between px-4 lg:px-0">
                {/* Logo */}
                <Link to={"/"}>
                    <img src={logo} alt="logo" className="w-36 sm:w-44" />
                </Link>

                {/* Desktop SearchBar */}
                <div className="hidden md:inline-flex max-w-3xl w-full relative">
                    <input
                        type="text"
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        placeholder="Search products..."
                        className="w-full flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-1 focus:ring-darkText sm:text-sm px-4 py-2"
                    />
                    {searchText ? (
                        <IoClose
                            onClick={() => setSearchText("")}
                            className="absolute top-2.5 right-4 text-xl hover:text-red-500 cursor-pointer duration-200"
                        />
                    ) : (
                        <IoSearchOutline className="absolute top-2.5 right-4 text-xl" />
                    )}
                </div>

                {/* Icons + Mobile Menu Button */}
                <div className="flex items-center gap-x-4 sm:gap-x-6 text-2xl">
                    <Link to={"/profile"}>
                        {currentUser ? (
                            <img
                                src={currentUser?.avatar}
                                alt="profileImg"
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                            />
                        ) : (
                            <FiUser className="hover:text-sky-400 duration-200 cursor-pointer" />
                        )}
                    </Link>

                    <Link to={"/favorite"} className="relative block">
                        <FiStar className="hover:text-sky-400 duration-200 cursor-pointer" />
                        <span className="inline-flex items-center justify-center bg-red-500 text-white absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
                            {favoriteProduct?.length > 0
                                ? favoriteProduct?.length
                                : "0"}
                        </span>
                    </Link>

                    <Link to={"/cart"} className="relative block">
                        <FiShoppingBag className="hover:text-sky-400 duration-200 cursor-pointer" />
                        <span className="inline-flex items-center justify-center bg-red-500 text-white absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
                            {cartProduct?.length > 0 ? cartProduct?.length : "0"}
                        </span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="md:hidden focus:outline-none text-xl"
                    >
                        {mobileMenu ? <IoClose /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile SearchBar */}
            <div className="w-full mt-2 md:hidden relative px-4">
                <input
                    type="text"
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    placeholder="Search products..."
                    className="w-full rounded-full text-gray-900 text-base placeholder:text-sm placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-1 focus:ring-darkText px-4 py-2"
                />
                {searchText ? (
                    <IoClose
                        onClick={() => setSearchText("")}
                        className="absolute top-2.5 right-6 text-lg hover:text-red-500 cursor-pointer duration-200"
                    />
                ) : (
                    <IoSearchOutline className="absolute top-2.5 right-6 text-lg" />
                )}
            </div>

            {/* Search results */}
            {searchText && (
                <div className="absolute left-0 top-32 md:top-20 w-full mx-auto max-h-[500px] px-6 py-5 bg-white z-20 overflow-y-scroll text-black shadow-lg shadow-skyText scrollbar-hide">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                            {filteredProducts?.map((item: ProductProps) => (
                                <ProductCard
                                    key={item?._id}
                                    item={item}
                                    setSearchText={setSearchText}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-10 bg-gray-50 w-full flex items-center justify-center border border-gray-600 rounded-md">
                            <p className="text-xl font-normal">
                                Nothing matches with your search keywords{" "}
                                <span className="underline underline-offset-2 decoration-[1px] text-red-500 font-semibold">{`(${searchText})`}</span>
                                . Please try again
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Bottom navigation (desktop) */}
            <div className="hidden md:block w-full bg-gradient-to-bl bg-green-300 via-blue-300 from-cyan-300 text-whiteText">
                <Container className="py-2 max-w-4xl flex items-center gap-5 justify-between">
                    <Menu>
                        <MenuButton className="inline-flex items-center gap-2 rounded-md border border-gray-400 hover:border-white py-1.5 px-3 font-semibold text-black hover:text-white">
                            Select Category <FaChevronDown className="text-base mt-1" />
                        </MenuButton>
                        <Transition
                            enter="transition ease-out duration-75"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <MenuItems className="w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-gray-300 focus:outline-none hover:text-white z-50">
                                {categories.map((item: CategoryProps) => (
                                    <MenuItem key={item?._id}>
                                        <Link
                                            to={`/category/${item?._base}`}
                                            className="flex w-full items-center gap-2 rounded-lg py-2 px-3 hover:bg-white/20 tracking-wide"
                                        >
                                            <img
                                                src={item?.image}
                                                alt="categoryImage"
                                                className="w-6 h-6 rounded-md"
                                            />
                                            {item?.name}
                                        </Link>
                                    </MenuItem>
                                ))}
                            </MenuItems>
                        </Transition>
                    </Menu>

                    {bottomNavigation.map(({ title, link }) => (
                        <Link
                            to={link}
                            key={title}
                            className="uppercase text-sm font-semibold text-white/90 hover:text-white duration-200 relative overflow-hidden group"
                        >
                            {title}
                            <span className="inline-flex w-full h-[1px] bg-white absolute bottom-0 left-0 transform -translate-x-[105%] group-hover:translate-x-0 duration-300" />
                        </Link>
                    ))}
                </Container>
            </div>

            {/* Mobile dropdown menu */}
            {mobileMenu && (
                <div className="md:hidden bg-gradient-to-bl from-cyan-300 via-blue-300 to-green-300 text-black py-4 px-5 space-y-3">
                    <Menu>
                        <MenuButton className="inline-flex items-center gap-2 rounded-md border border-gray-400 py-1 px-3 font-semibold hover:text-white hover:border-white">
                            Select Category <FaChevronDown className="text-base mt-1" />
                        </MenuButton>
                        <Transition
                            enter="transition ease-out duration-75"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <MenuItems className="mt-2 w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm text-gray-300 focus:outline-none hover:text-white z-50">
                                {categories.map((item: CategoryProps) => (
                                    <MenuItem key={item?._id}>
                                        <Link
                                            to={`/category/${item?._base}`}
                                            className="flex w-full items-center gap-2 rounded-lg py-2 px-3 hover:bg-white/20 tracking-wide"
                                            onClick={() => setMobileMenu(false)}
                                        >
                                            <img
                                                src={item?.image}
                                                alt="categoryImage"
                                                className="w-6 h-6 rounded-md"
                                            />
                                            {item?.name}
                                        </Link>
                                    </MenuItem>
                                ))}
                            </MenuItems>
                        </Transition>
                    </Menu>

                    <div className="flex flex-col gap-2">
                        {bottomNavigation.map(({ title, link }) => (
                            <Link
                                to={link}
                                key={title}
                                onClick={() => setMobileMenu(false)}
                                className="uppercase text-sm font-semibold text-black hover:text-white duration-200"
                            >
                                {title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
