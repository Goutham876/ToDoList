var todoList = []
var detailedList = []
var id = 0
var input = document.getElementById('input1')
var personName = document.getElementById('input2')
var dueDate = document.getElementById('input3')
var todoRender = document.getElementById('todoList')

const handleSubmit = () => {
  todoList.push({
    name: input.value
  })

  detailedList.push({
    id: id++,
    task: input.value,
    name: personName.value,
    date: dueDate.value
  })

  input.value = ''
  personName.value = ''
  dueDate.value = ''

  renderTodo()
}

const renderTodo = () => {
  todoRender.innerHTML = ''
  detailedList.forEach(todo => {
    todoRender.innerHTML += `<h3>${todo.name} needs to ${todo.task} by  ${todo.date}<div style='float: right'><button onclick='removeParent(this.parentNode)'>X</button></div></h3>`
  })
}
var list = []
var pageList = []
var currentPage = 1
var numberPerPage = 10
var numberOfPages = 0

function makeList () {
  for (var x = 0; x < detailedList.length; x++) {
    list.push(detailedList[x])
  }

  numberOfPages = getNumberOfPages()
}

function getNumberOfPages () {
  return Math.ceil(detailedList.length / numberPerPage)
}

function nextPage () {
  currentPage += 1
  loadList()
}

function previousPage () {
  currentPage -= 1
  loadList()
}

function firstPage () {
  currentPage = 1
  loadList()
}

function lastPage () {
  currentPage = numberOfPages
  loadList()
}

function loadList () {
  var begin = ((currentPage - 1) * numberPerPage)
  var end = begin + numberPerPage

  pageList = list.slice(begin, end)
  drawList()
  check()
}

function drawList () {
  document.getElementById('list').innerHTML = ''
  for (var r = 0; r < pageList.length; r++) {
    document.getElementById('list').innerHTML += '<h3>' + pageList[r].name + ' needs to ' + pageList[r].task + ' by ' + pageList[r].date + '<br/>'
  }
}

function check () {
  document.getElementById('next').disabled = currentPage === numberOfPages ? true : false
  document.getElementById('previous').disabled = currentPage === 1 ? true : false
  document.getElementById('page1').disabled = currentPage === 1 ? true : false
  document.getElementById('last').disabled = currentPage === numberOfPages ? true : false
}

function load () {
  makeList()
  loadList()
}

function sortById () {
  var simpleSort = detailedList.sort(function (a, b) {
    return b.id - a.id
  })

  document.getElementById('sorted1').innerHTML = ''
  for (var k = 0 ; k < simpleSort.length; k++) {
    document.getElementById('sorted1').innerHTML += '<h3> My ID is ' + simpleSort[k].id + ' Name of the person is ' + simpleSort[k].name + ' task assigned is ' + simpleSort[k].task + ' duedaten ' + simpleSort[k].date + ' <br/>'
  }
}

function sortByName() {
  var finalSort = detailedList.sort(function (a, b) {
    var aName = a.name.toLowerCase()
    var bName = b.name.toLowerCase()
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0))
  })

  document.getElementById('sorted2').innerHTML = ''
  for (var k = 0; k < finalSort.length; k++) {
    document.getElementById('sorted2').innerHTML += '<h3> My ID is' + finalSort[k].id + ' Name of the person is ' + finalSort[k].name + ' task assigned is ' + finalSort[k].task + ' duedate on ' + finalSort[k].date + '<br/>'
  }
}

function searchByName () {
  var searchTerm = document.getElementById('search')
  document.getElementById('renderSearch').innerHTML = ''
  // alert(searchTerm.value)
  detailedList.forEach(function (item) {
    var search1 = searchTerm.value.toLowerCase()
    var item1 = item.name.toLowerCase()
    if (search1 === item1) {
      // alert(item.name)
      document.getElementById('renderSearch').innerHTML += '<h3> ID : ' + item.id + '<br/>' + ' Name : ' + item.name + '<br/>' + ' Task : ' + item.task + '<br/> ' + ' Due Date : ' + item.date + '<br/>'
    }
  })
}

function removeParent (parent) {
  parent.parentNode.remove()
}
