import { useStore, actions } from './store';
import './App.css';



function EditTask({indexEdit}) {
    // Set state of showlist
    const [state, dispatch] = useStore()
    const { listTask, task, showList, editForm,taskEdit } = state

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
    {
        return (
            <div className='modal'>
                <div className='overlay'>
                    <button className='btn-close' onClick={() => dispatch(actions.updateEditForm(false))}>&times;</button>
                    <h1>Edit Task</h1>
                    <div className='form-edit'>
                        <form onSubmit={(e) => {
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
                        }}>
                            <input className='edit-name' value={taskEdit.name} placeholder='Name' onChange={(e) => {
                                dispatch(actions.setTaskEditName(e.target.value))
                            }} />
                            <br />
                            <input className='edit-description' value={taskEdit.description} placeholder='Description...' onChange={(e) => {
                                dispatch(actions.setTaskEditDescription(e.target.value))
                            }} />
                            <br />
                            <button className='btn-save' >Save</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditTask;