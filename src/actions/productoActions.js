import {AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO} from "../types";
import clienteAxios from "../config/axios";

//Crear nuevos productos

export function crearNuevoProductoAction(producto) {
    return async (dispatch) =>{
        dispatch (agregarProducto());
        try {
            //insertar a la API
            await clienteAxios.post(`/productos`, producto);
            //Si todo sale bien actuzalizar el state
            dispatch( agregarProductoExito(producto) );
        } catch (error) {
            console.log(error);
            //Si hay un error cambiar el state
            dispatch(agregarProductoError(true));
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