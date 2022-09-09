import { useStore, actions } from './store';
import './App.css';
import { useEffect} from 'react';
import ShowList from './ShowList';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'

const convertDateToStringFormat = (dateInput) => {
    let day = dateInput.getDate();
    let month = dateInput.getMonth()+1;
    let year = dateInput.getFullYear();
    let hours = dateInput.getHours();
    let minutes = dateInput.getMinutes();
    const result = month.toString() + "/" +  day.toString() + "/" + year.toString() + " " + hours.toString() + ":" + minutes.toString();
    return result
  }
function App() {

  const [state, dispatch] = useStore()
  const { listTask, task, showList, editForm } = state
  const minDate = new Date();
  
  // Set list task in local Storage
  const setListInLocalStorage = () => {
    const jsonJobs = JSON.stringify(listTask)
    localStorage.setItem('listTask', jsonJobs)
  }

  useEffect(() => {
    setListInLocalStorage()
  }, [listTask])


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
    dispatch(actions.setTaskDeadline(minDate))
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
        <br />
        <div className='deadline'>
          <DateTimePickerComponent
            placeholder='Choose a date and time'
            value={new Date(task.deadline)}
            onChange={(e) => {
              dispatch(actions.setTaskDeadline(convertDateToStringFormat(e.target.value)))
            }}
           min= {minDate}
          >
          </DateTimePickerComponent>
        </div>

      </form>

      <ShowList />

    </div>
  );
}

export default App;
