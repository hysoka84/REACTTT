import { useContext } from "react";
import { CartContext } from "./CarritoContext";

export function useCart() {
    return useContext(CartContext);
}
