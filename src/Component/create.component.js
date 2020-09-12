import React,{Component} from 'react';
import './styles.css'
import axios from 'axios';
export default class Create extends Component{

    constructor(props){
        super(props);

        

        this.onChangeId=this.onChangeId.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeAuthor=this.onChangeAuthor.bind(this);
        this.onChangeSprice=this.onChangeSprice.bind(this);
        this.onChangeCostprice=this.onChangeCostprice.bind(this);
        this.onChangeNumber=this.onChangeNumber.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            Id:'',
            Name:'',
            Author:'',
            Sprice:'',
            Costprice:'',
            Number:''
        }

       
    }

    onChangeCostprice(e){
        this.setState({
            Costprice:e.target.value
        });
    }
    onChangeNumber(e){
        this.setState({
            Number:e.target.value
        });
    }

    onChangeSprice(e){
        this.setState({
            Sprice: e.target.value
        });
    }

    onChangeId(e){
        this.setState({
            Id: e.target.value
        });
    }

    onChangeName(e){
        this.setState({
            Name:e.target.value
        });
    }
    onChangeAuthor(e){
        this.setState({
            Author: e.target.value
        });
    }

    onSubmit(e){
        try{
            e.preventDefault();
         const obj={
            BookId: this.state.Id,
            BookName: this.state.Name,
            AuthorName: this.state.Author,
            Sellingprice: this.state.Sprice,
            CostPrice: this.state.Costprice,
            Count: this.state.Number
        };
        axios.post("https://bookshopmanager.herokuapp.com/addbook",null,{
            params:{
                Id: this.state.Id,
                BookName: this.state.Name,
                Auther: this.state.Author,
                sprice: this.state.Sprice,
                cprice: this.state.Costprice,
                count: this.state.Number  }}).then(res =>{
            console.log(res);
            console.log(res.data);
        }).catch((err)=> console.log(err));
        
        this.setState({
            Id:'',
            Name:'',
            Author:'',
            Sprice:'',
            Costprice:'',
            Number:''
        });
        window.location.href='/edit';
        }catch(err){
            console.log(err);
        }
    }



        render(){
            return(
                <div className="formalayout">
                    <h2>ADD A NEW BOOK</h2>
                    <form className="addform" onSubmit={this.onSubmit}>
                        ID:<br/>
                        <input type="text" className="idbox" value={this.state.Id} onChange={this.onChangeId} /><br/>
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
                        <input type="submit" className="button" value="Add Info"/>
                    </form>
                </div>
            )
        }
}