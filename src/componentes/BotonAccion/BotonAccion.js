import styled from "styled-components";

export const BotonAccion = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.65rem 0.9rem;
    border: none;
    border-radius: 5px;
    background-color: ${({ $peligro }) => ($peligro ? "#b42318" : "#5b2a86")};
    color: white;
    font: inherit;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
