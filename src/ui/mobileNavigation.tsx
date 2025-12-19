
import { FiShoppingBag, FiStar, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { store } from "../lib/store";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import MobileSearchbar from "./mobileSearchbar";

function MobileNavigation() {

    const [mobileMenu, setMobileMenu] = useState(false);
    const { cartProduct, favoriteProduct, currentUser } = store();

    return (
        <div className="flex items-center gap-x-4 sm:gap-x-5 text-2xl">

            <MobileSearchbar />

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
                <span className="inline-flex items-center justify-center bg-cyan-500 text-white absolute -top-2 -right-2 text-[9px] rounded-full w-4 h-4">
                    {favoriteProduct?.length > 0
                        ? favoriteProduct?.length
                        : "0"}
                </span>
            </Link>

            <Link to={"/cart"} className="relative block">
                <FiShoppingBag className="hover:text-sky-400 duration-200 cursor-pointer" />
                <span className="inline-flex items-center justify-center bg-cyan-500 text-white absolute -top-2 -right-2  text-[9px] rounded-full w-4 h-4">
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
    )
}

export default MobileNavigation