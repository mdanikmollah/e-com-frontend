import { useParams } from "react-router-dom"
import { useResendMailMutation } from "../Redux/apiSlice"

const Verify = () => {
    const { email } = useParams()
    const [resendMail] = useResendMailMutation()
    const handleResendMail = async () => {
        await resendMail({ email })
    }
    return (
        <div className="container">
            <div>
                <h1>check your mail {email}</h1>
                <button onClick={handleResendMail}>send mail</button>
            </div>
        </div >
    )
}
export default Verify