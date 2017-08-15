function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  let inputForm = document.getElementById('user')
  inputForm.addEventListener("submit", function(event) {
    event.preventDefault()
    let inputUser = document.getElementById('get-user')
    let username = inputUser.value
    const req = new XMLHttpRequest
    req.open("GET", `https://api.github.com/users/${username}/repos`)
    req.setRequestHeader("Authorization", "token 3ce8e5b53ce13c70dcaeca9df80087e50679f7f3")
    req.addEventListener("load", showRepositories);
    req.send()
  })
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
  let inputUser = document.getElementById('get-user')
  const name = el.dataset.repo
  const username = inputUser.value
  const req = new XMLHttpRequest()
  req.open("GET", `https://api.github.com/repos/${username}/` + name + '/commits')
  req.setRequestHeader("Authorization", "token 3ce8e5b53ce13c70dcaeca9df80087e50679f7f3")
  req.addEventListener("load", displayCommits)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getBranches(el) {
  debugger
  let inputUser = document.getElementById('get-user')
  const name = el.dataset.repo
  const username = inputUser.value
  const req = new XMLHttpRequest()
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`)
  req.setRequestHeader("Authorization", "token 3ce8e5b53ce13c70dcaeca9df80087e50679f7f3")
  req.addEventListener("load", displayBranches)
  req.send()
}
