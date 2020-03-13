/* eslint-disable no-redeclare */
export const rejigData = employees => {
  // Manipulate Data to object with string keys that can be easily referenced later
  var hierarchicalData = {};
  employees.forEach(employee => {
    var key = 'id' + employee.ID;
    hierarchicalData[key] = employee;
  });

  // add child container array to each node
  for (var index in hierarchicalData) {
    hierarchicalData[index].reportees = [];
  }

  // populate the child container arrays
  // eslint-disable-next-line guard-for-in
  // eslint-disable-next-line no-redeclare
  for (var index in hierarchicalData) {
    var parentkey = 'id' + hierarchicalData[index].managerID;
    if (hierarchicalData[parentkey]) {
      hierarchicalData[parentkey].reportees.push(hierarchicalData[index]);
    }
  }

  // find the root nodes (no parent found) and create the hierarchy tree from them
  var treeRoot = [];
  for (var index in hierarchicalData) {
    var parentkey = 'id' + hierarchicalData[index].managerID;
    if (!hierarchicalData[parentkey]) {
      treeRoot.push(hierarchicalData[index]);
    }
  }
  return treeRoot;
};