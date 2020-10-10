import React from "react"
import fetch from "cross-fetch"
import WorldMap from "./data/WorldMap"
import { SVGMap } from "react-svg-map"
import InfoBox from "../global/InfoBox"
import Loader from 'react-loader-spinner'
import styled from "styled-components"

/* 
	Display Data from CIA Factbook on Map 
*/

const dataUrl = "/api/data/factbookData"

const CustomLoader = styled(Loader)`
	display:block;
	margin:0 auto;
`

class CIAWorldBook extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			loading : true,
			currentCountry : "",
			countryData : null,
			data : undefined,
			mousePos : {
				x: undefined,
				y: undefined
			},
			worldMap : {
				...WorldMap,
				label: "Custom map label",
				locations: WorldMap.locations.map(location => {
					return location
				})
			},
			holdCountry : false
		}	

		this.updateMousePos = this.updateMousePos.bind(this)
		this.mouseOverCountry = this.mouseOverCountry.bind(this)
		this.holdCountry = this.holdCountry.bind(this)
	}
	
	async componentDidMount() {
		if(this.state.data) return
		const data = await this.fetchData()
		console.log("Data")
		console.log(data)
		this.setState({
			data: data,
			loading: false,
			currentCountry : data.world
		})
		console.log(this.state)
		document.onmousemove = this.updateMousePos
	}
	
	//grab CIA Factobook Data from API
	async fetchData() {
		try {
			const res = await fetch(dataUrl)
			if (res.status >= 400) {
				throw new Error("Bad response from server");
			}
			console.log("Data Response")
			console.log(res.body)
			const data = await res.json();
			return data
		}
		catch(e) {
			console.log("Caught Error")
			console.log(e)
		}
		
	}
	
	updateMousePos(e) {
		if (this.state.holdCountry) return 
		this.setState({
			mousePos:
				{ x: e.pageX, y: e.pageY }
		})
	}
	
	mouseOverCountry(e) {
		if (this.state.holdCountry) return 
		console.log("Mouse Pos")
		console.log({x:e.pageX,y:e.pageY})
		if (e.target && e.target?.attributes?.name?.value && e.target?.attributes?.name?.value !== this.state.currentCountry) {
			return this.setState({
				currentCountry: e.target.attributes.name.value,
				countryData: this.findCountryData(e.target.attributes.name.value),
			})
		}
		this.updateMousePos(e)
	}
	
	holdCountry(e) {
		console.log("Holding Country", e.target?.attributes?.name?.value)
		this.setState({holdCountry : !this.state.holdCountry})
	}

	//match country name to CIA Factbook data
	/* 
		@param name : String
	*/
	findCountryData(name) {
		return this.state.data?.countries[name.toLowerCase().replace(" ","_")]?.data
	}
	
	render() {
		return <>
			{this.state.loading && 
				<Loader
					type="Grid"
					color="#00BFFF"
					height={100}
					width={100}
					timeout={3000} //3 secs
		
				/>
			}
			{!this.state.loading && 
				<>
				{this.state.countryData && 
				<InfoBox
					pos={
						{
							x : this.state.mousePos.x,
							y : this.state.mousePos.y
						}
					}
					data={this.state.countryData}
				
				/>
				}
				
					<SVGMap
						map={this.state.worldMap}
						onLocationMouseOver={this.mouseOverCountry}
						onLocationClick={this.holdCountry}
					/>
				</>
			}
			
		</>
	}
}

export default CIAWorldBook