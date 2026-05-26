import { useCart } from "../../context/useCart";

function CartWidget() {
    const { cantidadTotal } = useCart();

    return (
        <span>
            Carrito ({cantidadTotal})
        </span>
    );
}

export default CartWidget;
