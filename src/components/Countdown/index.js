import React, { Component } from 'react';
import Countdown from 'react-countdown';
import api from '../../services/api';
import './styles.css';

class CountdownClock extends Component{
    constructor(props){
        super(props)
        this.state = {
            remainTime: 0
        }
    }

    componentDidMount(){
        this.getRemainTime();
    }

    renderer = ({ hours, minutes, seconds }) => {
        return (
            <span>
              {hours}:{minutes}:{seconds}
            </span>
        );
      };

    getRemainTime = async () =>{
        const { pollId } = this.props
        const response = await api.get(`/polls/${pollId}/time`)
        this.setState({ remainTime: response.data.remainTime })
    }

    render(){

        const { remainTime } = this.state
        return (
            <>
                <p>faltam</p>
                <Countdown date={Date.now() + remainTime} renderer={this.renderer}/>
                <p>para encerrar a votação</p>
            </>
        )
    }
}

export default CountdownClock