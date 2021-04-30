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
    const [listaProyectos, setListaProyectos] = useState([]);
    const [filaActual, setFilaActual] = useState('');
    const [modalValidar, setModalValidar] = useState(false);

    const [proyectosele, setProyectoSeleccionado] = useState({
        nuevoProyecto: {
            codigo: '',
            nProyecto: '',
            fechaInicio: '',
            direccion: '',
            constructora: '',
            contacto: '',
        }
    });

    const insertar = async () => {
        if (!proyectosele.nuevoProyecto.codigo || !proyectosele.nuevoProyecto.nProyecto || !proyectosele.nuevoProyecto.fechaInicio || !proyectosele.nuevoProyecto.direccion || !proyectosele.nuevoProyecto.constructora || !proyectosele.nuevoProyecto.contacto) {
            setModalValidar(true)
        } else {
            await db.collection('Proyectos').doc(proyectosele.nuevoProyecto.codigo).set(proyectosele.nuevoProyecto);
            setModalInsertar(false);
        }
    }

    const getProyectos = async () => {
        db.collection('Proyectos').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setListaProyectos(docs);
        });
    }

    useEffect(() => {
        getProyectos();
    }, []);

    const eliminar = async (id) => {
        if (window.confirm('¿Desea eliminar el Proyecto?')) {
            await db.collection('Proyectos').doc(id).delete()
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setProyectoSeleccionado({
            nuevoProyecto: {
                ...proyectosele.nuevoProyecto,
                [name]: value
            }
        })
    }

    const editar = async (id) => {
        setFilaActual(id);
        setModalEditar(false)
        db.collection('Proyectos').doc(id).get();
        db.collection('Proyectos').doc(id).update(proyectosele.nuevoProyecto);
    }

    const abrirModalInsertar = () => {
        setModalInsertar(true)
    }

    return (
        <div className="App">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="btn btn-light" onClick={handleClickHome} > Atrás </button>
                    <button className="btn btn-light" onClick={() => abrirModalInsertar()}> Crear nuevo proyecto </button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>

            <h2> Proyectos</h2>

            <table className="table ">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Fecha de Inicio</th>
                        <th>Direccion</th>
                        <th>Constructora</th>
                        <th>Contacto</th>

                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaProyectos.map(elemento => {
                        return <tr>
                            <td>{elemento.id}</td>
                            <td>{elemento.nProyecto}</td>
                            <td>{elemento.fechaInicio}</td>
                            <td>{elemento.direccion}</td>
                            <td>{elemento.constructora}</td>
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
                        <h3>Editar Proyecto</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Codigo</label>
                        <input className="form-control"
                            readOnly
                            type="text"
                            name="codigo"
                            value={filaActual.id}
                        />
                        <br />
                        <label> Nombre del Proyecto</label>
                        <input
                            className="form-control"
                            type="text"
                            name="nProyecto"
                            value={proyectosele && proyectosele.nProyecto}
                            onChange={handleChange}
                        />
                        <br />
                        <label> Fehca Inicio</label>
                        <input
                            className="form-control"
                            type="date"
                            name="fechaInicio"
                            value={proyectosele && proyectosele.fechaInicio}
                            onChange={handleChange}
                        />
                        <br />
                        <label> Direccion</label>
                        <input
                            className="form-control"
                            type="text"
                            name="direccion"
                            value={proyectosele && proyectosele.direccion}
                            onChange={handleChange}
                        /><br />
                        <label> Constructora</label>
                        <input
                            className="form-control"
                            type="text"
                            name="constructora"
                            value={proyectosele && proyectosele.constructora}
                            onChange={handleChange}
                        />
                        <br />
                        <label> Contacto</label>
                        <input
                            className="form-control"
                            type="text"
                            name="contacto"
                            value={proyectosele && proyectosele.contacto}
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
                    ¿Estàs seguro que deseas eliminar este proyecto {proyectosele && proyectosele.nProyecto}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => eliminar()}> Sì </button>
                    <button className="btn btn-secondary" onClick={() => setModalEliminar(false)}> No</button>
                </ModalFooter>
            </Modal>



            <Modal isOpen={modalInsertar}>
                <ModalHeader>
                    <div>
                        <h3>Crear Proyecto</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label> Codigo </label>
                        <input
                            className="form-control"
                            type="text"
                            name="codigo"
                            value={proyectosele ? proyectosele.codigo : ''}
                            onChange={handleChange}
                        />
                        <br />
                        <label> Nombre del Proyecto</label>
                        <input
                            className="form-control"
                            type="text"
                            name="nProyecto"
                            value={proyectosele ? proyectosele.nProyecto : ''}
                            onChange={handleChange}
                        />
                        <br />
                        <label> Fehca Inicio</label>
                        <input
                            className="form-control"
                            type="date"
                            name="fechaInicio"
                            value={proyectosele ? proyectosele.fechaInicio : ''}
                            onChange={handleChange}
                        />
                        <br />
                        <label> Direccion</label>
                        <input
                            className="form-control"
                            type="text"
                            name="direccion"
                            value={proyectosele ? proyectosele.direccion : ''}
                            onChange={handleChange}

                        /><br />
                        <label> Constructora</label>
                        <input
                            className="form-control"
                            type="text"
                            name="constructora"
                            value={proyectosele ? proyectosele.constructora : ''}
                            onChange={handleChange}
                        />
                        <br />
                        <label> Contacto</label>
                        <input
                            className="form-control"
                            type="text"
                            name="contacto"
                            value={proyectosele ? proyectosele.contacto : ''}
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
