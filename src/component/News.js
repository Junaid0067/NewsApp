import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps = {
        category: 'general',
        pageSize: 10
    }
    static propTypes = {
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.captalizeFirstLetter(this.props.category)}-News`
    }
    async updateNews() {

        try {
            this.props.setProgress(10);
            const urlApi = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(urlApi);

            let parsedData = await data.json();

            this.setState({
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false,

            })
            this.props.setProgress(100);
        }
        catch (e) {
            console.log("Not working");
        }
    }
    async componentDidMount() {
        this.updateNews()
    }

    fetchMoreData = async () => {

        try {
            const urlApi = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ page: this.state.page + 1 })
            this.setState({ loading: true });
            let data = await fetch(urlApi);
            let parsedData = await data.json();
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults
            })
        }
        catch (e) {
            console.log("Not working");
        }
    }

    captalizeFirstLetter = (val) => {
        return val.charAt(0).toUpperCase() + val.slice(1);
    }

    render() {
        return (
            <>
                <h2 align="center" style={{ marginTop: "6rem", marginBottom: "4rem" }}>Top {this.captalizeFirstLetter(this.props.category)} News Headlines</h2>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                >
                    <div className='container'>
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description ? element.description.slice(0, 100) : ""} publishedAt={element.publishedAt} source={element.source.name} author={element.author ? element.author : "Unknown"} imgUrl={element.urlToImage} newsUrl={element.url} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </>
        )
    }
}

export default News

