import { useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";

function MobileSearchbar() {
    const [searchText, setSearchText] = useState("");

    return (
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
    )
}

export default MobileSearchbar