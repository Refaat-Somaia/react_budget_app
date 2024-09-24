
import Modal from "./Modal"
import { useBudgets } from "../../contexts/BudgetContext";
import ExpenseContainer from '../ExpenseContainer';


function ViewExpenses(props) {
    const { getBudgetExpenses, saveAndReset } = useBudgets();

    function resetAndSave() {
        getBudgetExpenses(props.id).map((expense) => {
            saveAndReset(expense.id)
        })
        props.closeBtnFunction()
    }
    return (
        <div>
            <Modal closeBtnFunction={props.closeBtnFunction}
                display={props.display} animation={props.animation}
                child={
                    <>
                        <h2>"{props.title}" expenses</h2>

                        {getBudgetExpenses(props.id).length > 0 ?
                            <div className='expenses-container'>

                                {getBudgetExpenses(props.id).map((expense) => (
                                    <ExpenseContainer description={expense.description}
                                        id={expense.id} amount={expense.amount} day={expense.day} />
                                ))}
                            </div>

                            : <p className="note-modal">No expenses were added...</p>

                        }
                        {getBudgetExpenses(props.id).length > 0 ?
                            <button onClick={resetAndSave} className="save-and-reset">
                                Save and reset
                                <div className="hint">
                                    <p>
                                        Reset this budget but save it's
                                        current expenses into the statistics.
                                    </p>
                                </div>
                            </button> : <></>}
                    </>}>


            </Modal>
        </div>
    )
}

export default ViewExpenses
