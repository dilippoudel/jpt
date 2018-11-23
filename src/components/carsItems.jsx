import React, { Component } from 'react';
import axios from 'axios';
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';


import config from '../config.json';
import 'react-toastify/dist/ReactToastify.css';
axios.interceptors.response.use(null, error => {
  const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
  if(!expectedErrors) {
    console.log('An unexpected error', error)
    toast.error('Something went wrong while deleting the items.')
  }
  return Promise.reject(error);
});

class CarsItems extends Component {
  state = {carsList : []
  };
  async componentDidMount(){
  const {data} =  await axios.get(config.apiEndPoint);
  const carsList = data._embedded.cars;
  this.setState({carsList}); // object destructure
  }

  addCar = async () => {
  const newCar = {brand : 'nissan', model: '13AXY',  color : 'purple', fuel : 'petrol', year : '1993', price : '16000'}
  const {data : newcar} = await axios.post(config.apiEndPoint, newCar);
  const carsList = [newcar, ...this.state.carsList]
  this.setState({carsList})
  toast.success("Car added");
  }

  handleDelete =  async car  => {
  const originalCarsList = this.state.carsList;
  const newList = this.state.carsList.filter(m =>  m._links.self.href !== car._links.self.href);
  this.setState({ carsList: newList});
  toast.info("Car deleted");

    try {
      await axios.delete(car._links.self.href)      
    }
    catch(ex) {
      if(ex.response && ex.response.status === 404){
        toast("this post has deleted already.")
      }
        this.setState({carsList: originalCarsList});
    }
    
   }

  render() {
    return (
    <main className = "container">
      <ToastContainer/>
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

</main>
    );
  }
}

export default CarsItems;