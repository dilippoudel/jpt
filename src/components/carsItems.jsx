import React, { Component } from 'react';
import axios from 'axios';
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';
import config from '../config.json';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from './pagination';
import {paginate} from '../utils/paginate';
import SeacchBox from './searchBox';
import { Link } from 'react-router-dom';
axios.interceptors.response.use(null, error => {
  const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
  if(!expectedErrors) {
    console.log('An unexpected error', error)
    toast.error('Something went wrong while deleting the items.')
  }
  return Promise.reject(error);
});

class CarsItems extends Component {
  state = {carsList : [], pageSize : 10, currentPage: 1, searchQuery : ''
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
handlePageChange = (page) => {
  this.setState({currentPage: page})
  console.log(page)
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
    const count = this.state.carsList.length;
    const {currentPage, pageSize, carsList}= this.state;
    const cars = paginate(carsList, currentPage, pageSize)
    return (
    <main className = "container">
    <p>There are {count} cars in the database.</p>
    <SeacchBox value = {this.state.searchQuery} onChange = {this.handleSearch}/>
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
          
          {cars.map(car  => (
   <tr key = {car._links.self.href}>
   <td><Link to = {`/carsItems/${car._links.self.href}`}>{car.brand}</Link></td>
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
      <Pagination itemsCount = {count}
       pageSize = {pageSize}
       currentPage = {currentPage}
       onPageChange = {this.handlePageChange}
       />

</main>
    );
  }
}

export default CarsItems;