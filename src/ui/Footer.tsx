
import Container from "./Container";
import { payment } from "../assets";
import FooterTop from "./FooterTop";

const Footer = () => {
    return (
        <div className="mt-10">
            <FooterTop />
            <Container className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <p>@2025 <span className="text-green-400">Gadgets</span>. All rights reserved.</p>
                <img src={payment} alt="payment-img" className="object-cover" />
            </Container>
        </div>
    );
};

export default Footer;
