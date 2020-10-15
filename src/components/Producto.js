import React from 'react';
import {useHistory} from "react-router-dom"
import Swal from "sweetalert2";
//Redux
import { useDispatch } from "react-redux";
import {eliminarProducto, obtenerProductoEditar} from "../actions/productoActions";


const Producto = (producto) => {
    const {nombre, precio, id} = producto.producto;

    const dispatch = useDispatch();
    const history = useHistory(); //Habilitar gistory para redireccion 

    //Confirmar si desea elimnarlo 
    const confirmarEliminarProducto = (id) =>{

        //Preguntar al usuario 

        Swal.fire({
            title: 'Estas seguro de eliminar el producto?',
            text: "Los cambios no son reversibles!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch( eliminarProducto(id) );
            }
          })
    }

    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.producto.id}`);
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td> <span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <button type="button" className="btn btn-primary mr-2"
                    onClick = { () => redireccionarEdicion(producto) }
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={ () => confirmarEliminarProducto(id) }
                >
                    Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default Producto;