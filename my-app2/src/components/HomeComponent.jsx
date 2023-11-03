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
                <h1 className="text-center"><b>Bienvenido a TopEducation</b></h1>
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
      background-color: #FFFFFF;
      font-family: Cantarell,sans-serif;
    }
`

const HomeStyle = styled.nav`
.text-center {
    text-align: center;
    justify-content: center;
    padding-top: 50px;
    padding-bottom: 30px;
    color: #190482;
    font-weight: 700;
    font-size: 50px;
    font-family: Cantarell,sans-serif;
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
    box-shadow: 0 7px 25px -5px rgba(0, 0, 0, 0.1);
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

.single-box:nth-child(1) .img-area{
    background-image: url(https://img.icons8.com/?size=512&id=UkLBG0sZoWV0&format=png)
}

.header-text{
    font-size: 23px;
    font-weight: 500;
    line-height: 48px;
    font-family: Cantarell,sans-serif;
}
.img-text p{
    font-size: 15px;
    font-weight: 400;
    line-height: 30px;
    font-family: Cantarell,sans-serif;
}
.single-box:hover{
    transform: translateY(-5px);
    background: #8E8FFA;
    color: #fff;}

.single-box:nth-child(2) .img-area{
        background-image: url(https://img.icons8.com/?size=512&id=295&format=png)
}
.single-box:nth-child(3) .img-area{
        background-image: url(https://img.icons8.com/?size=512&id=56793&format=png)
}
.single-box:nth-child(4) .img-area{
        background-image: url(https://img.icons8.com/?size=512&id=48800&format=png)
}
.single-box:nth-child(5) .img-area{
        background-image: url(https://img.icons8.com/?size=512&id=78059&format=png)
}
.single-box:nth-child(6) .img-area{
    background-image: url(https://img.icons8.com/?size=512&id=11645&format=png)
}
.single-box:nth-child(7) .img-area{
    background-image: url(https://img.icons8.com/?size=512&id=48622&format=png)
}
.single-box:nth-child(8) .img-area{
    background-image: url(https://img.icons8.com/?size=512&id=11705&format=png)
}

.login-box{
    cursor: pointer;
}
`
