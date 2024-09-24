import "../styles/Container.css"
import ProgressBar from "./ProgressBar"
import ViewExpenses from "./modals/ViewExpenses"
import AddExpense from "./modals/AddExpense"
import { useState } from "react"
import { useBudgets } from "../contexts/BudgetContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import DeleteBudgetModal from "./modals/DeleteBudgetModal"

function Container(props) {

    const { deleteBudget, getBudgetExpenses, formatAmount } = useBudgets();

    const [showViewExpenses, setshowViewExpenses] = useState(false)
    const [showAddExpense, setshowAddExpense] = useState(false)
    const [showDeleteBudget, setShowDeleteBudget] = useState(false)
    const [modalAnimation, setModalAnimation] = useState(false)


    function openModal() {
        document.getElementById("blurBg").style.display = 'block'
        document.getElementById("blurBg").addEventListener("click", function () {
            closeModal()
        })
        setModalAnimation("modalIn 0.5s")
    }

    function closeModal() {
        document.getElementById("blurBg").style.display = "none";
        setModalAnimation("modalOut 0.5s")
        setTimeout(function () {
            setshowViewExpenses(false)
            setshowAddExpense(false)
            setShowDeleteBudget(false)

        }, 400)
    }
    function getCurrentAmount() {
        let x = 0;
        getBudgetExpenses(props.id).map((e) => {
            x += parseFloat(e.amount)
        })
        return x
    }

    function handleDeleteBudget() {
        openModal()
        setShowDeleteBudget(true)
    }

    function handleViewExpenses() {
        setshowViewExpenses(true)
        openModal()
    }
    function handleAddExpense() {

        setshowAddExpense(true)
        openModal()
    }

    // alert(formatAmount(props.maxAmount))

    return (
        <><div className="container" >
            <div className="row">
                <span className="title"><b>{props.title}</b></span>
                <div style={{
                    width: "35%",
                    display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end',

                }}>
                    <span className="amount-current">{`${formatAmount(getCurrentAmount())}`} </span>
                    <span className="amount-total">/ {formatAmount(props.maxAmount)}</span>
                </div>
            </div>
            <div style={{ height: "2rem" }}></div>
            <ProgressBar prog={`${(getCurrentAmount() / (props.maxAmount)) * 100 > 100 ? 100 :
                (getCurrentAmount() / (props.maxAmount)) * 100}%`} />
            <div style={{ height: "4rem" }}></div>
            <button onClick={handleAddExpense} id="addExpense">Add expense</button>
            <button onClick={handleViewExpenses} id="viewExpenses">View expenses</button>
            <FontAwesomeIcon onClick={handleDeleteBudget} className="delete-circle" icon={faMinusCircle} />
        </div>
            <ViewExpenses display={showViewExpenses} animation={modalAnimation}
                closeBtnFunction={closeModal} title={props.title} id={props.id} />

            <AddExpense
                id={props.id}
                title={props.title} closeBtnFunction={closeModal}
                display={showAddExpense} animation={modalAnimation} />

            <DeleteBudgetModal title={props.title} closeBtnFunction={closeModal} display={showDeleteBudget}
                animation={modalAnimation} id={props.id} />
        </>
    )
}

export default Container