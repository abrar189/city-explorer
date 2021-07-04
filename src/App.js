import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      locationName:'',
      dataOfobject:{}


    }
  }
  showLocation = async (event)=>{
    event.preventDefault();
    await this.setState({
      locationName:event.target.location.value
    })

    let url =`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&city=${this.state.locationName}&format=json`
       let allData =await axios.get(url);
       console.log(allData)
  this.setState({
    dataOfobject: allData.data[0]
  })     
  }
  render() {
    return ( 
    <div>
<h2> City Explorer</h2>

<form onSubmit={this.showLocation}>
  <input type='text' placeholder='Name of City' name='location' ></input>
  <input type='submit' value='Explore!'/>
</form>
<p> City Data :</p>
<p> 1. City Name : {this.state.dataOfobject.display_name}</p>
<p> 2. City lat :{this.state.dataOfobject.lat} </p>
<p> 3. City lon :{this.state.dataOfobject.lon} </p>



</div>
    )
  }
}

export default App;