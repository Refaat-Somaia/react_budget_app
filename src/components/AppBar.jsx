import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAdd, faCloudArrowUp, faTrashCan, faSun,
    faMoon, faMobile, faChartColumn, faWallet
} from '@fortawesome/free-solid-svg-icons'
import "../styles/AppBar.css"
import AddBudgetModal from "./modals/AddBudgetModal";
import LinkToAppModal from './modals/LinkToAppModal';
import { useState, useEffect } from "react"
import logo from "../assets/logo.svg"
import { useBudgets } from '../contexts/BudgetContext';
import UploadToCloud from './modals/UploadToCloud';

function AppBar() {
    const [showModal, setShowModal] = useState(false)
    const [showLinkModal, setShowLinkModal] = useState(false)
    const [showCloudModal, setShowCloudModal] = useState(false)
    const [modalAnimation, setModalAnimation] = useState(false)
    const [themeIcon, setThemeIcon] = useState(faSun);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });
    const { swapPage, page } = useBudgets();
    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode-body' : 'light-mode-body';
    }, [isDarkMode]);

    const changeTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        setThemeIcon(isDarkMode ? faMoon : faSun);

        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        const containerElements = document.getElementsByClassName('container');
        const modalElements = document.getElementsByClassName('modal');
        const outerBarElements = document.getElementsByClassName('outer-bar');
        const cardElements = document.getElementsByClassName('card');

        const backgroundStyles = isDarkMode
            ? {
                container: 'rgba(75, 75, 75, 0.1)',
                modal: 'rgba(75, 75, 75, 0.1)',
                bar: "#171717",

                boxShadow: "0 4px 30px rgba(164, 164, 164, 0.1)",
                outerBar: 'rgb(43, 43, 43)'
            }
            : {
                container: 'rgba(195, 195, 195, 0.1)',
                modal: 'rgba(237, 237, 237, 0.5)',
                bar: "#f2f2f2",

                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                outerBar: 'rgb(209, 209, 209)'
            };

        for (let i = 0; i < containerElements.length; i++) {
            containerElements[i].style.background = backgroundStyles.container;
        }
        document.getElementById("total").style.boxShadow = backgroundStyles.boxShadow;
        for (let i = 0; i < cardElements.length; i++) {
            cardElements[i].style.boxShadow = backgroundStyles.boxShadow;
        }
        document.getElementsByClassName("bar")[0].style.background = backgroundStyles.bar
        for (let i = 0; i < modalElements.length; i++) {
            modalElements[i].style.background = backgroundStyles.modal;
        }
        for (let i = 0; i < outerBarElements.length; i++) {
            outerBarElements[i].style.backgroundColor = backgroundStyles.outerBar;
        }
    }, [isDarkMode]);




    function openModal() {
        document.getElementById("blurBg").style.display = 'block'
        document.getElementById("blurBg").addEventListener("click", function () {
            closeModal()
        })
        setModalAnimation("modalIn 0.5s")
        setShowModal(true)
    }

    function closeModal() {
        document.getElementById("blurBg").style.display = "none";
        setModalAnimation("modalOut 0.5s")
        setTimeout(function () {
            setShowModal(false)
            setShowLinkModal(false)
            setShowCloudModal(false)
        }, 200)
    }

    function openLinkModal() {
        document.getElementById("blurBg").style.display = 'block'
        document.getElementById("blurBg").addEventListener("click", function () {
            closeModal()
        })
        setModalAnimation("modalIn 0.5s")
        setShowLinkModal(true)
    }


    function openCloudModal() {
        document.getElementById("blurBg").style.display = 'block'
        document.getElementById("blurBg").addEventListener("click", function () {
            closeModal()
        })
        setModalAnimation("modalIn 0.5s")
        setShowCloudModal(true)
    }




    function showDelete() {
        let e = document.getElementsByClassName("delete-circle")
        if (e.length > 0 && page == 0) {
            if (e[0].style.display != 'block') {
                document.getElementById("deleteBtn").style.color = "#E84545"
                document.getElementById("deleteBtn").style.opacity = "1"

                for (let i = 0; i < e.length; i++) {
                    e[i].style.animation = "circlePop 0.5s"
                    e[i].style.display = 'block'
                }
            }
            else {
                for (let i = 0; i < e.length; i++) {
                    document.getElementById("deleteBtn").style.color = "inherit"
                    document.getElementById("deleteBtn").style.opacity = 0.5


                    e[i].style.animation = "circlePopOut 0.3s"
                    setTimeout(function () {
                        e[i].style.display = 'none'
                    }, 200)
                }

            }
        }
    }



    return (
        <><div className='bar'>
            <img src={logo} alt="" />
            <button onClick={openModal}><FontAwesomeIcon className='icon' icon={faAdd} /><span>Add</span> </button>
            <button onClick={showDelete}>
                <FontAwesomeIcon id='deleteBtn' className='icon' icon={faTrashCan} /><span id='deleteSpan'>Delete</span> </button>
            <button onClick={openCloudModal} id='viewBtn'>
                <FontAwesomeIcon className='icon' icon={faCloudArrowUp} /><span>Cloud</span>  </button>
            <button onClick={() => { swapPage(1) }}>
                <FontAwesomeIcon className='icon' icon={page == 0 ? faChartColumn : faWallet} />
                <span>{page == 0 ? "Stats" : "Budgets"}</span> </button>

            <button onClick={openLinkModal}>
                <FontAwesomeIcon className='icon' icon={faMobile} /><span>Link to App</span> </button>

            <button onClick={changeTheme}>
                <FontAwesomeIcon className='icon' icon={themeIcon} />
                <span>{themeIcon == faMoon ? "Dark" : "Light"}</span> </button>
        </div>
            <AddBudgetModal closeBtnFunction={closeModal} display={showModal}
                animation={modalAnimation} />

            <LinkToAppModal closeBtnFunction={closeModal} display={showLinkModal}
                animation={modalAnimation} />

            <UploadToCloud closeBtnFunction={closeModal} display={showCloudModal}
                animation={modalAnimation} />


        </>

    )
}

export default AppBar