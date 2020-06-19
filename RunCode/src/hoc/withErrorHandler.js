import React, { Component ,Fragment } from 'react';


/**
 *Use in component where you have to make http/grpc calls like when mapping endpoints in a component
 * Represents a HigherOrderComponent to Handle Error thrown by component
 * @function
 */
const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Fragment>
                    // <Modal
                    //     show={this.state.error}
                    //     modalclosingprop={this.errorConfirmedHandler}>
                    //     {this.state.error ? this.state.error.message : null}
                    // </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
}

export default withErrorHandler;
