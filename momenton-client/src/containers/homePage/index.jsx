import React from 'react';
import { connect } from 'react-redux';
import {
  momentonServerRequestSuccess,
  momentonServerRequestFailed
} from './homePage.actions';
import { getEmployees } from '../../api/employee';
import { rejigData } from '../../utils/treeHireracy';
import MuiTreeView from 'material-ui-treeview';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeView: {}
    };
  }
  async componentDidMount() {
    getEmployees()
      .then(response => {
        console.log(`[+] Response is received ${response}`);
        this.setState({ treeView: rejigData(response) });
        console.log('this.state.treeView', this.state.treeView);
        if (response.success)
          this.props.momentonServerRequestSuccess(response.data);
        else this.props.momentonServerRequestFailed(response);
      })
      .catch(error => {
        console.log(
          `[+] The error returned error with the given error. ${error}`
        );
      });
  }

  render() {
    return (
      <div>
        {/* <MuiTreeView tree={this.state.treeView} /> */}
        <h1> Welcome to Momenton Client App </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    employeeData: state.employee
  };
};

const mapDispatchToProps = dispatch => {
  return {
    momentonServerRequestSuccess: success => {
      dispatch(momentonServerRequestSuccess(success));
    },
    momentonServerRequestFailed: error => {
      dispatch(momentonServerRequestFailed(error));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
