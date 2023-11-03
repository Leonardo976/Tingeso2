import React, {useState} from "react";
import NavBarComponent5 from "./NavBarComponent5";
import styled from "styled-components";
import StudentService from "../services/StudentService";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import FooterComponent from "./FooterComponent";

export default function GenerateFeeComponent(props){
    const initialState = {
        rut: "",
        number_of_fees: "",
    }

    const [input, setInput] = useState(initialState);

    const changeRutHandler = (event) => {
        setInput({...input, rut: event.target.value});
        console.log(input.rut);
    };


    const changeNumberOfFeesHandler = (event) => {
        setInput({...input, number_of_fees: event.target.value});
        console.log(input.number_of_fees);
    };

    //Comment

    const generateFees = (e) => {
        e.preventDefault();
        swal({
            title: "¿Está seguro de que desea generar estas cuotas al estudiante?",
            text: "Una vez registrado, no podrá eliminarlo",
            icon: "warning",
            buttons: ["Cancelar", "Generar"],
            dangerMode: true,
        }).then(respuesta => {
            if(respuesta){
                swal("Cuotas generadas correctamente",
                {
                    icon: "success",
                    timer: "2000",
                }).then(() => {
                    window.location.href = "/generate-fees";
                });


                StudentService.getStudentByRut(input.rut).then((res) => {
                    let student = res.data;
                    console.log("max_number_of_fees => " + JSON.stringify(student.number_of_fees));
                });

                StudentService.generateFees(input.rut, input.number_of_fees);
            

            
            }else{
                swal("Cuotas no generadas", {
                    icon: "error",
                    timer: "2000",
                });
            }
        });
        
    };

    return(
        <Styles>
            <div className="home">
                <NavBarComponent5 />
                <div className="mainclass">
                    <div className="form1">
                        <h1 className="text-center"><b>Generar cuotas</b></h1>
                        <div className="formcontainer">
                            <hr></hr>
                            <div className="container">
                                <Form>
                                    <Form.Group className="mb-3" controlId="rut" value = {input.rut} onChange={changeRutHandler}>
                                        <Form.Label>Rut</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese el rut del estudiante. Ej: 12345689-1" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="number_of_fees" value = {input.number_of_fees} onChange={changeNumberOfFeesHandler}>
                                        <Form.Label>Número de cuotas</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese el número de cuotas que desea generar" />
                                    </Form.Group>
                                </Form>
                            </div>
                            <Button className="boton" onClick={generateFees}>Generar cuotas</Button>
                        </div>
                    
                    </div>
                </div>
            </div>
            <FooterComponent />
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
    font-family: Cantarell,sans-serif;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
}

.mainclass{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    font-family: Cantarell,sans-serif;
    font-size: 15px;
}

.form1{
    font-family: Cantarell,sans-serif;
    background-color: #f0f0f0;
    width: 30%;
    padding: 40px;
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
    font-family: Cantarell,sans-serif;
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
    font-family: Cantarell,sans-serif;
    text-align: left;
    margin: 24px 50px 9px;
}

.container {
    font-family: Cantarell,sans-serif;
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