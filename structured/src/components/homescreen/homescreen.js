import React, {Component} from 'react';
import neuralNet from './splashcreen';

class Homescreen extends Component {
    componentDidMount() {
        neuralNet(this.intro.current);
    }

    constructor(props) {
        super(props);
        this.intro = React.createRef();
    }

    render () {
        return (
            <canvas style={{margin: '-60px 0px'}} ref={this.intro}> </canvas>
        );
    }
};

export default Homescreen;