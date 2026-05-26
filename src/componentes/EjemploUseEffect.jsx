import { useState, useEffect } from "react";

export function Contador() {

    const [Contador, setContador] = useState(0);

    useEffect(() => {
        console.log("el cosito se renderizo")
    }, [Contador]);


    return (
        <div style={{ margin: "20px", padding: "15px", border: "1px solid black" }}>
            <h3>Ejemplo sencillo de useEffect</h3>
            <p>Valor actual: {Contador}</p>
            <button onClick={() => setContador(Contador + 1)}>Suma 1</button>
            <button onClick={() => setContador(Contador - 1)}>Resta 1</button>
        </div>
    );

}