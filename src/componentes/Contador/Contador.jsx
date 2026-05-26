import { useState } from "react";

export function Contador () {
    const [Contador, setContador] = useState(0);

    const incrementar = () => {
        setContador(Contador + 1);
    }

    const decrementar = () => {
        setContador(Contador -1);
    }

    return (
        <div style={{padding: "5px"}}>
            <h3>Contador Ejemplo</h3>
            <p>Valor Actual: {Contador}</p>
            <button onClick={incrementar}>Sumar</button>
            <button onClick={decrementar}>Restar</button>
        </div>
    )


}

