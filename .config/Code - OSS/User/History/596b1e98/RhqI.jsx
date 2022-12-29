import {useContext} from "react"
import AlertContext from "../../context/alert/AlertContext"

function Alert() {
    const {alert} = useContext(AlertContext)
  return alert !== null && (
    <p className="flex items-start mb-4 space-x-2">
        {alert.type==="error" && (
         <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
    <circle style="fill:#D75A4A;" cx="25" cy="25" r="25"/>
    <polyline style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" points="16,34 25,25 34,16 
        "/>
    <polyline style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" points="16,16 25,25 34,34 
        "/> </svg>
        )}
        <p className="flex-1 text-base font-semibold leading-7 text-white">
            <strong>{alert.msg}</strong>
        </p>
    </p>
  )
}

export default Alert