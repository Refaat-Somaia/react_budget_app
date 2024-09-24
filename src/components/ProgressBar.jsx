import "../styles/ProgressBar.css"
import { useEffect, useState } from "react"

function ProgressBar(props) {
    const [width, setWidth] = useState()
    const [color, setColor] = useState("#069d86")

    useEffect(() => {
        let prog = parseFloat(props.prog)
        if (prog < 50) {
            setColor("#069d86")
        }
        else if (prog >= 50 && prog < 80) {
            setColor("#FFA45B")
        }
        else if (prog >= 80) {
            setColor("#E84545")
        }
    }, [props.prog])
    return (
        <div className="outer-bar">
            <div className="inner-bar" style={{ width: props.prog, backgroundColor: color }}></div>
        </div>
    )
}

export default ProgressBar
