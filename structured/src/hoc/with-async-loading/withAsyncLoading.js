import React from 'react';

function withAsyncLoading(WrappedComponent) {
    return class extends React.Component {
        state = {
            component: null
        };

        componentDidMount() {
            WrappedComponent().then(component => {
                this.setState({
                    component: component.default
                })
            })
        };

        render () {
            const Loaded = this.state.component;
            return Loaded
                ? <Loaded {...this.props} />
                : null;
        };
    }
}

export default withAsyncLoading;