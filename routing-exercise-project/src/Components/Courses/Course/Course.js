import React, { Component } from 'react';

import './Course.css';

class Course extends Component {
    state = {
        title: ''
    }

    componentDidMount = () => {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            //console.log(param);
            this.setState({ title: param[1] });
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