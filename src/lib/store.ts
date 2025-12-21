import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { db } from "./firebase";
import type { ProductProps } from "../../type";

interface CartProduct extends ProductProps {
    quantity: number;
}

interface UserType {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    avatar: string;
    id: string;
}

interface StoreType {
    currentUser: UserType | null;
    isLoading: boolean;
    getUserInfo: (uid: any) => Promise<void>;
    cartProduct: CartProduct[];
    addToCart: (product: ProductProps) => Promise<void>;
    decreaseQuantity: (productId: number) => void;
    removeFromCart: (productId: number) => void;
    resetCart: () => void;
    favoriteProduct: CartProduct[];
    addToFavorite: (product: ProductProps) => Promise<void>;
    removeFromFavorite: (productId: number) => void;
    resetFavorite: () => void;
}

const customStorage = {
    getItem: (name: string) => {
        const item = localStorage.getItem(name);
        return item ? JSON.parse(item) : null;
    },
    setItem: (name: string, value: any) => {
        localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name: string) => {
        localStorage.removeItem(name);
    },
};

export const store = create<StoreType>()(
    persist(
        (set) => ({
            currentUser: null,
            isLoading: true,
            cartProduct: [],
            favoriteProduct: [],

            getUserInfo: async (uid: any) => {
                if (!uid) {
                    set({ currentUser: null, isLoading: false });
                    return; // সরাসরি রিটার্ন করে দেওয়া হলো
                }

                try {
                    const docRef = doc(db, "users", uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        set({ currentUser: docSnap.data() as UserType, isLoading: false });
                    } else {
                        set({ currentUser: null, isLoading: false });
                    }
                } catch (error) {
                    console.log("getUserInfo error", error);
                    set({ currentUser: null, isLoading: false });
                }
            },

            addToCart: async (product: ProductProps) => {
                set((state: StoreType) => {
                    const existingProduct = state.cartProduct.find(
                        (p) => p._id === product._id
                    );

                    if (existingProduct) {
                        return {
                            cartProduct: state.cartProduct.map((p) =>
                                p._id === product._id
                                    ? { ...p, quantity: (p.quantity || 0) + 1 }
                                    : p
                            ),
                        };
                    } else {
                        return {
                            cartProduct: [
                                ...state.cartProduct,
                                { ...product, quantity: 1 },
                            ],
                        };
                    }
                });
            },

            decreaseQuantity: (productId: number) => {
                set((state: StoreType) => {
                    const existingProduct = state.cartProduct.find(
                        (p) => p._id === productId
                    );

                    if (existingProduct) {
                        return {
                            cartProduct: state.cartProduct.map((p) =>
                                p._id === productId
                                    ? { ...p, quantity: Math.max(p.quantity - 1, 1) }
                                    : p
                            ),
                        };
                    }
                    return state;
                });
            },

            removeFromCart: (productId: number) => {
                set((state: StoreType) => ({
                    cartProduct: state.cartProduct.filter(
                        (item) => item._id !== productId
                    ),
                }));
            },

            resetCart: () => {
                set({ cartProduct: [] });
            },

            addToFavorite: async (product: ProductProps) => {
                set((state: StoreType) => {
                    const isFavorite = state.favoriteProduct.some(
                        (item) => item._id === product._id
                    );
                    return {
                        favoriteProduct: isFavorite
                            ? state.favoriteProduct.filter(
                                (item) => item._id !== product._id
                            )
                            : [...state.favoriteProduct, { ...product } as CartProduct],
                    };
                });
            },

            removeFromFavorite: (productId: number) => {
                set((state: StoreType) => ({
                    favoriteProduct: state.favoriteProduct.filter(
                        (item) => item._id !== productId
                    ),
                }));
            },

            resetFavorite: () => {
                set({ favoriteProduct: [] });
            },
        }),
        {
            name: "Gadgets-storage",
            storage: customStorage,
        }
    )
);