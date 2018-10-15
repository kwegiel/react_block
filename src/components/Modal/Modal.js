import React, { Component } from 'react';

import './Modal.css';
import Aux from '../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {   

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className="modal"
                    style={{
                        transform: this.props.show ? 'translateX(0)' : 'translateX(-100vw)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;