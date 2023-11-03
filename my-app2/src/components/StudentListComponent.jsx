import React, {Component} from "react";
import NavBarComponent1 from "./NavBarComponent1";
import styled from "styled-components";

class StudentListComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            students: [],
        };
    }

    componentDidMount(){
        fetch("http://localhost:8080/students")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();  // <-- Cambia json() a text()
        })
        .then((data) => {
            if (data) {  // <-- Verifica si la respuesta no está vacía
                this.setState({ students: JSON.parse(data) });  // <-- Analiza la respuesta
            } 
        })
        .catch((error) => {
            console.log("Error fetching the students: ", error);
        });
    }

    render(){
        return(
            <div>
                <NavBarComponent1/>
                <Styles>
                    <div className="f">
                        <div className="container">
                            <h1 className="title"><b>Lista de estudiantes</b></h1>
                            {this.state.students.length > 0 ? (
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Rut</th>
                                            <th>Nombres</th>
                                            <th>Apellidos</th>
                                            <th>Fecha de nacimiento</th>
                                            <th>Tipo de colegio</th>
                                            <th>Nombre del colegio</th>
                                            <th>Año de egreso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.students.map((student, index) => (
                                            <tr key={index}>
                                                <td>{student.rut}</td>
                                                <td>{student.names}</td>
                                                <td>{student.surnames}</td>
                                                <td>{student.birthday}</td>
                                                <td>{student.school_type}</td>
                                                <td>{student.school_name}</td>
                                                <td>{student.senior_year}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No hay estudiantes registrados.</p>
                            )}
                        </div>
                    </div>
                </Styles>
            </div>
        );
    }    
}

export default StudentListComponent;

const Styles = styled.div`
.text-center {
    text-align: center;
    justify-content: center;
    padding-top: 8px;
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 30px;
    letter-spacing: 0px;
    word-spacing: 2px;
    color: #000000;
    font-weight: 700;
    text-decoration: none solid rgb(68, 68, 68);
    font-style: normal;
    font-variant: normal;
    text-transform: uppercase;
}

.f{
    justify-content: center;
    align-items: center;
    display: flex;
}
*{
    font-family: sans-serif;
    box-sizing: content-box;
    margin: 0;
    padding: 0;
}
.content-table{
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.8em;
    min-width: 200px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    margin-left: 4%;
    margin-right: 4%;
}
.content-table thead tr{
    background-color: #009879;
    color: #ffffff;
    text-align: center;
    font-weight: bold;
}
.content-table th,
.content-table td{
    padding: 12px 15px;
    text-align: center;
}
.content-table tbody tr{
    border-bottom: 1px solid #dddddd;
}
.content-table tbody tr:nth-of-type(even){
    background-color: #f3f3f3;
}
.content-table tbody tr:last-of-type{
    border-bottom: 2px solid #009879;
}
.content-table tbody tr.active-row{
    font-weight: bold;
    color: #009879;
}

.container{
    text-align: center;
    padding-top: 30px;
    line-height: 3;
}

.title{
    padding-bottom: 20px;
}

.table {
    margin-bottom: 5rem;
}
`