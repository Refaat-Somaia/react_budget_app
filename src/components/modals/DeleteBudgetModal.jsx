import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useBudgets } from "../../contexts/BudgetContext";

function DeleteBudgetModal(props) {

    const { deleteBudget, getBudgetExpenses, deleteExpense } = useBudgets();
    function handeDelete() {
        props.closeBtnFunction()
        if (document.getElementsByClassName('container').length == 1) {
            document.getElementById("deleteBtn").style.color = "inherit"
            document.getElementById("deleteBtn").style.opacity = 0.5
        }
        setTimeout(() => {
            deleteBudget(props.id)
            getBudgetExpenses(props.id).map((e) => {
                deleteExpense(e.id)
            })
        }, 300)

    }
    return (
        <Modal closeBtnFunction={props.closeBtnFunction}
            display={props.display} animation={props.animation} child={
                <>
                    <FontAwesomeIcon className='delete-icon' icon={faTrashCan} />
                    <p className='delete-p'>Are you sure you want to delete "{props.title}"</p>
                    <button onClick={handeDelete} className='delete-btn'>Delete</button>
                </>
            } />



    )
}

export default DeleteBudgetModal
