import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
class profits extends Component{

    constructor(props){
        super(props);
        this.onSearch=this.onSearch.bind(this);
        this.onDateChange=this.onDateChange.bind(this);
        this.state={
            date:'',
            tablevalues:[]
        };
    }
    onDateChange(e){
            this.setState({
                date:e.target.value
            });
    }
    onSearch(){
        axios.get("https://bookshopmanager.herokuapp.com/profitbydate",{params:{Date:this.state.date}}).then((res)=>{
            console.log("data", res.data);
                        this.setState({tablevalues:res.data});
        }
        ).catch((err)=>console.log(err));
    }
    componentDidMount(){
        axios.get("https://bookshopmanager.herokuapp.com/profits").then((respond) =>
         this.setState({tablevalues:respond.data})

        );
    }

    render(){
        return(
            <div>
                <h2 className="center">Profit Manager</h2>

                <div className="Search">
                    <input type="text" className="searchInput" value={this.state.date} onChange={this.onDateChange}/>
                    <button onClick={this.onSearch}>Search DATE</button>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>BookID</td>
                            <td>Qty</td>
                            <td>Amount</td>
                            <td>Profit</td>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tablevalues.map(item=>
                            <tr>
                                <td>{item.Date}</td>
                                <td>{item.ID}</td>
                                <td>{item.QTY}</td>
                                <td>{item.Amount}</td>
                                <td>{item.Profit}</td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>
        );
    }
}
export default profits;