import {AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADA_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO} from "../types";
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


//Funcioin que descarga los productos de la base de datos
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {
            const respuesta = await clienteAxios.get("/productos");
            //console.log(respuesta)
            dispatch(descargProductosExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch( descargaProductosError() );
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//Funcion para eliminar producto
 
export function eliminarProducto(id) {
    return async (dispatch) => {
        dispatch(funcioneliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito() );
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoEliminar);
        }
    }
}; 

const funcioneliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload : id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoEliminar = () =>({
    type: PRODUCTO_ELIMINADA_ERROR,
    payload: true
});

// Editar colocar prodcuto en edicion
export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch( obtenerProductoActionEditar(producto) );
    }
}

const obtenerProductoActionEditar = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

//Editando producto se une con la anterior
export function actualizarProducto(producto){
    return async (dispatch) => {
        dispatch(actualizarProductoExistente());

        try {
            clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(edicionExitosa(producto));
        } catch (error) {
            console.log(error);
            dispatch(edicionError());
        }
    }
}

const actualizarProductoExistente = ()=>({
    type: COMENZAR_EDICION_PRODUCTO
});

const edicionExitosa = (producto) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const edicionError = () => ({
   type: PRODUCTO_EDITADO_ERROR,
   payload: true
});