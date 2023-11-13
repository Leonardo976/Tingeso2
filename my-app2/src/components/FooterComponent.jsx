import React from 'react';
import styled from 'styled-components';

const FooterComponent = () => {
    return (
        <FooterContainer>
        </FooterContainer>
    );
};

export default FooterComponent;

const FooterContainer = styled.div`
  background-color: #168397; /* Color morado */
  color: white; /* Letras blancas */
  text-align: center;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  family-font: Cantarell, sans-serif;
`;

