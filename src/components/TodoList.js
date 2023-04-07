import { useState } from "react";


export default function TodoList(){

    const[lista, setLista] = useState([]);
    const[crear, setCrear] = useState(false);
    const [id, setId] = useState(0);

    function crearTarea(){
        setCrear(true);
    }

    function eliminarTarea (item){
        setLista(()=>lista.filter(tarea => tarea !== item));
    }

    function addTarea(evento){
        evento.preventDefault();
        const nuevaTarea = evento.target[0].value;
        setLista(()=>[...lista, {id: id, name: nuevaTarea}]);
        setId(id+1)
        setCrear(false);
    }

    function cancelarTarea(){
        setCrear(false);
    }

    return(
        <div>
            <h1>Todo List</h1>
            <div>
                <button onClick={crearTarea}>Crear</button>
            </div>
            {crear ? <CrearTarea aceptar={addTarea} cancelar={cancelarTarea}/> : null}
            <div>
                <Tarea lista={lista} eliminar={eliminarTarea} setLista={setLista}/>
            </div>
        </div>
    )
}

function CrearTarea(props){
    return(
        <div>
            <h2>Nueva Tarea</h2>
            <form onSubmit={props.aceptar}>
            <input type="text"/>
            <div>
            <input type="submit" value="Aceptar"/>
            <button onClick={props.cancelar}>Cancelar</button>
            </div>
            </form>
        </div>
    )
}

function Tarea(props){

    const[modificar, setModificar] = useState(null);

    function editar(evento, itemLista){
        const elemento = evento.target[0].value
        if(elemento === ''){
            setModificar(null);
            return;
        }
        props.lista.map((item, index) =>{
            if(item === itemLista){
                props.lista[index].name = elemento
            }
        })
        props.setLista(props.lista);
        setModificar(null);
    }
    

    function elementoNoEditando(item){
        return(
            <div>
                <p>{item?.name || ""} </p>
                <button onClick={()=>setModificar(item)}>Modificar </button>
                <button onClick={()=>props.eliminar(item)}>Eliminar </button>
            </div>
        )
    }
    function elementoEditando(item){
        return(
            <div>
                <form onSubmit={(evento)=>editar(evento, item)}>
                <input type="text" placeholder={item?.name || ""}/> 
                <div>
                <input type="submit" value="Editar"/>
                <button onClick={()=>setModificar(null)}>Cancelar </button>
                </div>
                </form>
                
            </div>
        )
    }
    function estadoModificar(item){
        return(
            modificar == null ? elementoNoEditando(item)  : 
                                item !== modificar ? elementoNoEditando(item) : elementoEditando(item)
            
        )
    }

    return(
        <div>
            <ul>
                {props.lista.map((item)=>(
                    <li key={item?.id || null}>
                        {estadoModificar(item)}
                        </li>

                ))}
            </ul>
        </div>
    )
}