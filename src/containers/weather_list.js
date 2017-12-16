import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import GoogleMap from "../components/google_map";
import Chart from "../components/chart";
class WeatherList extends Component{
	renderWeather(data){

		const temps = _.map(data.list.map(weather => weather.main.temp), (temp) => temp* 9/5 - 459.67);
		const pressures = data.list.map(weather => weather.main.pressure);
		const humids = data.list.map(weather => weather.main.humidity);
		const lon = data.city.coord.lon;
		const lat = data.city.coord.lat;

		return(
			<tr key = {data.city.name}>
			<td><GoogleMap lon = {lon} lat = {lat}/></td>
			<td><Chart data = {temps} color = "red" units = "F" /></td>
			<td><Chart data = {pressures} color = "black" units = "hPA" /></td>
			<td><Chart data = {humids} color = "orange" units="%"/></td>
			</tr>
		)
	}

	render(){
		return(
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature (F)</th>
						<th>Pressure (hPa) </th>
						<th>Humidity (%) </th>

					</tr>
				</thead>
				<tbody>
					{this.props.weather.map(this.renderWeather)}
				</tbody>
			</table>
			);
	}
}


function mapStateToProps(state){
	return {weather: state.weather};
}
export default connect(mapStateToProps)(WeatherList);