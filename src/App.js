import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Test",
      act: 0,
      index: '',
      data: [],
      search: '',
    }

    this.formSearch = this.formSearch.bind(this);

  }

  componentDidMount() {
    this.refs.name.focus();
  }

  formSubmit = (e) => {
    e.preventDefault();
    let data = this.state.data;
    let name = this.refs.name.value;
    let address = this.refs.address.value;

    if (this.state.act === 0) {  //new
      let element = {
        name, address
      }
      data.push(element);       
    } else {                    // updates
      let index = this.state.index;
      data[index].name = name;
      data[index].address = address;
    }

    
    this.setState({ data, act: 0, });
    this.refs.myform.reset();
    this.refs.name.focus();
  }

  formRemove = (i) => {
    let data = this.state.data;
    data.splice(i,1);
    this.setState({ data });
  }

  formEdit = (i) => {
    let element = this.state.data[i];
    this.refs.name.value = element.name;
    this.refs.address.value = element.address;

    this.setState({
      act: 1,
      index: i,
    });

    this.refs.name.focus();
  }

  formSearch(e) {
    this.setState({search: e.target.value.substr(0,20)});
  }

  render() {
    // let  = this.state.data;
    let filteredData = this.state.data.filter(element => {
      return element.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });

    return (
      <div className="App">
      <h2>{this.state.title}</h2>
      <form ref="myform" className= "myForm">
      <input type="text" ref="name" placeholder="your name" className="formField" />
      <input type="text" ref="address" placeholder="Address" className="formField" />
      <button onClick={(e) => this.formSubmit(e)}> Submit </button>
      </form>
     
       <pre>
        <h3> Search Data </h3> 
            <input placeholder=" Search .." value={this.state.search} onChange={this.formSearch} />
            <hr />
         {filteredData.map((element, i) => 
         <li key={i} className="myListItem">
            {element.name}, {element.address}
            <button onClick={() => this.formRemove(i)}> Remove </button>
            <button onClick={() => this.formEdit(i)}> Edit </button>
         </li>
        )}
      </pre>
      </div>
     
    );
  }
}

export default App;
