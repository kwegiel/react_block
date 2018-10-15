import React, { Component } from 'react';
import axios from '../../axios';
import './PortfolioView.css';
import Spinner from '../../components/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux'
import Modal from '../../components/Modal/Modal';


class PortfolioView extends Component {
    state = {
        loadedPost: null,
        included: null,
        error: false
    }

    componentDidUpdate() {
        if (this.props.portfolioId) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.portfolioId)) {
                axios.get('/node/article/' + this.props.portfolioId + '?_consumer_id=05c7b6e5-7a48-41ab-bb75-cb9dd8fb01df&format=api_json&include=field_image,field_tags')
                    .then(res => {
                        console.log(res);
                        const resData = res.data.data;
                        const resIncluded = res.data.included;
                        this.setState({ loadedPost: resData });
                        this.setState({ included: resIncluded });
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({ error: true });
                    });
            }
        }
    }
    render() {
        let post = null;
        if (!this.props.portfolioId) {
            post = (
                <Aux>
                    <Modal show={this.props.showModal} modalClosed={this.props.closeModal}>
                        <Spinner />
                    </Modal>
                </Aux>

            );
        }
        if (this.state.loadedPost && this.state.included) {
            let img = this.state.included.map(item => {               
                return item.attributes.url;
            });            
            post = (
                <Aux>
                    <Modal show={this.props.showModal} modalClosed={this.props.closeModal}>
                        <h3>{this.state.loadedPost.attributes.title}</h3>
                        <img className="img_res" src={img.join("")} alt={this.state.loadedPost.attributes.title} />
                        <div dangerouslySetInnerHTML={{ __html: this.state.loadedPost.attributes.body.value}}></div>
                    </Modal>
                </Aux>

            );
        }
        return post;
    }
}

export default PortfolioView;