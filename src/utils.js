
export default {
    isRequired () {
        throw new Error('A required parameter is missing')
    },
    stopPropagation (e) {
        e.stopPropagation()
    }
}