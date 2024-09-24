import Modal from "./Modal"
import { useState, useRef } from "react"
import { useBudgets } from "../../contexts/BudgetContext"

function AddBudgetModal(props) {
    const nameRef = useRef()
    const maxRef = useRef()
    const [borderTitle, setBorderTitle] = useState("transparent")
    const [borderAmount, setBorderAmount] = useState("transparent")

    const { addBudget } = useBudgets()
    function handleAddBudgetSumbit(e) {
        e.preventDefault();


        if (nameRef.current.value.length > 0 && maxRef.current.value.length > 0
            && maxRef.current.value.length <= 12) {
            addBudget({
                name: nameRef.current.value,
                max: parseFloat(maxRef.current.value),
                resetEveryMonth: document.getElementById("c1-13").checked
            })
            nameRef.current.value = ""
            maxRef.current.value = ""
            props.closeBtnFunction()
            setBorderTitle("none")
            setBorderAmount("none")
            if (localStorage.getItem('theme') == "light" || localStorage.getItem('theme') == null)
                setTimeout(function () {
                    applyLightTheme()
                }, 50)
        }
        else {
            if (nameRef.current.value.length == 0)
                setBorderTitle("#e84545 0px 4px 0px")
            else if ((nameRef.current.value.length > 0)) {
                setBorderTitle("none")

            }
            if (maxRef.current.value.length == 0 || maxRef.current.value.length >= 12)
                setBorderAmount("#e84545 0px 4px 0px")
            else if ((maxRef.current.value.length > 0)) {
                setBorderAmount("none")

            }
        }
    }

    function applyLightTheme() {
        const containerElements = document.getElementsByClassName('container');
        const modalElements = document.getElementsByClassName('modal');
        const outerBarElements = document.getElementsByClassName('outer-bar');

        const backgroundStyles =
        {
            container: 'rgba(195, 195, 195, 0.1)',
            modal: 'rgba(237, 237, 237, 0.5)',
            outerBar: 'rgb(209, 209, 209)'
        };

        for (let i = 0; i < containerElements.length; i++) {
            containerElements[i].style.background = backgroundStyles.container;
            containerElements[i].style.animation = "boxIn 0.3s forwards 0s";

        }
        for (let i = 0; i < modalElements.length; i++) {
            modalElements[i].style.background = backgroundStyles.modal;
        }
        for (let i = 0; i < outerBarElements.length; i++) {
            outerBarElements[i].style.backgroundColor = backgroundStyles.outerBar;
        }
    }
    return (
        <div>
            <Modal closeBtnFunction={props.closeBtnFunction}
                display={props.display} animation={props.animation}
                child={
                    <form action="" onSubmit={handleAddBudgetSumbit}>
                        <h2>Add budget</h2>
                        <p>Budget name</p>
                        <input className="input" style={{ boxShadow: borderTitle }} ref={nameRef} type="text" />
                        <p>Max spending</p>
                        <input className="input" style={{ boxShadow: borderAmount }} step="any" ref={maxRef} type="number"
                            maxLength={5} />
                        <button type='submit'>Add</button>
                        <div class="checkbox-wrapper-13">
                            <label for="c1-13">Reset every month?</label>
                            <input id="c1-13" type="checkbox" />
                        </div>

                    </form>
                }>

            </Modal>
        </div>
    )
}

export default AddBudgetModal
