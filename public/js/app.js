const weatherForm = document.querySelector('form')
const inputField = document.querySelector('input')
const messageOne = document.querySelector('#para_1')
const messageTwo = document.querySelector('#para_2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = inputField.value

    messageOne.textContent = 'Loading weather...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error){
                
                messageOne.textContent = data.error
            } else {

                messageOne.textContent = data.Location
                messageTwo.textContent = data.Forecast
            }
        })
    })  
})

