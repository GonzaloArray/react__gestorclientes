import { useLoaderData } from "react-router-dom";
import { Cliente } from "../components/Cliente";
import { obtenerClientes } from "../data/Clientes";

export function loader(){

    const clientes = obtenerClientes();

    return clientes;
}

export const Index = () => {

    const datos = useLoaderData();


    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>
                Cliente
            </h1>
            <p className='mt-3'>Administra tus clientes</p>

            {datos.length ? (
                <table className="w-full bg-white shadow mt-5 table-auto rounded-xl">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="p-2">Cliente</th>
                            <th className="p-2">Contacto</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map(cliente => (
                            <Cliente cliente={cliente} key={cliente.id}/>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="">No hay clientes aún</p>
            )}
        </>
    )
}
