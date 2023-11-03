import React from "react";
import styled from "styled-components";
import birreteImg from "./birrete.png";

function NavBarComponent2(){
    return(
        <>
        <NavStyle>
            <header className="header">
                <div className="logo">
                <img src={birreteImg} alt="logo" width="70px" height="70px"/>
                    <h1>TopEducation</h1>
                </div>
                <nav>
                    <a className="btn" href="/"><button>Volver al menú</button></a>
                    <a className="btn-2" href="/students"><button>Ver estudiantes</button></a>
                </nav>
            </header>
        </NavStyle>
        </>
    )
}

export default NavBarComponent2;

const NavStyle = styled.nav`
.header{
    background-color: #3D30A2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 85px;
    padding: 5px 10%;
}
nav {
    display: flex;          /* Make nav a flex container */
    align-items: center;    /* Align its children vertically in the center */
    gap: 10px;              /* Add some gap between its children (the buttons) */
}
.header .logo{
    margin-right: auto;
    color: white;
    font-family: Cantarell,sans-serif;
    display: flex;
    align-items: center;
    gap: 10px;
  }
.header .btn button{
    margin-right: 0px;
    font-weight: 700;
    color: #1b3039;
    padding: 9px 25px;
    background: #ffffff;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }
.header .btn button:hover{
    background-color: #ffffff;
    color: #0f0f0f;
    transform: scale(1.1);
  }
.header .btn-2 button {
    margin-right: 0px;
    font-weight: 700;
    color: #1b3039;
    padding: 9px 25px;
    background: #ffffff;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.2s ease 0s;
  }
.header .btn-2 button:hover{
    background-color: #ffffff;
    color: #0f0f0f;
    transform: scale(1.1);
}
`