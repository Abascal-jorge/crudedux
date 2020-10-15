import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {actualizarProducto} from "../actions/productoActions";

const EditarProducto = () => {

    const history = useHistory();
    //Creando el state para validar los campos del formulario nombre y precio
    const [formdato, guardarDatos ] = useState({
        nombre: "",
        precio: "" 
    });

    const dispatch = useDispatch();

    //Extrayendo una parte del state principal del reducer/index 
    const datos = useSelector( state => state.productos.productoeditar);


    useEffect(() => {
        guardarDatos(datos.producto);
    }, [datos.producto]);


    //Verificando que la variable no este en null para no ocasionar uyn error si se actualiza dicha pagina
    //if(!datos)return null;

     //Guardando datos de formulario en state local formdato 
     const onChangeForm = e => {
        //console.log(e.target.value);
        guardarDatos({
            ...formdato,
            [e.target.name] : e.target.value 
        });
    }

    //Extrayendo nombre precio del state datos
    const {nombre, precio} = formdato;

    //Funcion que se ejecutara cuando el usuario precio el boton de guardar cambios
    const onSubmitCambios = (e) =>{
        e.preventDefault();
        if(nombre === "" || precio === "" ){
            return;
        }
        dispatch(actualizarProducto(formdato));
        history.push("/");
    }

    
    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
                        <form
                            onSubmit={onSubmitCambios}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    onChange={onChangeForm}
                                    value={nombre}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio producto"
                                    name="precio"
                                    onChange={onChangeForm}
                                    value={precio}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;