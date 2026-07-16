import { useCart } from "../../context/useCart";
import { FaShoppingCart } from "react-icons/fa";

function CartWidget() {
    const { cantidadTotal } = useCart();

    return (
        <span>
            <FaShoppingCart aria-hidden="true" /> Carrito ({cantidadTotal})
        </span>
    );
}

export default CartWidget;
