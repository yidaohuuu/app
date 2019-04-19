import {useState}  from 'react'

function useId () {
    const [id, setId] = useState(0)
    return {
        id,
        generate () {
            const next = id + 1
            setId(next)
            return next
        },
        restore (lastId) {
            setId(lastId)
        }
    }
}

export default useId

