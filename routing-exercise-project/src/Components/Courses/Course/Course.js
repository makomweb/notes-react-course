import React, { Component } from 'react';

import './Course.css';

class Course extends Component {
    state = {
        title: ''
    }

    componentDidMount = () => {
        this.updateTitle();
    }

    componentDidUpdate = () => {
        this.updateTitle();
    }

    updateTitle() {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            if (this.state.title !== param[1]) {
                this.setState({ title: param[1] });
            }
        }
    }

    render() {
        const { id } = this.props.match.params;
        const { title } = this.state;
        return (
            <div className="my-course" >
                <p>{id}:{title}</p>
            </div>
        );
    }
}

export default Course;