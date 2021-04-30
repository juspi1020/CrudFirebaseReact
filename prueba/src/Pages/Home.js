import React from 'react';
import { useHistory } from 'react-router-dom';


export default function Home() {
    
    const history = useHistory();
    
    const handleClickHome = () => history.push('/');
    const handleClickProyectos = () => history.push('/proyectos');
    const handleClickClientes = () => history.push('/clientes');

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <button className="btn btn-light" onClick={handleClickHome} > ElColombiano </button>
                <div>
                    <button className="btn btn-light" onClick={handleClickProyectos} > Proyectos </button> {'          '}
                    <button className="btn btn-light" onClick={handleClickClientes}> Clientes </button>
                </div>
            </div>
        </nav>
        <div>
            <h3> PRUEBA TECNICA </h3>
            <p>Gracias por la oportunidad :D</p>
        </div>
        </>
    )
}
