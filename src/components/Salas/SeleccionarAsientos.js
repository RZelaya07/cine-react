import React, { useEffect, useState } from 'react'
import './Cine.css'
import { useLocation  } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { API_URL } from '../../shared/API_URL';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
export const SeleccionarAsientos = () => {

    let filas = [...Array(5)]
    let columnas = [...Array(10)]
    const [seleccionados, setSeleccionados] = useState([])
    const [bloqueados, setBloqueados] = useState([])
    const [loading, setLoading] = useState(false);
    const [reservas, setReservas] = useState([]);
    const ususuarioActivo =  JSON.parse(localStorage.getItem('usuario'));
    const location = useLocation();
    const arraysplit = location.pathname.split("/");
    const horario = arraysplit[2];
    const idPelicula = arraysplit[3];
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //const parametro = this.props.location; // this is Par1
    console.log(arraysplit[2]+" -horario    "+arraysplit[3]+"  -pelicula");
    const [covid, setCovid] = useState(['03', '04','08','09',
                                '10','11','15','16','23','24',
                                '28','29','30','31','35','36',
                                '43','44','48','49'])
    useEffect(() => {
        console.log(bloqueados);
    }, [bloqueados])

    useEffect(() => {
            if (!loading) {
                fetch(`${API_URL}/reservaciones/${horario}`)
                    .then(response => response.json())
                    .then(data => {setReservas((data))
                        console.log("data")
                        console.log(data)
                    });
            }
    
    }, [loading]);

    useEffect(() => {
        console.log(reservas.length);
        console.log("el tamaño y luego el primer elemento");
        console.log(reservas[1]);
        let reservasPelicula = reservas.filter( (select) => select.id_pelicula === idPelicula )
        const asientosApartados = reservasPelicula.map(select => {
            //return select.asientos;
            setBloqueados( [...bloqueados, ...select.asientos.split(",")] )
            console.log(select.asientos+" -asiento")
        });
        //console.log(asientosApartados[1]);
       
    }, [reservas]);

    
    
    //console.log(parametro);
    const seleccionarButaca = (index1, index2) => {
        let butaca = `${index1}${index2}`

        let bloqueado = bloqueados.filter( (select) => select === `${index1}${index2}` )
        let asientosCovid =covid.filter( (select) => select === `${index1}${index2}` )
        if(!bloqueado.length > 0 && !asientosCovid.length >0 ){
            let seleccionado = seleccionados.filter( (select) => select === butaca )
            if(seleccionado.length > 0){
                setSeleccionados( seleccionados.filter((select) => select !== butaca )  )
            }else{
                setSeleccionados( [...seleccionados, butaca] )
            }
        }
    }

    const getEstilo = (index1, index2) => {
        let seleccionado = seleccionados.filter( (select) => select === `${index1}${index2}` )
        let bloqueado = bloqueados.filter( (select) => select === `${index1}${index2}` )
        let distanciamiento = covid.filter( (select) => select === `${index1}${index2}` )
        if(bloqueado.length > 0){
            return { backgroundColor: 'firebrick' }
        }
        else if(seleccionado.length > 0){
            return { backgroundColor: 'lightgreen' }
        }else if(distanciamiento.length > 0){
            return { backgroundColor: 'darkgray' }
        } 
        return {}
    }

    const reservar = () => {
        //aqui copiar todos los seleccionados
        let reservaNueva = {
            id_usuario: ususuarioActivo._id,
            id_pelicula: idPelicula,
            horario: horario,
            asientos: `${[...seleccionados]}`,
            cant_asientos:seleccionados.length,
            total: seleccionados.length*40,
            sala: `Sala ${horario}`,
            estado: true
        }

        console.log(reservaNueva);
        newReservacionAPI(reservaNueva)

        setBloqueados( [...bloqueados, ...seleccionados] )
        setShow(true);
        //setSeleccionados([])
        //alert(`Reservados: ${seleccionados}`)
    }

    const newReservacionAPI = (reservacion) => {

        setLoading(true)
    
        fetch(`${API_URL}/reservaciones`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(reservacion)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setLoading(false)
            //CREAR UN DIALOGO DE EXITO
          })
          .catch(err => console.log(err))
      }

      const cartelera = () =>{
        navigate('/cartelera');
      }

      const getAsientos = () =>{
        const asientos = seleccionados.toLocaleString;
       return asientos;
      }

    return (
        <>
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
            >
            <Modal  show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Factura</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <center>
                    <p>Compra realizada con éxito</p>
                    <p>Asientos: {seleccionados.toString()}</p>
                    <p>Sala: 2   Hora: {horario.replace("-",":")}</p>
                    <p>Total: Q{seleccionados.length*40}.00</p>

                </center>
                </Modal.Body>

                <Modal.Footer>
                <Button variant="primary" onClick={cartelera}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </div>
        <div className='container mt-5'>
            {
                filas.map((y, index1) => (
                    <div className={`d-flex flex-row mb-3 gap-3 justify-content-md-center`} key={index1}>
                        {
                            columnas.map((x, index2) => (
                                <div key={index2} className={'butaca text-center'}
                                onClick={() => seleccionarButaca(index1, index2)}
                                style={getEstilo(index1, index2)}>
                                    [ { index1 } , { index2 } ]
                                </div>
                            ))
                        }
                    </div>
                )
                )
            }
            <button className='btn bg-info' onClick={reservar}> 
                Reservar
            </button>

        </div>
        
        </>
    )
}
