import React from "react";
import styled from "styled-components"
import { Tabs, Tab } from "react-bootstrap"
import { Line } from 'react-lineto'
import * as Vis from "react-vis"
import "react-svg-map/lib/index.css"
/* 
	Props = 
		Data : Country Data
*/

const BoxWidth = 550
const BoxHeight = 400
const xOffset = 100
const yOffset = 200

const Box = styled.div`
	padding:40px;
	position:absolute;
	background-color:#fff;
	width:${BoxWidth}px;
	height:${BoxHeight}px;
	overflow:scroll;
	border:1px solid #ccc;
	box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
`
const Pointer = styled.div`
	position:absolute;
	left: ${props => props.pos.x - 100}px;
	top: ${props => props.pos.y + 800}px;
	background-color:#fff;
	width:200px;
	height:400px;
	border:red 1px solid;
`
const Header = styled.h1`

`

const SubHeader = styled.h2`
	padding:20px;
`

const Content = styled.div`
	padding-top:20px;
`
const Graph = styled.figure`
font-size:12px;
`
const GraphCaption = styled.figcaption`
	
	text-align:center;
`
class InfoBox extends React.Component {
	constructor(props) {
		super(props)
		this.calculatePosition = this.calculatePosition.bind(this)
	}

	//If position is offscreen, offset in other direction
	calculatePosition() {
		
		const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
		const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
		let adjustRight,adjustBottom = false
		if ((this.props.pos.x + BoxWidth + 40) > vw) {
			adjustRight = true
		}
		if ((this.props.pos.y - BoxHeight - yOffset - 40) > vh) {
			adjustBottom = true
		}
		const leftPos = adjustRight ? this.props.pos.x - BoxWidth - xOffset : this.props.pos.x + xOffset
		const bottomPos = adjustBottom ? this.props.pos.y - BoxHeight: this.props.pos.y - yOffset
		return {
			left: leftPos + "px",
			top : bottomPos + "px"
		}

	}
	
	exchangeRateGraph(data) {
		const graph = data.exchange_rates.annual_values.map((rate) => {
			return {
				x: rate.date.toString(),
				y: rate.value
			}
		})
		graph.sort((a, b) => {
			return a.x - b.x
		})
		return graph
	}
	
	gdpGrowthData(data) {
		const gdpGrowthGraph = data.real_growth_rate.annual_values.map((point) => {
			return {
				x: point.date,
				y: point.value
			}
		})
		gdpGrowthGraph.sort((a, b) => {
			return a.x - b.x
		})
		console.log(gdpGrowthGraph)
		return gdpGrowthGraph
	}
	
	unemploymentRateData(data) {
		const unemploymentDataGraph = data.unemployment_rate.annual_values.map((point) => {
			return {
				x: point.date,
				y: point.value
			}
		})
		unemploymentDataGraph.sort((a, b) => {
			return a.x - b.x
		})
		
		return unemploymentDataGraph
	}

	render() {		
		this.calculatePosition()
		return (
			<>	
				{/* <Pointer
					pos={this.props.pos}
				></Pointer> */}
				<Box
					pos={
						this.props.pos
					}
					className={"InfoBox"}
					style={this.calculatePosition()}
				>
					<Header>{this.props.data.name}</Header>
					<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
						<Tab eventKey="home" title="Introduction">
							<Content>
								{this.props.data?.introduction?.background}
							</Content>
						</Tab>
						<Tab eventKey="profile" title="Economy">
							<Content>
								<SubHeader>
									Overview
								</SubHeader>
								{this.props.data?.economy?.overview}
								<SubHeader>
									Exchange Rate
								</SubHeader>										
									<Graph>
										{this.props.data.economy.exchange_rates.annual_values && 
										<Vis.XYPlot
											
											width={430}
											height={300}
										>
											<Vis.XAxis
												tickFormat={tick => tick.toString()}
												title={"Year"}
												tickTotal={this.exchangeRateGraph(this.props.data.economy).length}
											/>
											<Vis.YAxis />
											<Vis.VerticalGridLines />
											<Vis.HorizontalGridLines />
											<Vis.AreaSeries
												className="area-series-example"
												curve="curveNatural"
												data={this.exchangeRateGraph(this.props.data.economy)}
											/>
										</Vis.XYPlot>
										}
										
										<GraphCaption>
											{this.props.data.economy.exchange_rates.note}
										</GraphCaption>
										
									</Graph>
								<SubHeader>
									GDP Growth
								</SubHeader>
								<Graph>
								<Vis.XYPlot
									width={430}
									height={300}
									>
										<Vis.VerticalGridLines />
										<Vis.HorizontalGridLines />
										<Vis.XAxis
											tickFormat={tick => tick.toString()}
											tickTotal={this.gdpGrowthData(this.props.data.economy.gdp).length}
										/>
										<Vis.YAxis />
										<Vis.LineSeries
											color={"red"}
											data={this.gdpGrowthData(this.props.data.economy.gdp)}
										/>
										</Vis.XYPlot>
									<GraphCaption>
										Real Growth Rate. Annual Rank: {this.props.data.economy.gdp.real_growth_rate.global_rank}
									</GraphCaption>
								</Graph>
								
								{this.props.data.economy.gdp.inflation_rate && 
									<>
										<SubHeader>
											Inflation
										</SubHeader>
										<Graph>
											<GraphCaption>
												Global Rank: {this.props.data.economy.gdp.inflation_rate.global_rank}
											</GraphCaption>
										</Graph>
									</>
								}
								
								
							</Content>
						</Tab>
						<Tab eventKey="contact" title="Geography">
							<Content>
								{this.props.data?.geography?.location}
							</Content>
						</Tab>
					</Tabs>
					
				</Box>
				
			</>
		)
	}
}

export default InfoBox