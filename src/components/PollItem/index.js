import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

function PollItem({ poll }){
    function parseDateString (date){
        return new Date(date).toLocaleDateString().substring(0,10).replace(/-/g, "/") 
    }
    
    return(
        <article key={poll._id}>
            <section className="poll-thumbnail">
                <picture>
                    <img srcSet={poll.thumbnail} alt="Votação BBB" />
                </picture>
            </section>
            <strong className="poll-title">{poll.title}</strong>
            <p>Criado por: <span>{poll.author}</span></p>
            <p>Postado em: <span>{parseDateString(poll.createdAt)}</span></p>
            <section className="poll-vote-btn">
                <Link to={`/polls/${poll._id}`}>Votar</Link>
            </section>
        </article>
    )
}

export default PollItem