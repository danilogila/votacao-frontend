import React, { Component } from 'react'
import api from '../../../services/api'
import { Link } from 'react-router-dom'

import './styles.css'

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            polls: []
        }
    }

    componentDidMount(){
        this.loadPolls();
    }

    parseDateString = (date) => {
        return new Date(date).toLocaleDateString().substring(0,10).replace(/-/g, "/") 
    }

    loadPolls = async () =>{
        const response = await api.get('/polls')
        const now = new Date()

        let polls = response.data.filter((poll) => {
            const remainTime = new Date(poll.closeAt).getTime() - now.getTime();
            return remainTime > 0
        })

        this.setState({ polls })
    }

    render(){
        if(this.state.polls.length <= 0){
            return <h1 className="empty-poll-list-message">Não há votações cadastradas :(</h1>
        }

        return (
            <div className="poll-list">
                {this.state.polls.length > 0 && this.state.polls.map(poll => (
                    <article key={poll._id}>
                        <section className="poll-thumbnail">
                            <picture>
                                <img srcSet={poll.thumbnail} alt="Votação BBB" />
                            </picture>
                        </section>
                        <strong className="poll-title">{poll.title}</strong>
                        <p>Criado por: <span>{poll.author}</span></p>
                        <p>Postado em: <span>{this.parseDateString(poll.createdAt)}</span></p>
                        <section className="poll-vote-btn">
                            <Link to={`/polls/${poll._id}`}>Votar</Link>
                        </section>
                    </article>
                )) }
            </div>
        )
    }
}