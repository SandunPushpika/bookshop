import React,{Component} from 'react';

export default class homecomponent extends Component{

    constructor(props){
        super(props);
        this.onButtonClicked=this.onButtonClicked.bind(this);
    }
    onButtonClicked(){
        window.location.href='./edit';
    }

    render(){
        return(
            <div className="Homepagediv">
                    <h1>Simple BookShop Managing App for<br/>The Test Of FUTURE CAREERS BRIDGE</h1>
                    <button onClick={this.onButtonClicked} >Go To See Stock</button>
            </div>
        );
    }
}