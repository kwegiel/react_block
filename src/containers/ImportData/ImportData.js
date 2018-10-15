import React, { Component } from 'react';
import axios from '../../axios';
import './ImportData.css';
import FilterSearch from '../../components/FilterSearch/FilterSearch';
import LoadMore from '../../components/LoadMore/LoadMore';
import Spinner from '../../components/Spinner/Spinner';
import PortfolioView from '../PortfolioView/PortfolioView';
import Aux from '../../hoc/Aux/Aux';


class ImportData extends Component {
    state = {
        data: null,
        included: [],
        search: '',
        visible: 12,
        error: false,
        modal: false,
        selectedId: null
    }
    componentDidMount() {
        if (!this.state.data) {            
            axios.get('/node/article?_consumer_id=05c7b6e5-7a48-41ab-bb75-cb9dd8fb01df&format=api_json&fields[node--article]=field_image,title,field_tags,uid&include=field_image,field_tags')
                .then(res => {
                    const resData = res.data.data;
                    console.log(res);
                    const updatedData = resData.map(item => {
                        return {
                            id: item.id,
                            title: item.attributes.title,
                            img: this.returnImgHandler(res.data.included, item.relationships.field_image.data.id),
                            tag: this.returnTagHandler(res.data.included, item.relationships.field_tags.data.id),
                        }
                    });
                    console.log(updatedData);
                    this.setState({ data: updatedData });
                    this.setState({ included: res.data.included });                    
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ error: true });
                    this.setState({ errorMsg: error });                    
                });
        }
    }
    modalOpenHandler = (id) => {
        this.setState({ selectedId: id });
        this.setState({ modal: true });
    }

    modalCloseHandler = () => {
        this.setState({ modal: false });
        this.setState({ selectedId: null });
    }
    searchHandler = (event) => {
        this.setState({
            search: event.target.value
        });
    }
    returnTagHandler = (data, id) => {
        let tag = data.filter(
            (item) => {
                return item.id.indexOf(id.toString()) !== -1;
            }
        );
        tag = tag.map(item => { return item.attributes.name })
        return tag.toString();

    }
    returnImgHandler = (data, id) => {
        let img = data.filter(
            (item) => {
                return item.id.indexOf(id.toString()) !== -1;
            }
        );
        img = img.map(item => { return item.meta.derivatives.large })
        return img.toString();
    }
    filterHandler = (filter) => {
        this.setState({
            search: filter
        });
    }
    loadMoreHandler() {
        this.setState((prev) => {
            return { visible: prev.visible + 12 };
        });
    }
    render() {
        let filteredData = <p style={{ textAlign: 'center' }}>Something went wrong! Try refreshing the page. </p>;
        let loadMoreBtn = null;
        if (this.state.data) {
            if (!this.state.error) {
                filteredData = this.state.data.filter(
                    (item) => {
                        return item.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                            || item.tag.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                    }
                );
                if (filteredData.length > this.state.visible) {
                    loadMoreBtn = <LoadMore url="themes/starter/images/loadMoreArrow.png" click={this.loadMoreHandler.bind(this, this.state.visible)} />;
                }
                filteredData = filteredData.slice(0, this.state.visible).map((item, index) => (
                    <div key={item.id} className="grid-item element-item fade-in">
                        <img src={item.img} alt="" />
                        <div className="grid-item--wrapper">
                            <div className="portfolio-text-holder">
                                <p className="portfolio-text">{item.title}</p>
                                <p onClick={() => this.filterHandler(item.tag)} className="portfolio-type">{item.tag}</p>
                                <button className="btn_pink" onClick={() => this.modalOpenHandler(item.id)}>Read more</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        } else {
            filteredData = <Spinner />;
        }
        return (
            <Aux>
                <PortfolioView portfolioId={this.state.selectedId} showModal={this.state.modal} closeModal={this.modalCloseHandler} />
                <div className="portfolio">
                    <FilterSearch change={this.searchHandler} search={this.state.search} clear={this.filterHandler.bind(this, '')} />
                    <div className="grid" id="porfolio">
                        {filteredData}
                    </div>
                    {loadMoreBtn}
                </div>
            </Aux>
        );
    }
}

export default ImportData;