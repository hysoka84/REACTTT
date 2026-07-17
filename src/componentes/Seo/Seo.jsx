import { Helmet } from "react-helmet-async";

function Seo({ titulo, descripcion }) {
    return (
        <Helmet>
            <title>{`${titulo} | FunkoManía`}</title>
            <meta name="description" content={descripcion} />
        </Helmet>
    );
}

export default Seo;
