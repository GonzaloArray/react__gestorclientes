import { Form, redirect, useActionData, useNavigate } from "react-router-dom"
import { Error } from "../components/Error";
import { Formulario } from "../components/Formulario";
import { obtenerCliente } from "../data/Clientes";

export async function action({request}){
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

    await obtenerCliente(datos);

    return redirect('/')
}

function NuevoCliente() {

    const errores = useActionData();
    const navigate = useNavigate();


    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>
                Nuevo cliente
            </h1>
            <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente</p>

            <div className='flex justify-end'>
                <button onClick={() => navigate('/')} className='bg-blue-800 text-white px-5 py-2 font-bold uppercase'>volver</button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">

                {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

                <Form method="POST" noValidate>
                    <Formulario />

                    <input
                        value={'Registrar cliente'}
                        className="text-lg mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white"
                        type="submit"
                    />

                </Form>
            </div>
        </>
    )
}

export default NuevoCliente