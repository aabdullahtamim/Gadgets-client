import { loadStripe } from "@stripe/stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import { store } from "../lib/store";
import { config } from "../../config";
import type { ProductProps } from "../../type";

const CheckoutBtn = ({ products }: { products: ProductProps[] }) => {
    const { currentUser } = store();
    const publishableKey =
        "pk_test_51PWdLHKMztBLVeWcnAmD76Kho5WePBJleYTv7IIBk6TiAwmEL8TjP7CenwBI2rFHVnBYT0LIr6IR7WqkYijqtfrF00W96lGlPV";

    // Stripe promise-টি কম্পোনেন্টের বাইরে বা ভেতরে রাখা যায়, তবে টাইপ সেফটির জন্য এখানে রাখা হলো
    const stripePromise = loadStripe(publishableKey);

    const handleCheckout = async () => {
        const stripe: Stripe | null = await stripePromise;

        if (!stripe) {
            console.error("Stripe failed to load");
            return;
        }

        try {
            const response = await fetch(`${config?.baseUrl}/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: products,
                    email: currentUser?.email,
                }),
            });

            const checkoutSession = await response.json();

            // এখানে (stripe as any) ব্যবহার করা হয়েছে যাতে বিল্ড এরর না আসে
            const result = await (stripe as any).redirectToCheckout({
                sessionId: checkoutSession.id,
            });

            if (result?.error) {
                window.alert(result.error.message);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            window.alert("Something went wrong with the checkout process.");
        }
    };

    return (
        <div className="mt-6">
            {currentUser ? (
                <button
                    onClick={handleCheckout}
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-gray-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 focus:ring-offset-gray-50 duration-200"
                >
                    Checkout
                </button>
            ) : (
                <button className="w-full text-base text-white text-center rounded-md border border-transparent bg-gray-500 px-4 py-3 cursor-not-allowed">
                    Checkout
                </button>
            )}
            {!currentUser && (
                <p className="mt-2 text-sm font-medium text-red-500 text-center">
                    Need to sign in to make checkout
                </p>
            )}
        </div>
    );
};

export default CheckoutBtn;