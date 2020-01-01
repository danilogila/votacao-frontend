import React, { Component } from 'react'
import api from '../../../services/api'
import { Link } from 'react-router-dom'

import './styles.css'

export default class Main extends Component{

    state = {
        polls: []
    }

    componentDidMount(){
        this.loadPolls();
    }

    loadPolls = async () =>{
        const response = await api.get('/polls')
        this.setState({ polls: response.data })
    }

    render(){
        return (
            <div className="poll-list">
                {this.state.polls.map(poll => (
                    <article key={poll._id}>
                        <section className="poll-thumbnail">
                            <picture>
                                <img srcSet={poll.thumbnail} alt="Votação BBB" />
                            </picture>
                        </section>
                        <strong className="poll-title">{poll.title}</strong>
                        <p>Criado por: <span>{poll.author}</span></p>
                        <p>Postado em: <span>{poll.createdAt}</span></p>
                        <section className="poll-vote-btn">
                            <Link to={`/polls/${poll._id}`}>Votar</Link>
                        </section>
                    </article>
                ))}
            </div>
        )
    }
}