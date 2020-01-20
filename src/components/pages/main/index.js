import React, { useState, useEffect } from 'react'
import api from '../../../services/api'

import PollItem from '../../PollItem'
import './styles.css'

function Main(){

    const [polls, setPolls] = useState([])

    useEffect(() => {
        async function loadPoll(){
            const response = await api.get('/polls')
            const now = new Date()

            let polls = response.data.filter((poll) => {
                const remainTime = new Date(poll.closeAt).getTime() - now.getTime();
                return remainTime > 0
            })

            setPolls(polls)
        }
        loadPoll()
    },[])

    if(polls.length <= 0){
        return <h1 className="empty-poll-list-message">Não há votações cadastradas :(</h1>
    }

    return(
        <>
        {polls.length > 0 &&
            <div className="poll-list">
                {polls.map(poll => (
                        <PollItem poll={poll} key={poll._id}/>
                )) }
            </div>
        }
        </>
    )
}

export default Main