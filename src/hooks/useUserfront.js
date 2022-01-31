import { useEffect, useState } from 'react'
import Userfront from '@userfront/react'

export const useUserfront = (userfrontTenantId) => {
    const [LogoutButton, setLogoutButton] = useState(Userfront.build({
        toolId: "rodrlr"
    }))
    const [SignupForm, setSignupForm] = useState(Userfront.build({
        toolId: "maomdl"
    }))
    const [LoginForm, setLoginForm] = useState(Userfront.build({
        toolId: "ddbloa"
    }))
    const [token, setToken] = useState(null)

    useEffect(() => {
        console.log(token)
        if (userfrontTenantId) {
            Userfront.init(userfrontTenantId)
            setLogoutButton(Userfront.build({
                toolId: "ddbloa"
            }))
            
            setSignupForm(Userfront.build({
                toolId: "maomdl"
            }))
            
            setLoginForm(Userfront.build({
                toolId: "rodrlr"
            }))
            setToken(Userfront.tokens.accessToken)
        }
    }, [userfrontTenantId, token])

    return { LogoutButton, SignupForm, LoginForm, token }
}