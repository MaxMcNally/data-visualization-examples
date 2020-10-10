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

const Map = styled(SVGMap)`
	svg {
		width:1200px;
	}
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

		this.clickCountry = this.clickCountry.bind(this)
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
	}
	
	//grab CIA Factobook Data from API
	async fetchData() {
		try {
			const res = await fetch(dataUrl)
			if (res.status >= 400) {
				throw new Error("Bad response from server");
			}

			const data = await res.json();
			return data
		}
		catch(e) {
			console.log("Caught Error")
			console.log(e)
		}
		
	}
	
	
	clickCountry(e) {
		if (e.target && e.target?.attributes?.name?.value && e.target?.attributes?.name?.value !== this.state.currentCountry) {
			return this.setState({
				currentCountry: e.target.attributes.name.value,
				countryData: this.findCountryData(e.target.attributes.name.value),
				holdCountry : !this.state.holdCountry,
				mousePos: { x: e.pageX, y: e.pageY }
			})
		}
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
				
					<Map
						map={this.state.worldMap}
						onLocationClick={this.clickCountry}
					/>
				</>
			}
			
		</>
	}
}

export default CIAWorldBook