import './Footer.module.css';

function Footer () {
    const personas = ["Ana Garcia", "Juan Perez", "Sofia Martinez"];

    return (
        <>
        <footer style={{ backgroundColor: "#8DE2D6", padding: "10px", textAlign: "center", marginTop: "20px", color:"black" }}>
            <h2>TalentoTech</h2>
            <p>Empresa dedicada a la venta de productos tecnologicos.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginTop: "12px" }}>
                {personas.map((persona) => (
                    <div key={persona} style={{ border: "1px solid white", padding: "10px", borderRadius: "8px", minWidth: "150px" }}>
                        <h3>{persona}</h3>
                        <p>Equipo de ventas</p>
                    </div>
                ))}
            </div>
        </footer>
        </>
    )
}

export default Footer;
