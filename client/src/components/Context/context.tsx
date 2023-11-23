import { FC, PropsWithChildren, createContext, useContext, useState, useMemo } from "react"
import { Product } from "../../models";




interface CartContextProps {
    cart: Product[];
    cartCount: number;
    productCount: { [productId: number]: number };
    increment: (productId: number) => void;
    decrement: (productId: number) => void;
    removeProduct: (productId: number) => void;
    addToCart: (productId: number, product: Product) => void;
}



export const CartContext = createContext<CartContextProps | null>(null);

export const useCart = () => useContext<CartContextProps | null>(CartContext)

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>([]);
    const [cartCount, setCartCount] = useState(0);
    const [productCount, setProductCount] = useState<{ [productId: number]: number }>({});

    // useEffect(() => {
    //     // Load cart data from localStorage on component mount
    //     const storedCart = localStorage.getItem("cart");
    //     const storedProductCount = localStorage.getItem("productCount");
    //     const storedCartCount = localStorage.getItem("cartCount");
    
    //     if (storedCart) {
    //       setCart(JSON.parse(storedCart));
    //     }
    
    //     if (storedProductCount) {
    //       setProductCount(JSON.parse(storedProductCount));
    //     }

    //     if (storedCartCount) {
    //         setCartCount(JSON.parse(storedCartCount));
    //     }
    //   }, []);
    
    //   useEffect(() => {
    //     // Save cart data to localStorage whenever cart or productCount changes
    //     localStorage.setItem("cart", JSON.stringify(cart));
    //     localStorage.setItem("productCount", JSON.stringify(productCount));
    //     localStorage.setItem("cartCount", JSON.stringify(cartCount));
    //   }, [cart, productCount, cartCount]);

    const data: CartContextProps = useMemo(() => ({
        cart,
        cartCount,
        productCount,
        increment: (productId: number) => {
            setCartCount(cartCount + 1);
            const updatedProductCount = {...productCount};
            updatedProductCount[productId] = (updatedProductCount[productId] || 0) + 1;
            setProductCount(updatedProductCount);
        },
        decrement: (productId: number) => {
            setCartCount(cartCount - 1);
            const updatedProductCount = {...productCount};
            updatedProductCount[productId] -= 1;
            setProductCount(updatedProductCount);
        },
        removeProduct: (productId: number) => {
            const updatedCart = cart.filter(p => p.id !== productId);
            setCart(updatedCart);
            setCartCount(cartCount - productCount[productId] || 0);
            const updatedProductCount =  {...productCount}
            delete updatedProductCount[productId];
            setProductCount(updatedProductCount);
        },
        addToCart: (productId: number,product: Product) => {
            const existingProduct = cart.find((item) => item.id === product.id);
            if (existingProduct) {
                setCartCount(cartCount + 1);
                const newProductCount = {...productCount}
                newProductCount[productId] = (newProductCount[productId] || 0 ) + 1;
                setProductCount(newProductCount);
            } else {
                setCart([...cart, product]);
                setCartCount(cartCount + 1);
                const newProductCount = {...productCount}
                newProductCount[productId] = (newProductCount[productId] || 0 ) + 1;
                setProductCount(newProductCount);

            }
        },
    }), [cart, cartCount, productCount, setCart, setCartCount, setProductCount]);

    return (
        <CartContext.Provider value={data}>{children}</CartContext.Provider>
    )
}