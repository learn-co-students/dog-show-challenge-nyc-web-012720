const BASEURL = 'http://localhost:3000/dogs'
const tableBody = document.getElementById("table-body")
const dogForm = document.getElementById("dog-form")

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
    
})

tableBody.addEventListener('click', event => {
    if (event.target.className === 'edit-btn'){
        let inputs = dogForm.querySelectorAll('input')
        let attributes = event.path[2].childNodes
        inputs[0].value = attributes[0].innerText
        inputs[1].value = attributes[1].innerText
        inputs[2].value = attributes[2].innerText
        dogForm.dataset.id = attributes[3].dataset.id
    }
})

dogForm.addEventListener('submit', event => {
    event.preventDefault()
    let id = event.target.dataset.id
    fetch(`${BASEURL}/${id}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: event.target.name.value,
            breed: event.target.breed.value,
            sex: event.target.sex.value
        })
    })
    .then(response => response.json())
    .then(updatedDog => {
        tableRow = tableBody.childNodes[id].childNodes
        tableRow[0].innerText = updatedDog.name
        tableRow[1].innerText = updatedDog.breed
        tableRow[2].innerText = updatedDog.sex
    })

})

const fetchDogs = () => {
    fetch(BASEURL)
    .then(response => response.json())
    .then(dogs => {
        dogs.forEach(dog => {
            renderDog(dog)
        })
    })
}

const renderDog = (dog) => {
    let tableRow = document.createElement('tr')
    for (let attribute in dog){
        let tableData = document.createElement('td')
        tableData.innerText = dog[attribute]
        tableRow.append(tableData)
    }
    tableRow.querySelector('td').remove()

    let editButton = document.createElement('button')
    editButton.innerText = 'Edit'
    editButton.className = 'edit-btn'
    let tdForId = document.createElement('td')
    tdForId.dataset.id = dog.id
    tdForId.appendChild(editButton)
    tableRow.append(tdForId)
    tableBody.append(tableRow)
}




















// table.addEventListener("click", function (event) {
//     let tableData = document.createElement(tr)
//     let tableRow = 
//     const tableData = event.target.parentNode.parentNode
//     const tableRows = Array.from(tableData.getElementsByTagName("td"))
//     if (event.target.className === "edit.btn") {
//         editDog()
//     }
// })


// function fetchDogs() {
//     fetch("http://localhost:3000/dogs")
//     .then(response => response.json())
//     .then(json => json.forEach(dog => {
//         renderDog(dog)
//     }))
// }
// function renderDog(dog) {
//     const table = document.getElementById("table-body")
//     table.innerHTML += `
//     <tr data-row-id=${dog.id}>
//     <td>${dog.name}</td>
//     <td>${dog.breed}</td> 
//     <td>${dog.sex}</td> 
//     <td data-id=${dog.id}><button class="edit.btn">Edit</button></td>
//     </tr>
//     `
// }
// function editDog() {
//     dogForm.dataset.id = tableRows[3].dataset.id
//     dogForm.innerHTML = `
//         <input type="text" name="name" placeholder="dog's name" value="${tableRows[0].innerText}" />
//         <input type="text" name="breed" placeholder="dog's breed" value="${tableRows[1].innerText}" />
//         <input type="text" name="sex" placeholder="dog's sex" value="${tableRows[2].innerText}" />
//         <input type="submit" value="Submit" />
//     `


//     dogForm.addEventListener("submit", function (event) {
//         event.preventDefault()
//         fetch(`http://localhost:3000/dogs/${dogForm.dataset.id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify({
//                 name: event.target.name.value,
//                 breed: event.target.breed.value,
//                 sex: event.target.sex.value
//             })
//         })
//         .then(response => response.json())
//         .then(dog => {
//             const tr = document.querySelector(`[data-row-id='${dogForm.dataset.id}']`)
//             tr.innerHTML = `
//                 <td>${dog.name}</td>
//                 <td>${dog.breed}</td> 
//                 <td>${dog.sex}</td> 
//                 <td data-id=${dogForm.dataset.id}><button class="edit.btn">Edit</button></td>
//             `
//         })
//     })
// }
