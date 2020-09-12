import React,{Component} from 'react';
import service from '../Service/service';
import axios from 'axios';
import './styles.css';
import {BrowserRouter as Router,Switch,Route,Link, useRouteMatch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import updatecomponent from './update.component';

export default class Edit extends Component{
    
    
    constructor(props){
        super(props);
        this.onSubmit=this.onSubmit.bind(this);
        this.OnButtonClick=this.onButtonClick.bind(this);
        this.onNameboxChange=this.onNameboxChange.bind(this);
        this.onChangeDelete=this.onChangeDelete.bind(this);
        this.onDelete=this.onDelete.bind(this);
        this.onLoadTable=this.onLoadTable.bind(this);
        this.onSetSidebarOpen=this.onSetSidebarOpen.bind(this);
        this.onChangeId=this.onChangeId.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeAuthor=this.onChangeAuthor.bind(this);
        this.onChangeSprice=this.onChangeSprice.bind(this);
        this.onChangeCostprice=this.onChangeCostprice.bind(this);
        this.onChangeNumber=this.onChangeNumber.bind(this);
        this.onUpdateinfo=this.onUpdateinfo.bind(this);
        this.state={
            namebox:'',
            deleteid:'',
            sidebarOpen:false,
            Id:'',
            Name:'',
            Author:'',
            Sprice:'',
            Costprice:'',
            Number:'',
            books:[],
            values:[]
        };
    }

    onChangeId(e){
        this.setState({Id:e.target.value});
        if(e!=null){
            axios.get("https://bookshopmanager.herokuapp.com/findupdatingbook",{params: {BookID:e.target.value}}).then((res) =>{
                this.setState({
                    books: res.data
                });
                this.state.books.map(item=>
                    {
                        this.setState({
                            Name: item.BookName,
                            Author: item.AutherName,
                            Sprice:item.SellingPrice,
                            Costprice:item.CostPrice,
                            Number:item.Count
                        })
                    }
                );
                console.log(this.state.books);
            });
        }
    }
    onChangeName(e){
        this.setState({Name:e.target.value});
    }
    onChangeAuthor(e){
        this.setState({Author:e.target.value});
    }
    onChangeSprice(e){
        this.setState({Sprice:e.target.value});
    }
    onChangeCostprice(e){
        this.setState({Costprice:e.target.value});
    }
    onChangeNumber(e){
        this.setState({Number:e.target.value});
    }

    onButtonClick(){
        window.location.href='/create';
        console.log("hello button worked");
    }
    onLoadTable(){
        axios.get("https://bookshopmanager.herokuapp.com/allbooks").then((response) => {
            console.log(response);
            this.setState({books: response.data});
            console.log(this.state.books);
        }).catch(function(error){
                console.log("there is an error "+error.message);
                throw error;
        });
    }
    onUpdateinfo(e){
        e.preventDefault();

        var valuess=[{
            
                BookID:this.state.Id,
                BookName:this.state.Name,
                AutherName:this.state.Author,
                CostPrice:this.state.Costprice,
                SellingPrice:this.state.Sprice,
                Count:this.state.Number
            
        }];
        
        axios.post("https://bookshopmanager.herokuapp.com/updatestockinfo",valuess).then((res)=>{
            console.log(res);
            window.location.reload();
        });
      
    }
    onNameboxChange(e){
        this.setState({
            namebox:e.target.value
        });
    }

    onDelete(){
        if(window.confirm("Do you want to delete these?")){
            axios.get(`https://bookshopmanager.herokuapp.com/deletebook/${this.state.deleteid}`).then((res)=>{
                console.log(res);
                this.setState({
                    books:res.data
                })
            }).catch((err)=>{console.log(err)});
            this.onLoadTable();
            this.setState({
                deleteid:''
            });
            console.log("onChane pressed");
            console.log(this.state.deleteid);
        }else{
            console.log("cancel pressed");
        }
        
    }
    onChangeDelete(e){
        this.setState({
            deleteid: e.target.value
        });
    }
    onSetSidebarOpen(open) {
        window.location.href='#updateinfo';
      }

    onSubmit(){
            axios.get("https://bookshopmanager.herokuapp.com/findbook",{params: {BookName:this.state.namebox}}).then((res) =>{
                this.setState({
                    books: res.data
                });
                console.log(this.state.books);
            });

            console.log("Submit pressed"); 
            console.log(this.state.namebox);
    }

    componentDidMount(){
        axios.get("https://bookshopmanager.herokuapp.com/allbooks").then((response) => {
            console.log(response);
            this.setState({books: response.data});
            console.log(this.state.books);
        }).catch(function(error){
                console.log("there is an error "+error.message);
                throw error;
        });
    }

   
   
    
    render(){
        return(
            
            <div>
               
               <div className="clearfix">
                    <h3>Stock Manager</h3>
                    <div className="searchform">
                        <input type="text" className="textBoxx" placeholder="Book Name" value={this.state.namebox} onChange={this.onNameboxChange}/>
                        <button type="submit" className="addbutton" onClick={this.onSubmit}>Search</button>
                        
                    </div>
                    <button type="submit" className="addbutton update" onClick={this.onSetSidebarOpen}>Update</button>
                    <button className="addbutton" onClick={this.onButtonClick}>+ Add Book</button>
               </div>
               <div className="tableclass overflow-auto">
               <table className="table table-striped mb-0 table-resposive table-hover">
                    <thead>
                        <tr>
                            <td>BookId</td>
                            <td>BookName</td>
                            <td>AutherName</td>
                            <td>Cost Price</td>
                            <td>Selling Price</td>
                            <td>Count</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.books.map(
                                book =>
                                
                                <tr key={book.BookID}>
                                    <td>{book.BookID}</td>
                                    <td>{book.BookName}</td>
                                    <td>{book.AutherName}</td>
                                    <td>{book.CostPrice}</td>
                                    <td>{book.SellingPrice}</td>
                                    <td>{book.Count}</td>
                                    
                                </tr>
                            )
                        }
                    </tbody>

               </table>
               </div>
               <div className="deleteform">
                        <input type="text" placeholder="Book ID" className="textBoxx" value={this.state.deleteid} onChange={this.onChangeDelete}/>
                        <button type="submit" className="addbutton" onClick={this.onDelete}>Delete</button>
               </div>
                <div id="updateinfo" className="updatepanel">
                        <h1>EDIT INFO</h1>
                        <form className="addform" onSubmit={this.onUpdateinfo}>
                        ID:<br/>
                        <input type="text" className="idbox"  value={this.state.Id} onChange={this.onChangeId} /><br/>
                        Book Name:<br/>
                        <input type="text" className="namebox" value={this.state.Name} onChange={this.onChangeName} /><br/>
                        Author:<br/>
                        <input type="text" className="addressbox" value={this.state.Author} onChange={this.onChangeAuthor}/><br/>
                        Selling Price<br/>
                        <input type="text" className="sellingprice" value={this.state.Sprice} onChange={this.onChangeSprice}/><br/>

                        Cost Price<br/>
                        <input type="text" className="costprice" value={this.state.Costprice} onChange={this.onChangeCostprice}/><br/>

                        Count<br/>
                        <input type="text" className="numberbox" value={this.state.Number} onChange={this.onChangeNumber}/><br/>
                        <br/>
                        <input type="submit" className="button update" value="Update Info"/>
                        <button className="button update" onClick={this.onUpdateinfo}/>
                    </form>
                    
      
                </div>
            </div>
        );
    }
}