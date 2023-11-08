import React from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import NavBarComponent4 from "./NavBarComponent4";
import FooterComponent from "./FooterComponent";

export default function Home() {
    return (
        <div>
            <NavBarComponent4 />
            <GlobalStyle/>
            <HomeStyle>
                <h1 className="text-center"><b>Menú principal</b></h1>
                <div className="box-area">
                    <div className="single-box">
                        <a href="/new-student">
                        <div className="img-area">
                        </div>
                        </a>
                        <div className="img-text">
                        <span className="header-text"><strong>Nuevo estudiante</strong></span>
                        </div>
                    </div>
                    <div className="single-box">
                        <a href="/generate-fees">
                        <div className="img-area">
                        </div>
                        </a>
                        <div className="img-text">
                        <span className="header-text"><strong>Generar cuotas</strong></span>
                        </div>
                    </div>
                    <div className="single-box">
                        <a href="/file-upload">
                        <div className="img-area">
                        </div>
                        </a>
                        <div className="img-text">
                        <span className="header-text"><strong>Cargar pruebas</strong></span>
                        </div>
                    </div>
                    <div className="single-box">
                        <a href="/students">
                        <div className="img-area">
                        </div>
                        </a>
                        <div className="img-text">
                        <span className="header-text"><strong>Ver estudiantes</strong></span>
                        </div>
                    </div>
                    <div className="single-box">
                        <a href="/list-fees">
                        <div className="img-area">
                        </div>
                        </a>
                        <div className="img-text">
                        <span className="header-text"><strong>Ver cuotas</strong></span>
                        </div>
                    </div>
                    <div className="single-box">
                        <a href="/discounts">
                        <div className="img-area">
                        </div>
                        </a>
                        <div className="img-text">
                        <span className="header-text"><strong>Calcular planilla</strong></span>
                        </div>
                    </div>
                    <div className="single-box">
                        <a href="/report-summary">
                        <div className="img-area">
                        </div>
                        </a>
                        <div className="img-text">
                        <span className="header-text"><strong>Resumen de pagos</strong></span>
                        </div>
                    </div>
                    <div className="single-box">
                        <a href="/delete-all">
                        <div className="img-area">
                        </div>
                        </a>
                        <div className="img-text">
                        <span className="header-text"><strong>Eliminar todo</strong></span>
                        </div>
                    </div>
                </div>
            </HomeStyle>
            <FooterComponent />
        </div>
    );
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ffffff;
    font-family: Cantarell, "Arial Black";
  }
`


const HomeStyle = styled.nav`
  .text-center {
    text-align: center;
    justify-content: center;
    padding-top: 50px;
    padding-bottom: 30px;
    color: #36c1e0;
    font-weight: 700;
    font-size: 52px;
    font-style: oblique;
    text-shadow: 2px  1px 1px black;
    font-family: "Arial Black", "Arial Black";
  }

  .box-area {
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;

  }

  .single-box {
    box-shadow: 0 7px 25px -5px rgba(1, 1, 1, 1);
    position: relative;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 350px;
    height: auto;
    outline: none;
    border-radius: 20px;
    background-color: white;
    text-align: center;
    margin: 20px;
    padding: 20px;
    transition: .3s
  }

  
  .header-text {
    font-size: 25px;
    font-weight: 500;
    line-height: 70px;
    font-family: "Arial Black", "Arial Black";
  }

  .img-text p {
    font-size: 15px;
    font-weight: 400;
    line-height: 30px;
    font-family: "Arial Black", "Arial Black";
  }

  .single-box:hover {
    transform: translateY(-5px);
    background: #12a7c2;
    color: #fff;
  }
  .img-area{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 10%;
    padding: 20px;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center center;
  }

  .login-box {
    cursor: pointer;
  }
`

