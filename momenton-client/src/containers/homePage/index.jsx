import React from 'react';
import { connect } from 'react-redux';
import {
  momentonServerRequestSuccess,
  momentonServerRequestFailed
} from './homePage.actions';
import { getEmployees } from '../../api/employee';
import MuiTreeView from 'material-ui-treeview';

const tree = [
  {
    value: 'Parent A',
    nodes: [{ value: 'Child A' }, { value: 'Child B' }]
  },
  {
    value: 'Parent B',
    nodes: [
      {
        value: 'Child C'
      },
      {
        value: 'Parent C',
        nodes: [
          { value: 'Child D' },
          { value: 'Child E' },
          { value: 'Child F' }
        ]
      }
    ]
  }
];

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
        console.log(`[+] Response is received ${JSON.stringify(response)}`);
        var employeeData = [];
        var parent = {};
        response.forEach(data => {
          console.log(data.ID, data.employeeName, data.reportees.length);
          parent.value = data.employeeName;
          parent.nodes = [];
          data.reportees.forEach(reporteeOneLevel => {
            var childOneLevel = {};
            childOneLevel.value = reporteeOneLevel.employeeName;
            childOneLevel.nodes = [];
            reporteeOneLevel.reportees.forEach(reporteeSecondLevel => {
              var childSecondLevel = {};
              childSecondLevel.value = reporteeSecondLevel.employeeName;
              childSecondLevel.nodes = [];
              childOneLevel.nodes.push(childSecondLevel);
            });
            parent.nodes.push(childOneLevel);
          });
          employeeData.push(parent);
        });
        this.setState({ treeView: employeeData });
        console.log(
          `[+] Updated this.state.treeview is ${JSON.stringify(
            this.state.treeView
          )}`
        );
        if (response.length)
          this.props.momentonServerRequestSuccess(this.state.treeView);
        else this.props.momentonServerRequestFailed(employeeData);
      })
      .catch(error => {
        console.log(
          `[+] The error returned error with the given error. ${error}`
        );
      });
  }

  render() {
    console.log(
      `[+] Updated this.state.treeview is ${JSON.stringify(
        this.state.treeView
      )}`
    );
    console.log(`[+] fixed tree is ${JSON.stringify(tree)}`);
    return (
      <div>
        {/* <MuiTreeView tree={this.state.treeView} /> */}
        <h1> Welcome to Momenton Client App </h1>
        <MuiTreeView tree={tree} />
        {/* <MuiTreeView tree={this.state.treeView} /> */}
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
