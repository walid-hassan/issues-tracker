let deletedCases = 0;

document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();stactsUpdate();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  document.querySelector('.well h3').style.background = 'red';
  localStorage.setItem('issues', JSON.stringify(issues));
  const remainingIssues = issues.filter( issue => issue.id != id );
  document.getElementById('line').style.textDecoration = 'line-through';
  stactsUpdate();
  fetchIssues();
  console.log(issues, remainingIssues);
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue => issue.id != id );
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  stactsUpdate();
  fetchIssues();
  console.log(issues, remainingIssues);
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info" > ${status} </span></p>
                              <h3 id="line"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
window.addEventListener('load', () => {
  stactsUpdate();
})

function stactsUpdate(){
  const total = JSON.parse(localStorage.getItem('issues'));
  const  closed = total.filter( x => x.status == 'Closed');
  localStorage.setItem('closed', JSON.stringify(closed));
  const totalCases = total.length;
  const totalClosed = closed.length;
  const remain = totalCases - totalClosed;

  document.getElementById('remain').innerText = 'Active Issues: ' + remain;
   document.getElementById('close').innerText = 'Closed Issues: ' + totalClosed;
   document.getElementById('total').innerText = 'Total Issues: ' + totalCases;
}
