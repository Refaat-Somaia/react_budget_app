import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan, faSave, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useBudgets } from "../contexts/BudgetContext";
import { useEffect, useRef, useState } from 'react';

function ExpenseContainer(props) {

    const [description, setDescription] = useState(props.description)
    const [amount, setAmount] = useState(props.amount)
    const [canEdit, setCanEdit] = useState(false)
    const [opacity, setOpacity] = useState(0.5)
    const [animOfDelete, setAnimOfDelete] = useState("none")
    const [anim, setAnim] = useState("none")
    const [icon, setIcon] = useState(faPen)
    const [border, setBorder] = useState("transparent")
    const { editExpense, deleteExpense } = useBudgets();

    function handleDeleteExpense(id) {


        setAnimOfDelete("delete 0.5s")
        setTimeout(function () {
            deleteExpense(id)
            setAnimOfDelete("none")
        }, 500)
    }

    function allowEdit() {
        setCanEdit(!canEdit)
        setIcon(faSave)
        setOpacity(1)
        setAnim("none")
        setBorder("#19A7CE")
    }
    function saveEdit() {
        setCanEdit(false)
        setBorder("#0EB29A")
        setIcon(faCheck)
        setAnim("iconIn 0.5s")
        editExpense({
            id: props.id,
            description: description,
            amount: amount,
        })
        setTimeout(() => {
            setOpacity(0.5)
            setAnim("iconIn 0.5s reversed")
            setIcon(faPen)
            setBorder("transparent")
        }, 1500)

    }
    return (
        <div style={{ animation: animOfDelete }} className='expense'>
            <div style={{ borderColor: border }} className='expense-details'>
                <input type="text" readOnly={!canEdit} value={description} onChange={(e) => {
                    setDescription(e.target.value)
                }} />
                {/* <p>{}</p> */}
                <input className='amount' readOnly={!canEdit} type="number" value={amount} onChange={(e) => {
                    setAmount(e.target.value)
                }} />
            </div>
            <div style={{ display: "flex", width: "20%", justifyContent: "space-around" }}>
                <button style={{ opacity: opacity }} onClick={canEdit ? saveEdit : allowEdit} id='editExpenseBtn'>
                    <FontAwesomeIcon className="icon" style={{ animation: anim }} icon={icon} />
                </button>
                <button onClick={() => handleDeleteExpense(props.id)} id='deleteExpenseBtn'>
                    <FontAwesomeIcon className="icon" icon={faTrashCan} />
                </button>
            </div>

        </div>
    )
}

export default ExpenseContainer
