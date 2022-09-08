import { useStore, actions } from './store';
import './App.css';
import EditTask from './EditTask';



function ShowList() {
    // Set state of showlist
    const [state, dispatch] = useStore()
    const { listTask, task, showList, editForm, taskEdit } = state
    let indexEdit = 0;
    const indexOfList = []
    // Delete task in List Task
    const deleteTask = (value,index) => {
        if (window.confirm('Are you sure delete task ?')) {
            const newList = [...listTask]
            newList.splice(indexOfList[index],1)
            dispatch(actions.updateListTask(newList))
        }
    }

    // Set Checked button
    const handleCheck = (index) => {
        const newList = [...listTask]
        newList[indexOfList[index]].state = !newList[indexOfList[index]].state
        dispatch(actions.updateListTask(newList))
    }
    // Update edit form
    const updateForm = (input) => {
        dispatch(actions.updateEditForm(input))
    }

    // Set Task to Edit
    const setTask = (value)=>{
        dispatch(actions.setTask(value))
    }
    
    
    return (
        <div className='list'>
            <div className='type-list'>
                <button className={showList === false ? "btn-active" : "btn"} onClick={() => dispatch(actions.updateShowList(false))}>Todo</button>
                <button className={showList === true ? "btn-active" : "btn"} onClick={() => dispatch(actions.updateShowList(true))}>Done</button>
            </div>

            <table className='list-task'>

                <tr className='header-list'>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Checked</th>
                    <th>Action</th>
                </tr>

                {
                    listTask.filter((value,index) => {
                        if(value.state===showList){
                            indexOfList.push(index)
                        }
                        
                        return value.state === showList
                    })
                        .map((value, index) => {
                            return (
                                <tr className='content-list' key={index}>
                                    <td className='task-id' width={'7%'} >{index + 1}</td>
                                    <td className='task-name' width={'13%'}>{value.name}</td>
                                    <td className='task-description' width={'60%'}>
                                        {value.description}
                                    </td>

                                    <td className='task-checked' width={'10%'}>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={value.state === true}
                                                onChange={() => {
                                                    handleCheck(index)
                                                }}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </td>

                                    <td className='task-action' width={'10%'}>
                                        <button className='btn-edit' onClick={() => {
                                            indexEdit = index
                                            updateForm(true)
                                            setTask(value)
                                        }}>
                                            <i className='fa-solid fa-pen'></i>
                                        </button>

                                        <button className='btn-delete' onClick={() => {
                                            deleteTask(value, index)
                                        }}>
                                            <i className='fa-solid fa-trash-can'></i>
                                        </button>
                                    </td>

                                </tr>
                            )
                        })

                }

            </table>
            { editForm && <EditTask indexEdit = {indexEdit} /> }
        </div>
    )
}
export default ShowList;