import "../../styles/Modal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons'
const Modal = (props,) => {




    return (
        <div style={{ display: props.display ? "block" : "none", animation: props.animation }}
            className="modal">
            <FontAwesomeIcon onClick={props.closeBtnFunction} className='icon' icon={faXmarkSquare} />
            {props.child}
        </div>
    )
}

export default Modal
