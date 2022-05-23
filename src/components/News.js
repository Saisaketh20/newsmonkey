import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {
    static defaultProps = {
        country: 'in',
        pagesize: 15,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }
   
    constructor(props) {
        super(props);
        this.state = {
            a: [],
            load: true,
            page: 1,
            totalResults: 70
        }
       document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }
    async updatenews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`
        this.setState({load:true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseddata = await data.json();
        this.props.setProgress(70);
        this.setState({
             a : parseddata.articles,
             load: false,
             totalResults:parseddata.totalResults,
        })
        this.props.setProgress(100);
    }
    // async componentDidMount() {
    //     let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=b5249a0b35074894a618085074273439&page=1&pagesize=${this.props.pagesize}`
    //     let data = await fetch(url);
    //     let parseddata = await data.json();
    //     this.setState({ a: parseddata.articles, totalResults: parseddata.totalResults, load: false })
    // }
    async componentDidMount() {
        this.updatenews();
    }

    // handleuponclick = async () => {
    //     if (Math.ceil((this.state.totalResults) / (this.props.pagesize) < (this.state.page + 1))) {

    //     } else {
    //         let url = `
    //     https://newsapi.org/v2/everything?domains=wsj.com&apiKey=b5249a0b35074894a618085074273439&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
    //         this.setState({ load: true })
    //         let data = await fetch(url);
    //         let parseddata = await data.json();
    //         this.setState({ a: parseddata.articles, page: this.state.page + 1, load: false })
    //     }
    // }
    // handleonpClick = async () => {
    //     this.setState({ page: this.state.page - 1 });
    //     this.updatenews();
    // }


    fetchMoreData = async()=>{
    this.setState({page:this.state.page+1})
    const url=`
    https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    let data= await fetch(url);
    let parseddata= await data.json()
    this.setState({
        a: this.state.a.concat(parseddata.articles),
        totalResults:parseddata.totalResults,
    })
    }
    handleonpclick = async () => {
        let url = `
        https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
        this.setState({ load: true })
        let data = await fetch(url);
        let parseddata = await data.json();
        this.setState({ a: parseddata.articles, page: this.state.page - 1, load: false })
    }
    // handleuponClick = async () => {
    //     this.setState({ page: this.state.page + 1 });
    //     this.updatenews()
    // }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center' style={{ margin: '70px 0px 0px 30px', }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {this.state.load && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.a.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.a.length !== this.state.totalResults}
                    load={<Spinner/>}
                > 
                <div className="container">
                    <div className='row'>
                    {!this.state.load && this.state.a.map((element) => {
                        return <div className='col-md-3 my-1' key={element.url}>
                            <Newsitem title={element.title ? element.title : ""} desc={element.description ? element.description : " "} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} author={element.author} publish={element.publishedAt} />
                        </div>
                    })}
                </div>
                </div>
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type='button' onClick={this.handleonpclick} className='btn btn-dark'>&larr;Previous</button>
                    <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleuponclick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }

}
export default News;
//fef5e4a26909407b8a1daefac1083d8d