import { useStore, actions } from './store';
import './App.css';
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

function EditTask({ indexEdit }) {
    // Set state of showlist
    const [state, dispatch] = useStore()
    const { listTask, taskEdit } = state
    const minDate = new Date();
    console.log(taskEdit.deadline)
   // console.log(taskEdit)
    const validationForm = () => {
        let returnData = {
            error: false,
            msg: ''
        }
        const taskCheck = taskEdit
        if (taskCheck.name === '' || taskCheck.description === '') {
            returnData.error = true
            returnData.msg = 'Name or description can\'t empty'
        }
        return returnData;
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = validationForm()
        if (validation.error) {
            alert(validation.msg)
        }
        else {
            const newList = [...listTask]
            newList[indexEdit] = taskEdit
            dispatch(actions.updateListTask(newList))
            dispatch(actions.setTaskEditName(''))
            dispatch(actions.setTaskEditDescription(''))
            dispatch(actions.updateEditForm(false))
        }
    }

    {
        return (
            <div className='modal'>
                <div className='overlay'>
                    <button className='btn-close' onClick={() => dispatch(actions.updateEditForm(false))}>&times;</button>
                    <h1>Edit Task</h1>
                    <div className='form-edit'>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input className='edit-name' value={taskEdit.name} placeholder='Name' onChange={(e) => {
                                dispatch(actions.setTaskEditName(e.target.value))
                            }} />
                            <br />
                            <input className='edit-description' value={taskEdit.description} placeholder='Description...' onChange={(e) => {
                                dispatch(actions.setTaskEditDescription(e.target.value))
                            }} />
                            <br />
                            <div className='deadline-edit'>
                                <DateTimePickerComponent
                                    placeholder='Choose a date and time'
                                    value={new Date(taskEdit.deadline)}
                                    onChange={(e) => {
                                        dispatch(actions.setTaskEditDeadline(convertDateToStringFormat(e.target.value)))
                                    }}
                                    min={minDate}
                                >
                                </DateTimePickerComponent>
                            </div>
                            <button className='btn-save' >Save</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditTask;