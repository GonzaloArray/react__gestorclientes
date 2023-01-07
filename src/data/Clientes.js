export async function obtenerClientes() {

    const response = await fetch(import.meta.env.VITE_API_URL);
    const respuesta = await response.json();


    return respuesta;
}

export async function obtenerClienteEdit(id) {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    const respuesta = await response.json();


    return respuesta;
}

export async function obtenerCliente(datos) {
    try {

        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        console.log(error);
    }
}

export async function actualizarCliente(id, datos){
    
    try {
        const update = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await update.json();
    } catch (error) {
        console.log(error)
    }
}

export async function eliminarCliente(id){
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',

        })
        await response.json();
    } catch (error) {
        console.log(error)
    }
}