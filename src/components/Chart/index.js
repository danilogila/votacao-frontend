import React, { Component } from 'react'
import { ResponsivePie } from '@nivo/pie'
import api from '../../services/api'
import './styles.css'

export default class Chart extends Component {
    constructor(props){
        super(props)
        this.state = {
            votes: []
        }
    }

    async componentDidMount(){
        const { pollId } = this.props
        const response = await api.get(`/polls/${pollId}/total`) 
        const { votes } = response.data
        this.setState({ votes })
    }

    getTotalVotesPerCandidate(id){
        const { votes } = this.state
        const totalCandidate = votes.filter((votes) => {
            return votes.optionId === id
        })

        return totalCandidate.length
    }

    calculatePercentageVoteData(){
        const firstOptionId = this.props.pollOptionsData[0]._id
        const secondOptionId = this.props.pollOptionsData[1]._id

        const total = this.state.votes.length

        const totalFirstOption = this.getTotalVotesPerCandidate(firstOptionId)
        const totalSecondOption = this.getTotalVotesPerCandidate(secondOptionId)


        const percentageFirstOption = Math.round((100 * totalFirstOption)/total).toFixed(2)
        const percentageSecondOption = Math.round((100 * totalSecondOption)/total).toFixed(2)
        
        return [percentageFirstOption, percentageSecondOption]
    }

    mountFinalData(){
        let data = this.calculatePercentageVoteData()
        return [
            {
              "id": "1",
              "value": parseInt(data[0]),
              "color": "black",
              "label": "Participante 1"
            },
            {
              "id": "2",
              "value": parseInt(data[1]),
              "color": "hsl(215, 70%, 50%)",
              "label": "Participante 2"
            }
          ]
    }

    render(){
        return (
            <div className={"pie-chart"} >
                <ResponsivePie
                    data={this.mountFinalData()}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    startAngle={-123}
                    endAngle={122}
                    innerRadius={0.65}
                    colorBy="index"
                    borderWidth={5}
                    borderColor="#ffffff"
                    enableRadialLabels={false}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={6}
                    radialLabelsTextColor="#ffffff"
                    radialLabelsLinkOffset={0}
                    radialLabelsLinkDiagonalLength={16}
                    radialLabelsLinkHorizontalLength={24}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor={{ from: 'color' }}
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#ffffff"
                    sliceLabel={function(e){return `${e.value}%`}}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    isInteractive={true}

                />
            </div>
        )
    }
}