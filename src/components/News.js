import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
export class News extends Component {
    
    constructor(props){
        super();
        this.state={
            a: [],
            load:true,
            page:1,
            totalResults:70
        }
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=b5249a0b35074894a618085074273439&page=1&pagesize=${this.props.pagesize}`
        let data = await fetch(url);
        let parseddata= await data.json();
        this.setState({a:parseddata.articles,totalResults:parseddata.totalResults,load:false})
    }

    handleuponclick = async ()=>{
        if(Math.ceil((this.state.totalResults)/(this.props.pagesize)<(this.state.page+1))){

        }else{
        let url = `
        https://newsapi.org/v2/everything?domains=wsj.com&apiKey=b5249a0b35074894a618085074273439&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
        this.setState({load:true})
        let data = await fetch(url);
        let parseddata= await data.json();
        this.setState({a:parseddata.articles,page:this.state.page+1,load:false})
        }
    }

    handleonpclick = async ()=>{
        let url = `
        https://newsapi.org/v2/everything?domains=wsj.com&apiKey=b5249a0b35074894a618085074273439&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
        this.setState({load:true})
        let data = await fetch(url);
        let parseddata= await data.json();
        this.setState({a:parseddata.articles,page:this.state.page-1,load:false})
    } 
  render() {
    return (
      <div className='container my-3'>
          <h2 className='text-center'>NewsMonkey - Top Headlines</h2>
          {this.state.load && <Spinner/>}
          <div className='row'>
              {!this.state.load && this.state.a.map((element)=>{
                 return <div className='col-md-3 my-1' key={element.url}>
                 <Newsitem  title={element.title?element.title:""} desc={element.description?element.description:" "} imageUrl={element.urlToImage} newsUrl={element.url}/>
                 </div> 
              })}
          </div>
          <div  className='container d-flex justify-content-between'>
              <button disabled={this.state.page<=1} type='button' onClick={this.handleonpclick} className='btn btn-dark'>&larr;Previous</button>
              <button type='button' disabled={(this.state.totalResults)/(this.props.pagesize)<this.state.page+1} onClick={this.handleuponclick} className='btn btn-dark'>Next &rarr;</button>
          </div>
      </div>
    )
  }

}
export default News;