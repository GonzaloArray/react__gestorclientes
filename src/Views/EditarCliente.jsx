
import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { Error } from "../components/Error";
import { Formulario } from "../components/Formulario";
import { obtenerClienteEdit, actualizarCliente } from "../data/Clientes"

export async function loader({ params }) {

    const cliente = await obtenerClienteEdit(params.clienteId);

    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'El cliente no fue encontrado',
        })
    }

    return cliente
}

export async function action({request, params}){
    const formDat = await request.formData()

    const datos = Object.fromEntries(formDat);

    const getEmail = formDat.get('email');

    const errores = [];

    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios');
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if (!regex.test(getEmail)) {
        errores.push('El email no es valido, coloque caracteres validos');
    }

    // Retornar datos si hay errores
    if (Object.keys(errores).length) {
        return errores;
    }

    await actualizarCliente(params.clienteId,datos);

    return redirect('/')
}

function EditarCliente() {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>
                Editar cliente
            </h1>
            <p className='mt-3'>A continuación podras modificar los datos de un cliente.</p>

            <div className='flex justify-end'>
                <button onClick={() => navigate('/')} className='bg-blue-800 text-white px-5 py-2 font-bold uppercase'>volver</button>
            </div>
            
            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">

                {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

                <Form method="POST" noValidate>
                    <Formulario cliente={cliente}/>

                    <input
                        value={'Guardar cambios'}
                        className="text-lg mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white"
                        type="submit"
                    />

                </Form>
            </div>
        </>
    )
}

export default EditarCliente