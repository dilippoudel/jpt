import React, { Component } from 'react';
import axios from 'axios';
import "./App.css";

const endPoints = 'https://carstockrest.herokuapp.com/cars';
class App extends Component {
  state = {carsList : []
  };
  async componentDidMount(){
  const {data} =  await axios.get(endPoints);
  const cars = data._embedded.cars;
  this.setState({carsList: cars});
  }


  handleDelete =  index => {
    // await axios.delete(endPoints)
     console.log( index)
   //const newList = this.state.cars.filter((m,i) =>  i !== index);
    //this.setState({ cars: newList});
   }


   addCar = async () => {
    const obj = {brand: "a", color : 'Yellow', fuel : 'petrol', model : 'abc', price : '2300', year :'1993'};
     const {data: cars} = await axios.post(endPoints, obj)
    const car = [cars, ...this.state.cars]
    this.setState({ car})
    console.log(cars);
   }


    updateCar = () => {
      console.log('Updated')

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
            <th>Price</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          
          {this.state.carsList.map((car, index ) => (
   <tr key = {index}>
   <td>{car.brand}</td>
   <td>{car.color}</td>
   <td>{car.fuel}</td>
   <td>{car.model}</td>
   <td>{car.price}</td>
   <td>{car.year}</td>
   <td><button onClick = {this.handleDelete(index)} className = "btn btn-danger sm">Delete</button></td>
   <td><button onClick = {this.updateCar} className = "btn btn-secondary sm">update</button></td>
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