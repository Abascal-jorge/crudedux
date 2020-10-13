import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
//Action de redux
import { crearNuevoProductoAction } from "../actions/productoActions";


const NuevoProducto = () => {

    //Creando state local para pasar datos obtenidos 
    const [datos, guardarNombre] = useState({
        nombre: "",
        precio: 0
    });
    const {nombre, precio} = datos;
   
    //Utilziar use dispatch y te crea una funcion
    const dispatch = useDispatch();

    //Mandar a llamar el action de producto action
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto));

    //Escribiendo datos en el state
    const onChangeDatos = (e) => {
        guardarNombre({
            ...datos,
            [e.target.name] : e.target.name === "nombre" ? e.target.value : Number(e.target.value)
        });
    }

    //Cuando el usuario haga submit
    const submitNuevoProducto = e =>{
        e.preventDefault();
        //Validar formulario
        if(nombre.trim() === "" || precio <= 0){
            alert("Los campos son obligatorios");
            return;
        }
        //Si no hay erores

        //Crear el nuevo producto
        agregarProducto(datos);
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    onChange={onChangeDatos}
                                    value={nombre}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    onChange={onChangeDatos}
                                    value={precio}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Agregar Producto
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;