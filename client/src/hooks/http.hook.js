import {useState, useCallback} from "react";


export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const request = useCallback(async (url, method ='POST', body = null, headers = null, fileUpload = false) => {
        setLoading(true)
        try{
            if (body && !fileUpload) {
                body= JSON.stringify(body)
            }
            console.log('method', method, 'url', url, 'body',body , 'headers', headers)
            const response = await fetch(url, {method, body, headers})

            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                throw new Error(data.message || 'error')
            }

            setLoading(false)
            return {response: response.status, data}
        } catch (e) {
            console.log('ERROR')
            console.log(e.message)
            setLoading(false)
            setError(e.message)
            throw e
        }

    }, [])

    const clearError = () => setError(null)


    return {loading, error, clearError, request}
}