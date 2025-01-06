import { useState } from 'react'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUpload, faCheckCircle, faXmark, faClock } from '@fortawesome/free-solid-svg-icons'
import { useBudgets } from "../../contexts/BudgetContext.js";


function UploadToCloud(props) {

    const { uploadDataToFirestore } = useBudgets();
    const [loading, setLoading] = useState(0);
    const [lock, setLock] = useState(false);

    return (
        <div>
            <Modal closeBtnFunction={props.closeBtnFunction}
                display={props.display} animation={props.animation}
                child={
                    <div style={{ position: 'relative', textAlign: "center" }}>
                        <h2 style={{ textAlign: 'center', top: "1rem" }}>Upload data to cloud</h2>
                        {loading == 0 ? <FontAwesomeIcon id='deleteBtn' className='cloud-icon' icon={faCloudUpload} />
                            : loading == 1 ? < FontAwesomeIcon id='deleteBtn' className='cloud-icon' icon={faClock} />
                                : loading == 2 ? < FontAwesomeIcon id='deleteBtn' className='cloud-icon' icon={faCheckCircle} />
                                    : < FontAwesomeIcon id='deleteBtn' className='cloud-icon' icon={faXmark} />
                        }
                        <p className='p-linkToApp'
                        >Upload your budgets data to cloud to access them from the mobile app and from
                            different devices.</p>
                        <button id='uploadBtn' onClick={async () => {
                            if (!lock) {
                                setLock(true)
                                setLoading(1)
                                let x = await uploadDataToFirestore()
                                setLoading(x ? 2 : 3)
                                setLock(false)
                                setTimeout(() => {
                                    props.closeBtnFunction()
                                    setLoading(0)
                                }, 2000)
                            }
                        }}>Upload</button>


                    </div>
                }>

            </Modal>
        </div>
    )
}

export default UploadToCloud