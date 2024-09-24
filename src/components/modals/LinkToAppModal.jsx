import { useRef, useState } from 'react'
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import Modal from './Modal'

function LinkToAppModal(props) {


    return (
        <div>
            <Modal closeBtnFunction={props.closeBtnFunction}
                display={props.display} animation={props.animation}
                child={
                    <><h2 style={{ textAlign: 'center', top: "1rem" }}>Link to app</h2>
                        <p className='p-linkToApp'
                        >Open the app on your phone and scan this QR code to link your data.</p>

                        <div style={{ height: "auto", margin: "2.5rem auto", marginBottom: "1.5rem", width: "35%" }}>
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={"vafdsalue"}
                                viewBox={`0 0 256 256`}
                            />

                        </div>
                        <p style={{ marginBottom: "2rem" }} className='p-linkToApp'
                        >(Note: Only last version uploaded to cloud will be linked)</p>
                    </>
                }>

            </Modal>
        </div>
    )
}

export default LinkToAppModal
