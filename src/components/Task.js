import {FaTimes} from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const Task = ({ task, onDelete, onToggle}) => {
  const loc = useLocation()

    return (
         <div> 
            {loc.pathname === '/' && <p  className={`task ${task.reminder ? 'reminder' : ''}`} 
                onDoubleClick = { () => onToggle (task.id) }>
                <h3  style={{textTransform:"uppercase"}}>
                { task.text }
            <span className={`task ${task.reminder ? 'pending' : 'pendingnone'}`} 
                onDoubleClick = { () => onToggle (task.id) } style={{}}>Pending</span> 
                <FaTimes 
                    style = {{color:'#DB3A34', cursor:'pointer'}} 
                    onClick = {() => onDelete(task.id)}
                />
            </h3>
            <p style={{color:"black"}}>{task.creationDate}</p>
            <p style={{color:"black"}}>{task.date}</p>
        </p>}
        </div>
    )
}

export default Task