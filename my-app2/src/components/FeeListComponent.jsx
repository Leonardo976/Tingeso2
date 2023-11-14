import React, { Component } from "react";
import NavBarComponent3 from "./NavBarComponent3";
import styled from "styled-components";

class FeeListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fees: [],
            searchRut: '',
        };
    }

    componentDidMount() {
        this.fetchFees();
    }

    fetchFees = () => {
        fetch("http://localhost:8080/fees")
            .then((response) => response.json())
            .then((data) => this.setState({ fees: data }));
    }

    fetchFeesByRut = (rut) => {
        fetch(`http://localhost:8080/fees/by-student/${rut}`)
            .then((response) => response.json())
            .then((data) => this.setState({ fees: data }));
    }

    handleSearchChange = (event) => {
        this.setState({ searchRut: event.target.value });
    }

    handleSearch = () => {
        this.fetchFeesByRut(this.state.searchRut);
    }

    payFee = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/fees/pay/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",

                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            this.fetchFees();

        } catch (error) {
            console.log("Error updating the fee: ", error);
        }
    }

    isPaymentDisabled = (fee) => {
        if(fee.state === "PAID")
            return true;

        const year = fee.max_date_payment.substring(fee.max_date_payment.length - 4);
        const month = fee.max_date_payment.substring(3, 5);

        const currentDate = new Date();
        const paymentStartDate = new Date(year, month - 1, 4);
        const paymentEndDate = new Date(year, month - 1, 11);

        if(currentDate < paymentStartDate || currentDate > paymentEndDate)
            return true;

        return false;
    }

    render() {
        return (
            <div>
                <NavBarComponent3 />
                <Styles>
                    <h3 className="title2"><b>Filtrar por rut</b></h3>
                    {/* Barra de búsqueda */}
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Ingrese rut"
                            value={this.state.searchRut}
                            onChange={this.handleSearchChange}
                        />
                        <button className="btn-search" onClick={this.handleSearch}>Buscar</button>
                    </div>
                    <div className="f">
                        <div className="container">
                            <h1 className="title"><b>Lista de cuotas</b></h1>
                            {this.state.fees.length > 0 ? (
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Rut</th>
                                        <th>N° de cuota</th>
                                        <th>Precio</th>
                                        <th>Fecha de pago</th>
                                        <th>Máxima fecha de pago</th>
                                        <th>Estado</th>
                                        <th>Acción</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.fees.map((fee, index) => (
                                        <tr key={index}>
                                            <td>{fee.rut}</td>
                                            <td>{fee.number_of_fee}</td>
                                            <td>{fee.price}</td>
                                            <td>{fee.payment_date}</td>
                                            <td>{fee.max_date_payment}</td>
                                            <td>{fee.state}</td>
                                            <td>
                                                <button className="btn btn-success"
                                                        onClick={() => this.payFee(fee.id)}
                                                        disabled={this.isPaymentDisabled(fee)}>Pagar</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No hay cuotas registradas.</p>
                            )}
                        </div>
                    </div>
                </Styles>
            </div>
        );
    }
}

export default FeeListComponent;

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

.btn {
    border-radius: 7px;
    color: #FFFFFF;
    padding: 8px 20px;
    font-size: 15px;
    cursor: pointer;
    margin: 5px;
}

.title{
    padding-bottom: 25px;
}

.title2{
    text-align: center;
    padding-top: 30px;
}

.table {
    margin-bottom: 5rem;
}

.search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    margin-top: 5px;
}

.search-bar input {
    border-radius: 25px;
    padding: 5px 10px;

}

.btn-search {
    margin-left: 10px;
    background-color: #009879FF;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 5px 10px;
    cursor: pointer;
}

`