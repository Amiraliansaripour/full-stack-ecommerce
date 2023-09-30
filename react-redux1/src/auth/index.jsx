
export const authenticate = (data) => {
    if (typeof window !== undefined) {
        // set toke 
        localStorage.setItem("jwt", JSON.stringify(data.token))
        localStorage.setItem("user", JSON.stringify(data.user))

    } else {
        localStorage.setItem("jwt", JSON.stringify([]))
    }
}


export const isAuthenticated = () => {
    if (typeof window == undefined) {
        localStorage.removeItem("jwt")
        localStorage.removeItem("user")
    }

    if (localStorage.getItem("user")) {
        return true
    } else {
        return false
    }
}


export const logout = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("user")
}
