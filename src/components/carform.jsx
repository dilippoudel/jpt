import React from 'react';
const CarForm = ({match, history}) => {
    return (
        <div>
                <h1>Car Form {match.params.id}</h1>
            <button className="btn btn-primary" 
            onClick = {()=>history.push('/carsItems')  }>save</button>
        </div>
    )
}
export default CarForm;