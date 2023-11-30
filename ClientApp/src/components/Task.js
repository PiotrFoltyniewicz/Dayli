import { useAuth } from '../contexts/AuthContext'
function Task() {

    const {loginToken } = useAuth()
    async function getTask() {
        const response = await fetch('/api/habitList', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ loginToken })
        });
        return response

    }
    const response2 = getTask()
    console.log(response2)
    return (<div>
        essa
    </div>)
}
export default Task