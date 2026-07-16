import Item from "../Item/Item";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ItemList ({ productos, onDelete }) {
    return (
        <Container className="px-0">
            <Row className="g-4">
                {productos.map(prod => (
                    <Col key={prod.id} xs={12} sm={6} lg={4} xl={3}>
                        <Item {...prod} onDelete={onDelete} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default ItemList;
