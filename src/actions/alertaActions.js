import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";

//Muestra alerta

export function mostrarAlerta(alerta){
    return (dispatch) => {
        dispatch( mostrarAlertaError(alerta));
    }
}

const mostrarAlertaError = alerta =>({
    type: MOSTRAR_ALERTA,
    payload: alerta
})

export function ocultarAlerta(){
    return(dispatch) => {
        dispatch( ocultarError() );
    }
}

const ocultarError = () => ({
    type: OCULTAR_ALERTA
})