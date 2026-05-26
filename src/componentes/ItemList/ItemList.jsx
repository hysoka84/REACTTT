import Item from "../Item/Item";

function ItemList ({ productos }) {
    return (
        <>
            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
                {
                    productos.map(prod => (
                        <Item key={prod.id} {...prod} />
                    ))
                }
            </div>
        </>
    )
}

export default ItemList;
