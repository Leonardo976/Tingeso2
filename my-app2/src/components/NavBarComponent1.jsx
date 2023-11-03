import React from "react";
import styled from "styled-components";
import birreteImg from "./birrete.png";

function NavBarComponent1(){
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
                    <a className="btn-2" href="/file-information"><button>Ver último archivo subido</button></a>
                </nav>
            </header>
        </NavStyle>
        </>
    )
}

export default NavBarComponent1;

const NavStyle = styled.nav`
.header{
    background-color: #3D30A2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 85px;
    padding: 5px 10%;
    font-family: Cantarell,sans-serif;
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
    margin-left: 20px;
    font-weight: 700;
    color: #1b3039;
    padding: 9px 25px;
    background: #eceff1;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }
.header .btn button:hover{
    background-color: #e2f1f8;
    color: #ffbc0e;
    transform: scale(1.1);
  }
.header .btn-2 button {
    margin-left: 20px;
    font-weight: 700;
    color: #1b3039;
    padding: 9px 25px;
    background: #eceff1;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }
.header .btn-2 button:hover{
    background-color: #e2f1f8;
    color: #ffbc0e;
    transform: scale(1.1);
}
`