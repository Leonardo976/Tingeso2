import React, {useState} from "react";
import NavBarComponent2 from "./NavBarComponent2";
import styled from "styled-components";
import StudentService from "../services/StudentService";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import InputMask from 'react-input-mask';

export default function NewStudentComponent(props){

    const initialState = {
        rut: "",
        names: "",
        surnames: "",
        birthday: "",
        school_type: "Municipal",
        school_name: "",
        senior_year: "",
        payment_method: "",
        number_of_fees: "",
        final_price: "",
    }

    const [input, setInput] = useState(initialState);

    const changeRutHandler = (event) => {
        setInput({...input, rut: event.target.value});
        console.log(input.rut);
    };

    const changeNamesHandler = (event) => {
        setInput({...input, names: event.target.value});
        console.log(input.names);
    };

    const changeSurnamesHandler = (event) => {
        setInput({...input, surnames: event.target.value});
        console.log(input.surnames);
    };

    const changeBirthdayHandler = (event) => {
        setInput({...input, birthday: event.target.value});
        console.log(input.birthday);
    };

    const changeSchoolTypeHandler = (event) => {
        setInput({...input, school_type: event.target.value});
        console.log(input.school_type);
    };

    const changeSchoolNameHandler = (event) => {
        setInput({...input, school_name: event.target.value});
        console.log(input.school_name);
    };

    const changeSeniorYearHandler = (event) => {
        setInput({...input, senior_year: event.target.value});
        console.log(input.senior_year);
    };

    const registerStudent = (e) => {
        e.preventDefault();
        swal({
            title: "¿Está seguro de que desea registrar este estudiante?",
            text: "Una vez registrado, no podrá eliminarlo",
            icon: "warning",
            buttons: ["Cancelar", "Registrar"],
            dangerMode: true,
        }).then(respuesta => {
            if(respuesta){
                swal("Estudiante registrado correctamente",
                {
                    icon: "success",
                    timer: "2000",
                });
                let student = {
                    rut: input.rut,
                    names: input.names,
                    surnames: input.surnames,
                    birthday: input.birthday,
                    school_type: input.school_type,
                    school_name: input.school_name,
                    senior_year: input.senior_year,
                    payment_method: "",
                    number_of_fees: "",
                    final_price: "",
                };


                console.log("student => " + JSON.stringify(student));
                StudentService.saveStudent(student).then((res) => {
                    window.location.reload();
                });
                
            }else{
                swal("Estudiante no registrado", {
                    icon: "error",
                    timer: "2000",
                });
            }
        });
    };

    

    return(
        <Styles>
            <div className="home">
                <NavBarComponent2 />
                <div className="mainclass">
                    <div className="form1">
                        <h1 className="text-center"><b>Ingresar nuevo estudiante</b></h1>
                        <div className="formcontainer">
                            <hr></hr>
                            <div className="container">
                                <Form>
                                    <Form.Group className="mb-3" controlId="rut" value = {input.rut} onChange={changeRutHandler}>
                                        <Form.Label>Rut</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese el rut del estudiante. Ej: 12345689-1" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="names" value = {input.names} onChange={changeNamesHandler}>
                                        <Form.Label>Nombres</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese los nombres del estudiante" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="surnames" value = {input.surnames} onChange={changeSurnamesHandler}>
                                        <Form.Label>Apellidos</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese los apellidos del estudiante" />
                                    </Form.Group>

                                    {/* Para la fecha de nacimiento quiero que el formato sea dd-MM-yyyy*/}
                                    <Form.Group className="mb-3" controlId="birthday" value = {input.birthday} onChange={changeBirthdayHandler}>
                                        <Form.Label>Fecha de nacimiento</Form.Label>
                                        <InputMask
                                            mask="99-99-9999" 
                                            placeholder="dd-mm-yyyy" 
                                            value={input.birthday} 
                                            onChange={changeBirthdayHandler}
                                        >
                                            {(inputProps) => <Form.Control {...inputProps} type="text" />}
                                        </InputMask>
                                    </Form.Group>

                                    {/* Para el tipo de colegio quiero que se desplieguen 3 opciones: Municipal, Subvencionado y Privado: */}
                                    <Form.Group className="mb-3" controlId="school_type" value = {input.school_type} onChange={changeSchoolTypeHandler}>
                                        <Form.Label>Tipo de colegio</Form.Label>
                                        <Form.Control as="select">
                                            <option>Municipal</option>
                                            <option>Subvencionado</option>
                                            <option>Privado</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="school_name" value = {input.school_name} onChange={changeSchoolNameHandler}>
                                        <Form.Label>Nombre del colegio</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese el nombre del colegio del estudiante" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="senior_year" value = {input.senior_year} onChange={changeSeniorYearHandler}>
                                        <Form.Label>Año de egreso</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese el año de egreso del estudiante" />
                                    </Form.Group>
                                </Form>
                            </div>
                            <Button className="boton" onClick={registerStudent}>Registrar estudiante</Button>
                        </div>
                    
                    </div>
                </div>
            </div>
        </Styles>
    )
}


const Styles = styled.div`

.text-center {
    text-align: center;
    justify-content: center;
    padding-top: 8px;
    font-family: Cantarell,sans-serif;
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

.home{
    background-color: #ffffff;
    margin: 0;
    padding: 0;
}

.mainclass{
    margin-top: 20px;
    display: flex;
    padding: 0 5%;
    justify-content: center;
    font-family: Cantarell,sans-serif;
    font-size: 15px;
}

.form1{
    box-shadow: 0 7px 25px -5px rgba(0, 0, 0, 0.1);
    background-color: #f0f0f0;
    width: 35%;
    padding: 40px;
    margin: 0 auto;
    border-radius: 20px;
}

input[type=rut], input[type=date], input[type=text], select, textarea {
    width: 100%;
    padding: 8px 8px;
    margin: 0px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

Button {
    color: white;
    padding: 14px 0;
    margin: 10px 0;
    border: none;
    cursor: grabbing;
    width: 100%;
}

Button:hover {
    opacity: 0.8;
}

.formcontainer {
    text-align: left;
    margin: 24px 40px 9px;
}

.container {
    padding: 24px 0;
    text-align:left;
}

span.psw {
    float: right;
    padding-top: 0;
    padding-right: 15px;
}

.boton {
    background-color: #7752FE;
}
`