import {AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//Crear nuevos productos

export function crearNuevoProductoAction(producto) {
    return async (dispatch) =>{
        dispatch (agregarProducto());
        try {
            //insertar a la API
            await clienteAxios.post(`/productos`, producto);
            //Si todo sale bien actuzalizar el state
            dispatch( agregarProductoExito(producto) );
            //Agregando sweetalert 2 confirmacion de hecho
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
              )
        } catch (error) {
            console.log(error);
            //Si hay un error cambiar el state
            dispatch(agregarProductoError(true));
            Swal.fire({
                title: 'Error!',
                text: 'Error en la pagina, intenta de nuevo',
                icon: 'error',
                confirmButtonText: 'OK'
              })
        }   
        //console.log(producto);
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})


//Si el poroducto se guarda en la base de datos
const agregarProductoExito = producto => ({
        type: AGREGAR_PRODUCTO_EXITO,
        payload: producto
});

//si hubo un error
    const agregarProductoError = (estado) => ({
        type: AGREGAR_PRODUCTO_ERROR,
        payload: estado
    });