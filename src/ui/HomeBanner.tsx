
import { Stock } from "../assets";
import Container from "./Container";
import LinkButton from "./LinkButton";

const HomeBanner = () => {
    return (
        <Container className="relative py-5 overflow-hidden">
            <div className="relative">
                <img
                    src={Stock}
                    alt="homeBanner"
                    className="w-full h-[600px] object-cover rounded-md"
                />

                {/* Black overlay */}
                <div className="absolute inset-0 bg-black/10 rounded-md" />

                {/* Button with Tailwind px positioning */}
                <div className="absolute right-55 bottom-10">
                    <LinkButton className="w-44 flex items-center justify-center bg-white text-black hover:bg-cyan-400 hover:text-white duration-200" />
                </div>
            </div>
        </Container>

    );
};

export default HomeBanner;
