import { useRef, useState } from 'react'
import Modal from './Modal'

function UploadToCloud(props) {


    return (
        <div>
            <Modal closeBtnFunction={props.closeBtnFunction}
                display={props.display} animation={props.animation}
                child={
                    <div style={{ position: 'relative', textAlign: "center" }}>
                        <h2 style={{ textAlign: 'center', top: "1rem" }}>Upload data to cloud</h2>
                        <p className='p-linkToApp'
                        >Upload your budgets data to cloud to access them from the mobile app and from
                            different devices.</p>
                        <button id='uploadBtn'>Upload</button>


                    </div>
                }>

            </Modal>
        </div>
    )
}

export default UploadToCloud