window.onload = function () {
  let value = sessionStorage.getItem('userdate')
  if (value) {
    calc()
    cdate.value = value
  }
}
var myform = document.getElementById('myform')
var cdate = document.getElementById('cdate')
var button = document.getElementById('button')
var days = document.getElementById('days')
var hours = document.getElementById('hours')
var minutes = document.getElementById('minutes')
var seconds = document.getElementById('seconds')
var error = document.getElementById('error')
var change = document.getElementById('change')
var timeout
myform.addEventListener('submit', function (e) {
  e.preventDefault()
  button.disabled = true
  button.innerText = 'Proceesing'
  sessionStorage.setItem('userdate', cdate.value)
  calc()
  button.disabled = false
  button.innerText = 'Set the Countdown'
})
myform.addEventListener('reset', function (e) {
  e.preventDefault()
  cdate.value = null
  clearTimeout(timeout)
  display.innerText = ''
  error.innerText = ''
  sessionStorage.removeItem('userdate')
})
function calc() {
  var currentdate = new Date()
  let userdate = new Date(cdate.value || sessionStorage.getItem('userdate'))
  const diff = userdate.getTime() - currentdate.getTime()
  let timediff = []
  if (diff > 0) {
    timediff.push(Math.floor(diff / (1000 * 60 * 60 * 24)))
    timediff.push(Math.floor((diff / (1000 * 60 * 60)) % 24))
    timediff.push(Math.floor((diff / 1000 / 60) % 60))
    timediff.push(Math.floor((diff / 1000) % 60))
    days.innerText = timediff[0]
    hours.innerText = timediff[1]
    minutes.innerText = timediff[2]
    seconds.innerText = timediff[3]
  } else {
    error.innerText = 'The countdown time is less than current time'
  }
  timeout = setTimeout('calc()', 1000)
}
