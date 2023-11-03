import React from 'react';
import styled from 'styled-components';

const FooterComponent = () => {
    return (
        <FooterContainer>
            <p>Valentina Paz Campos Olguín</p>
            <p>Técnicas de Ingeniería de Software</p>
            <p>2-2023</p>
        </FooterContainer>
    );
};

export default FooterComponent;

const FooterContainer = styled.div`
    background-color: #3D30A2; /* Color morado */
    color: white; /* Letras blancas */
    text-align: center;
    padding: 20px 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    family-font: Cantarell,sans-serif;
`;

