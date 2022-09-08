import { useStore, actions } from './store';
import './App.css';
import { useEffect, useMemo } from 'react';
import ShowList from './ShowList';
import EditTask from './EditTask'


function App() {
 
  const [state, dispatch] = useStore()
  const { listTask, task, showList, editForm } = state
  
  // Set list task in local Storage
  const setListInLocalStorage = () => {
    const jsonJobs = JSON.stringify(listTask)
    localStorage.setItem('listTask', jsonJobs)
  }

  useEffect(()=>{
    setListInLocalStorage()
  },[listTask])
  
  
  // Validate Form
  const validationForm = () => {
    let returnData = {
      error: false,
      msg: ''
    }
    const taskCheck = task
    if (taskCheck.name === '' || taskCheck.description === '') {
      returnData.error = true
      returnData.msg = 'Name or description can\'t empty'
    }
    return returnData;
  }

  
  // add task to list
  const handleAdd = () => {
    dispatch(actions.addTask(task))
  }
 
  // clear input
  const clearInput = () => {
    dispatch(actions.setTaskName(''))
    dispatch(actions.setTaskDescription(''))
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Todo App</h1>
      </div>

      <form className='Create-task' onSubmit={(e) => {
        e.preventDefault();
        const validation = validationForm()
        if (validation.error) {
          alert(validation.msg)
        }
        else {
          handleAdd()   
          clearInput()
        }
      }}>

        <input className='input-name' type="text" value={task.name} placeholder="Name" onChange={(e) => {
          dispatch(actions.setTaskName(e.target.value))
        }} />
        <button className='btn'><i className='fa-solid fa-plus'></i> Add new item</button>
        <br />
        <input className='input-description' type="text" value={task.description} placeholder="Description..." onChange={(e) => {
          dispatch(actions.setTaskDescription(e.target.value))
        }} />

      </form>

        <ShowList />
       
    </div>
  );
}

export default App;
