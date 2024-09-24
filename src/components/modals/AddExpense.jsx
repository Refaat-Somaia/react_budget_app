import { useRef, useState } from 'react'
import Modal from './Modal'
import { useBudgets } from "../../contexts/BudgetContext";

function AddExpense(props) {

    const { addExpense, weekNumber, updateExpensesStorage } = useBudgets();
    const [borderTitle, setBorderTitle] = useState("transparent")
    const [borderAmount, setBorderAmount] = useState("transparent")

    const descriptionRef = useRef()
    const amountRef = useRef()

    function submitAddExpense(e) {
        e.preventDefault()
        if (descriptionRef.current.value.length > 0 && amountRef.current.value.length > 0
            && amountRef.current.value.length <= 12) {
            let month = new Date().getMonth() + 1
            let year = new Date().getFullYear()
            let week = parseInt(weekNumber())
            // alert(week)

            addExpense({
                budgetId: props.id,
                week: week,
                month: month, year: year,
                description: descriptionRef.current.value,
                amount: amountRef.current.value
            })

            descriptionRef.current.value = ""
            amountRef.current.value = ""
            props.closeBtnFunction()
            setBorderTitle("none")
            setBorderAmount("none")
        }
        else {
            if (descriptionRef.current.value.length == 0)
                setBorderTitle("#e84545 0px 4px 0px")
            else if ((descriptionRef.current.value.length > 0)) {
                setBorderTitle("none")

            }
            if (amountRef.current.value.length == 0 || amountRef.current.value.length >= 12)
                setBorderAmount("#e84545 0px 4px 0px")
            else if ((amountRef.current.value.length > 0)) {
                setBorderAmount("none")

            }


        }

    }
    return (
        <div>
            <Modal closeBtnFunction={props.closeBtnFunction}
                display={props.display} animation={props.animation}
                child={
                    <><h2>Add to "{props.title}"</h2>
                        <form action="" onSubmit={submitAddExpense}>
                            <p>Expense</p>
                            <input className='input' style={{ boxShadow: borderTitle }} ref={descriptionRef} type="text" />
                            <p>Amount</p>
                            <input className='input' style={{ boxShadow: borderAmount }} ref={amountRef} type="number" step="any" />
                            <button type='submit'>Add</button>
                        </form></>
                }>

            </Modal>
        </div>
    )
}

export default AddExpense
