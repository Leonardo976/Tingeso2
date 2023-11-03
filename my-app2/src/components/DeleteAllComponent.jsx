import React, {Component} from "react";
import styled from "styled-components";
import NavBarComponent3 from "./NavBarComponent3";
import FooterComponent from "./FooterComponent";

class DeleteAllComponent extends Component {

    handleDeleteStudents = () => {
        fetch("http://localhost:8080/students/delete-all", {
            method: "DELETE",
        }).then(() => {
            window.location.reload(false);
        });
    }

    handleDeleteExams = () => {
        fetch("http://localhost:8080/exams/delete-all", {
            method: "DELETE",
        }).then(() => {
            window.location.reload(false);
        });
    }

    handleDeleteFees = () => {
        fetch("http://localhost:8080/fees/delete-all", {
            method: "DELETE",
        }).then(() => {
            window.location.reload(false);
        });
    }


    render(){
        return(
            <div>
                <NavBarComponent3/>
                <Styles>
                    <div className="home">
                        <h1 className="title">Eliminar datos</h1>
                        <div className="text-center">
                            <div className="image-container">
                                <img src="https://img.icons8.com/?size=512&id=48800&format=png" alt="Eliminar alumnos" />
                                    <button className="btn btn-danger" onClick={this.handleDeleteStudents}>Eliminar alumnos</button>
                            </div>
                            <div className="image-container">
                                <img src="https://img.icons8.com/?size=512&id=56793&format=png" alt="Eliminar pruebas" />
                                <button className="btn btn-danger" onClick={this.handleDeleteExams}>Eliminar pruebas</button>
                            </div>
                            <div className="image-container">
                                <img src="https://img.icons8.com/?size=512&id=78059&format=png" alt="Eliminar cuotas" />
                                <button className="btn btn-danger" onClick={this.handleDeleteFees}>Eliminar cuotas</button>
                            </div>
                        </div>
                    </div>
                </Styles>
                <FooterComponent/>
            </div>
        );
    }
}

export default DeleteAllComponent;

//Agregar una separación entre los botones

const Styles = styled.div`
    .home{
        background-color: #ffffff;
        text-align: center;
        padding-top: 50px;
    }

    .title{
        text-align: center;
        font-family: Cantarell,sans-serif,bold;
        font-size: 50px;

    }

    .text-center {
        padding-top: 50px;
        padding-bottom: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Cantarell, sans-serif;
        font-size: 30px;
        gap: 200px;  // Espaciado entre cada contenedor de imagen + botón
    }
    
    .image-container {
        display: flex;
        flex-direction: column;  // Establece la dirección de los elementos a vertical
        align-items: center;     // Centra los elementos horizontalmente
        gap: 10px;               // Espaciado entre la imagen y el botón
    }
    
    .btn {
        margin-left: 0;          // Quitar el margen izquierdo ya que se muestra horizontalmente
        font-weight: 700;
        padding: 9px 25px;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease 0s;
    }
    
    img {
        width: 200px;             // Puedes ajustar este valor según lo necesites
        height: auto;
    }
    
    

`