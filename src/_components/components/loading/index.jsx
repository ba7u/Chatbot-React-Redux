import React, { Component } from 'react';
import spinner from '../../../images/spinner';

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loading">
                <img src={spinner} />
            </div>
        );
    }
}

export { Loading };