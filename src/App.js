import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  
];

class App extends React.Component{
state={
  data: data,
  form:{
    id:'',
    titulo:'',
    detalle:''
  },
  modalInsertar: false,
  modalEditar: false,
};

handleChange=e=>{
this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value,
  }
})
}

mostrarModalInsertar=()=>{
  this.setState({modalInsertar: true});
}

ocultarModalInsertar=()=>{
  this.setState({modalInsertar: false});
}

mostrarModalEditar=(registro)=>{
  this.setState({modalEditar: true, form: registro});
}

ocultarModalEditar=()=>{
  this.setState({modalEditar: false});
}

insertar=()=>{
  var valorNuevo={...this.state.form};
  valorNuevo.id=this.state.data.length+1;
  var lista=this.state.data;
  lista.push(valorNuevo);
  this.setState({data: lista, modalInsertar: false});
}

editar=(dato)=>{
  var contador=0;
  var lista=this.state.data;
  lista.map((registro)=>{
    if(dato.id===registro.id){
      lista[contador].titulo=dato.titulo;
      lista[contador].detalle=dato.detalle;
    }
    contador++;
  });
  this.setState({data: lista, modalEditar: false});
}

eliminar=(dato)=>{
  var opcion=window.confirm("Quiere eliminar la tarea " +dato.id);
  if(opcion){
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if(registro.id===dato.id){
        lista.splice(contador, 1);
      }
      contador++;
    });
    this.setState({data: lista});
  }
}

completar=(dato)=>{
  var opcion=window.confirm("Completar la tarea ");
  if(opcion){
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if(registro.id===dato.id){
        lista.splice(contador, 1);
      }
      contador++;
    });
    this.setState({data: lista});
  }
}

  render(){
    return(
      <>
      <Container>
      <th>TAREAS PENDIENTES</th> 
      <br />
      <Button color="warning" onClick={()=>this.mostrarModalInsertar()}>AGREGAR TAREA</Button>
    <br /><br />

    <Table>

      <thead><tr><th>Id</th>
      <th>Titulo</th>
      <th>Detalles(opcional)</th>
      <th>Acciones</th></tr></thead>
        <tbody>
        {this.state.data.map((elemento)=>(
          <tr>
            <td>{elemento.id}</td>
            <td>{elemento.titulo}</td>
            <td>{elemento.detalle}</td>
            <td>
            <Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>
            {"  "}
            <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button>
            {"  "}
            <Button color="success" onClick={()=>this.completar(elemento)}>Completar</Button>
            </td>
            

          </tr> 

        ))}
        </tbody>
      </Table>
    </Container>

    <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id}/>
            </FormGroup>
            
            <FormGroup>
              <label>Titulo:</label>
              <input className="form-control" name="titulo" type="text" onChange={this.handleChange} value={this.state.form.titulo}/>
            </FormGroup>
            
            <FormGroup>
              <label>Detalle(opcional):</label>
              <input className="form-control" name="detalle" type="text" onChange={this.handleChange} value={this.state.form.detalle}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary"  onClick={()=>this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>


    <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Registro</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
            </FormGroup>
            
            <FormGroup>
              <label>Titulo:</label>
              <input className="form-control" name="titulo" type="text" onChange={this.handleChange}/>
            </FormGroup>
            
            <FormGroup>
              <label>Detalle(opcional):</label>
              <input className="form-control" name="detalle" type="text" onChange={this.handleChange}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary"onClick={() => this.insertar()}>Insertar</Button>
            <Button color="danger"onClick={() => this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

    </>)
  }
}
export default App;
