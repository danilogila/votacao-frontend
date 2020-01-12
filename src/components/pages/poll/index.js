import React, { Component } from 'react'
import { ReCaptcha } from 'react-recaptcha-google'
import PollTitle from '../../Message/PollTittle'
import api from '../../../services/api'
import Modal from '../../Modal/AnimatedModal'
import DashedLine from '../Effects/DashedLine'
import './styles.css'

export default class Poll extends Component{
    constructor(props){
        super(props)
        this.state = {
            poll: {},
            chosenId: "",
            borderColor: "none",
            pollId: "",
            canVote: false,
            captchaToken: "",
            openModal: false,
            selectedOption: 0
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleVote = this.handleVote.bind(this)
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    onLoadRecaptcha() {
        console.log("Loading Recaptcha")
    }

    reloadRecaptcha(){
        window.grecaptcha.reset()
    }

    verifyCallback(recaptchaToken) {
        this.setState({ canVote: true, captchaToken: recaptchaToken})
    }

    async componentDidMount(){
        const { pollId } = this.props.match.params
        const response = await api.get(`/polls/${pollId}`)

        this.setState({ poll: response.data, pollId: pollId })
    }

    async handleVote(){
        const { pollId, chosenId } = this.state

        if(!chosenId){
            return
        }
        const response = await api.post(`/polls/${pollId}/vote/${chosenId}`, {
            captcha: this.state.captchaToken
        })

        const { success } = response.data

        if(success){
            this.setState({ openModal: success })
        }
    }

    handleClick(event, index){
        this.setState({ 
            chosenId: event.target.id, 
            borderColor: "#ff9114", 
            selectedOption: index+1})
    }

    renderPoll(closeAt){
        const now = new Date()
        const remainTime = new Date(closeAt).getTime() - now.getTime();

        return remainTime > 0
    }

    handleUpdate = (value) => {
        this.setState({
            openModal: value
        })
      }

    render(){
        const { poll, chosenId, canVote, openModal, selectedOption} = this.state

        return (
                <div className="poll-info">
                    <PollTitle />
                    <DashedLine />
                    <section className="poll-options-content">
                        {poll && poll.choices && poll.choices.map((option, index) => (
                            <article onClick={(e) => this.handleClick(e, index)} className="option-content" key={option._id}>
                                <p className="option-name">{option.name}</p>
                                <picture>
                                    <img className="option-avatar" alt={option.name} src={option.avatar} 
                                        id={option._id} style={{ border: `6px solid ${chosenId === option._id ? this.state.borderColor: '#f1f1f1'}`}}>
                                    </img>
                                </picture>
                                    <p className="vote-phone-option">Para eliminar o 
                                        <span className="phone-detail"> Participante</span> 
                                        <span className="phone-detail"> {index+1}</span> pelo telefone disque 
                                        <span className="phone-detail"> 0800-123-00{index+1} </span> 
                                        ou mande um SMS <span className="phone-detail">800{index+1}</span>
                                    </p>
                            </article>
                        ))}
                    </section>

                    <section className="vote-btn-section">
                    <ReCaptcha
                        ref={(el) => {this.captcha = el;}}
                        size="normal"
                        render="explicit"
                        sitekey="6LefSckUAAAAAOD2rPQRQrCQw1szLsr98uSmrAj1"
                        onloadCallback={this.onLoadRecaptcha}
                        verifyCallback={this.verifyCallback}
                    />
                        <button 
                            disabled={!canVote}
                            className="vote-btn-action" 
                            onClick={this.handleVote}>
                                Envie seu voto agora
                        </button>
                    </section>
                    <Modal 
                        openModal={openModal} 
                        updateModal={this.handleUpdate}
                        pollData={poll}
                        optionIndex={selectedOption}
                        reloadRecaptcha={this.reloadRecaptcha}
                    />
                </div>
        )}
}