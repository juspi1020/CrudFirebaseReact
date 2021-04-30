import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { db } from '../firebase'

export default function Proyectos() {

    const history = useHistory();
    const handleClickHome = () => history.push('/');
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [listaClientes, setListaClientes] = useState([]);
    const [listaProyectos, setListaProyectos] = useState([]);
    const [filaActual, setFilaActual] = useState('');
    const [modalValidar, setModalValidar] = useState(false);

    const [clientesele, setClienteSeleccionado] = useState({
        nuevoCliente: {
            cedula: '',
            nCliente: '',
            codigoProyecto: '',
            nombreProyecto: '',
            contacto: '',
        }
    });

    const insertar = async () => {
        if (!clientesele.nuevoCliente.cedula || !clientesele.nuevoCliente.nCliente || !clientesele.nuevoCliente.codigoProyecto || !clientesele.nuevoCliente.contacto) {
            setModalValidar(true)
        } else {
            await db.collection('Clientes').doc(clientesele.nuevoCliente.cedula).set(clientesele.nuevoCliente);
            setModalInsertar(false);
        }

    }
    

    const getClientes = async () => {
        db.collection('Clientes').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })

            });
            setListaClientes(docs);
        });

    }

    useEffect(() => {
        getClientes();
    }, []);

    const eliminar = async (id) => {
        if (window.confirm('¿Desea eliminar este Cliente?')) {
            await db.collection('Clientes').doc(id).delete()
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setClienteSeleccionado({
            nuevoCliente: {
                ...clientesele.nuevoCliente,
                [name]: value
            }
        })
    }

    const editar = async (id) => {
        if (!clientesele.nuevoCliente.cedula || !clientesele.nuevoCliente.nCliente || !clientesele.nuevoCliente.codigoProyecto || !clientesele.nuevoCliente.contacto) {
            setModalValidar(true)
        } else {
            setFilaActual(id);
            setModalEditar(false)
            db.collection('Clientes').doc(id).get();
            db.collection('Clientes').doc(id).update(clientesele.nuevoCliente);
        }

    }

    const abrirModalInsertar = () => {
        setModalInsertar(true)
    }

    return (
        <div className="App">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="btn btn-light" onClick={handleClickHome} > Atrás </button>
                    <button className="btn btn-light" onClick={() => abrirModalInsertar()}> Crear nuevo Cliente </button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>

            <h2> Clientes</h2>

            <table className="table ">
                <thead>
                    <tr>
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Codigo del proyecto</th>
                        <th>Contacto</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaClientes.map(elemento => {
                        return <tr>
                            <td>{elemento.cedula}</td>
                            <td>{elemento.nCliente}</td>
                            <td>{elemento.codigoProyecto}</td>
                            <td>{elemento.contacto}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => { setModalEditar(true); setFilaActual(elemento) }}> Editar </button> {"   "}
                                <button className="btn btn-danger" onClick={() => eliminar(elemento.id)}> Eliminar </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>


            <Modal isOpen={modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Editar Cliente</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Cedula</label>
                        <input className="form-control"
                            type="number"
                            name="cedula"
                            value={filaActual.id && clientesele && clientesele.nuevoCliente.cedula}
                            onChange={handleChange}
                        />
                        <br />
                        <label> Nombre del Cliente</label>
                        <input
                            className="form-control"
                            type="text"
                            name="nCliente"
                            value={clientesele && clientesele.nuevoCliente.nCliente}
                            onChange={handleChange}
                        />
                        <br />
                        <label> Codigo del Proyecto</label>
                        <input
                            className="form-control"
                            type="text"
                            name="codigoProyecto"
                            value={clientesele && clientesele.nuevoCliente.codigoProyecto}
                            onChange={handleChange}
                        />
                        <br />
                    
                        <label> Contacto</label>
                        <input
                            className="form-control"
                            type="text"
                            name="contacto"
                            value={clientesele && clientesele.nuevoCliente.contacto}
                            onChange={handleChange}
                        />

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => editar(filaActual.id)} >
                        Actualizar
                    </button>
                    <button className="btn btn-danger" onClick={() => setModalEditar(false)}>
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    ¿Estàs seguro que deseas eliminar este cliente {clientesele && clientesele.nuevoCliente.nCliente}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => eliminar()}> Sì </button>
                    <button className="btn btn-secondary" onClick={() => setModalEliminar(false)}> No</button>
                </ModalFooter>
            </Modal>



            <Modal isOpen={modalInsertar}>
                <ModalHeader>
                    <div>
                        <h3>Crear Cliente</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label> Cedula</label>
                        <input
                            className="form-control"
                            type="number"
                            name="cedula"
                            value={clientesele ? clientesele.nuevoCliente.cedula : ''}
                            onChange={handleChange}
                        />
                        <br />
                        <label> Nombre Cliente</label>
                        <input
                            className="form-control"
                            type="text"
                            name="nCliente"
                            value={clientesele ? clientesele.nuevoCliente.nCliente : ''}
                            onChange={handleChange}
                        />
                        <br />
                        <label> Codigo del Proyecto</label>
                        <input
                            className="form-control"
                            type="text"
                            name="codigoProyecto"
                            value={clientesele ? clientesele.nuevoCliente.codigoProyecto : ''}
                            onChange={handleChange}

                        /><br />

                        <label> Contacto</label>
                        <input
                            className="form-control"
                            type="text"
                            name="contacto"
                            value={clientesele ? clientesele.nuevoCliente.contacto : ''}
                            onChange={handleChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => insertar()}>
                        Insertar
                    </button>
                    <button className="btn btn-danger" onClick={() => setModalInsertar(false)}>
                        Cancelar
                     </button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalValidar}>
                <ModalBody>
                    <p>Algunos campos estan vacios</p>
                    <button className="btn btn-primary" onClick={() => setModalValidar(false)}> Cerrar</button>
                </ModalBody>
            </Modal>
        </div>
    );
};
