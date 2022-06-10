import { useState, useEffect } from "react";
import {BrowserRouter as Router,Routes , Route} from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask ]=useState(false)
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getTask = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
      }
      getTask()
    }, [])
    //Fetch Tasks
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      return data;
    }
    //Fetch Tasks
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data;
    }
    const creationDates = (term) => {
      const date = new Date();
      const month = ['Jan', 'Feb', 'May', 'Apr', 'March', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', ];
      const cDate = `${month[(date.getMonth())]} ${date.getDate()}th`;
      const cTime = date.getHours() + ':' + date.getMinutes();
      const cdate = 'Creation Date: ' + cDate + ' At ' + cTime;
      term = cdate;
      return term;
    }
    const deliveryDates = (term) => {
      const month = ['Jan', 'Feb', 'May', 'Apr', 'March', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', ];
      const date = term;
      const onlyDate = date.split("-", 3);
      const time = onlyDate[2].split("T", 2);
      const deliveryDate = `Delivery Date: ${month[(parseInt(onlyDate[1])-1)]} ${time[0]}th At ${time[1]}`;
      term= deliveryDate;
      return term;
    }
    //Add Task
  const addTask = async (task) =>{
    task.creationDate = creationDates( task.creationDate);
    task.date = deliveryDates(task.date)
    const res = await fetch(`http://localhost:5000/tasks`,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }
  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }
  //Toggle Reminder
  const toggleReminder = async(id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { 
      ...taskToToggle, reminder: !taskToToggle.reminder
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json();
    setTasks(
      tasks.map(
        (task) => task.id === id ? {
        ...task, reminder: data.reminder
        } : task
      )
    )
  }
  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask (!showAddTask)} 
          showAdd={showAddTask}/>
        {showAddTask && <AddTask onAdd= {addTask}/>}
        {tasks.length > 0 ?
        ( <Tasks
          tasks = {tasks}
          onDelete = {deleteTask}
          onToggle ={toggleReminder}/>
        ) : ('Not Task to Show Now')}
          <Routes>
          <Route
            exact strict path= '/' element render={(props) => (
            <>

            {showAddTask && <AddTask onAdd= {addTask}/>}
              {tasks.length > 0 ? ( <Tasks
                tasks = {tasks}
                onDelete = {deleteTask}
                onToggle ={toggleReminder}/>
              ) : ('Not Task to Show Now')}
            
            </>
            )} />
          <Route exact path= '/about' element={<About/>} />
        </Routes>
      <Footer />
      </div>
    </Router>
    );
}
export default App;
