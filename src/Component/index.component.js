import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import axios from 'axios';

export default class Index extends Component{
    
    constructor(props){
        super(props);
        this.onChangeBookID=this.onChangeBookID.bind(this);
        this.onChangeQty=this.onChangeQty.bind(this);
        this.onAddtoCart=this.onAddtoCart.bind(this);
        this.findfullamount=this.findfullamount.bind(this);
        this.onBill=this.onBill.bind(this);

        this.state={
            id:'',
            qty:'',
            fullamount:'',
            intamounts:[],
            tablevalues:[],
            datavalues:[]
        };
    }

    onBill(){
        axios.post("https://bookshopmanager.herokuapp.com/Bill",this.state.tablevalues).then((res)=>
                console.log(res.data)
        ).catch((err)=>console.log(err));

        this.setState({
            id:'',
            qty:'',
            fullamount:'',
            intamounts:[],
            tablevalues:[],
            datavalues:[]
        });
    }

    onChangeBookID(e){
        this.setState({
            id:e.target.value
        });
    }
    onChangeQty(e){
        this.setState({
            qty:e.target.value
        });
    }
    onAddtoCart(){
        var variable=[];
        var variable2=this.state.tablevalues;
            axios.get("https://bookshopmanager.herokuapp.com/addtocart",{params: {BookID: this.state.id, qty: this.state.qty}})
            .then((res)=>{
                //console.log(res.data);
                variable=res.data;
                variable.map(item=>
                    variable2.push({
                        BookID: item.BookID,
                        BookName:item.BookName,
                        SellingPrice: item.SellingPrice,
                        qty:item.qty,
                        date: item.date,
                        amount:item.amount
                    })
                    );

                    variable.map(it=>
                            this.state.intamounts.push(it.amount)
                        );

                    this.setState({tablevalues:variable2, fullamount:variable2[0].amount});
                    console.log(this.state.intamounts);
                console.log(this.state.tablevalues);
                this.findfullamount();
            }).catch((err)=>{console.log(err)});
            
        //console.log(this.state.tablevalues);
    }

    findfullamount(){
            let total=0;
            for(let i=0;i<this.state.intamounts.length;i++){
                total += this.state.intamounts[i];
            }
            this.setState({fullamount:total});
    }

    render(){
        return(
            <div className="clearfix maindiv">
                <h2>Total: {this.state.fullamount}</h2>
                <div className="addToCart clearfix">
                        <input type="text" className="textBoxx bookid" placeholder="Book ID" value={this.state.id} onChange={this.onChangeBookID}/>
                        <input type="text" className="textBoxx amount" placeholder="Qty" value={this.state.qty} onChange={this.onChangeQty}/>
                        <button type="submit" className="addbutton" onClick={this.onAddtoCart} >+ Add to cart</button>
               </div>
                <table className="table table-striped mb-0 table-resposive table-hover">
                    <thead>
                        <tr>
                        <td>Book ID</td>
                        <td>BookName</td>
                        <td>Price</td>
                        <td>Qty</td>
                        <td>Date</td>
                        <td>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.tablevalues.map(
                                book =>
                                
                                <tr key={book.BookID}>
                                    <td>{book.BookID}</td>
                                    <td>{book.BookName}</td>
                                    <td>{book.SellingPrice}</td>
                                    <td>{book.qty}</td>
                                    <td>{book.date}</td>
                                    <td>{book.amount}</td>
                                    
                                </tr>
                            )}
                    </tbody>

                </table>
                <button type="submit" className="addbutton" onClick={this.onBill} >BILL</button>
            </div>
        );
    }
}