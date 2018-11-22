import React, { Component } from 'react';
import axios from 'axios';
import "./App.css";

const endPoints = 'https://carstockrest.herokuapp.com/cars';
class App extends Component {
  state = {carsList : []
  };
  async componentDidMount(){
  const {data} =  await axios.get(endPoints);
  const carsList = data._embedded.cars;
  this.setState({carsList}); // object destructure
  }

  addCar = async () => {
  const newCar = {brand : 'nissan', model: '13AXY',  color : 'purple', fuel : 'petrol', year : '1993', price : '16000'}
  const {data : newcar} = await axios.post(endPoints, newCar);
  console.log(newcar)
  const carsList = [newcar, ...this.state.carsList]
  this.setState({carsList})
  }

  handleDelete =  async car  => {
    await axios.delete(car._links.self.href)
  const newList = this.state.carsList.filter(m =>  m._links.self.href !== car._links.self.href);
    this.setState({ carsList: newList});
   }

  render() {
    return (
      <div>
        <button onClick = {this.addCar} className = "btn btn-primary sm">New car</button>
      <table className="table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Color</th>
            <th>Fuel</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          
          {this.state.carsList.map(car  => (
   <tr key = {car._links.self.href}>
   <td>{car.brand}</td>
   <td>{car.color}</td>
   <td>{car.fuel}</td>
   <td>{car.model}</td>
   <td>{car.year}</td>
   <td>{car.price}</td>
   <td><button  onClick = {()=> this.handleDelete(car)} className = "btn btn-danger sm">Delete</button></td>
 </tr>
))}
        </tbody>
      </table>

</div>
    );
  }
}
const Main = () => {
  return(
  <div className = "container">
    <App/>
  </div>
  )
}
export default Main;