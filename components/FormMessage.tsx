import {TriangleAlertIcon} from "lucide-react"
import {CheckCircleIcon} from "lucide-react"

interface FormMessageProps {
  message?: string
  type: "ERROR" | "SUCCESS"
}

const FormMessage = ({message, type}: FormMessageProps) => {
  if(!message) return null
  return (
    <div className={`p-3 rounded-md flex items-center gap-x-2 text-sm 
    ${type === "ERROR" ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'}`}>
      {
        type === "ERROR" ?
        <TriangleAlertIcon className="h-4 w-4" />
        : 
        <CheckCircleIcon className="h-4 w-4" />
      }
      <p>{message } </p>
    </div>
  )
}

export default FormMessage
