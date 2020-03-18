document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
    editDog();

})
    function fetchDogs() {
        fetch("http://localhost:3000/dogs")
        .then( response => response.json())
        .then( dogs => dogs.forEach( 
            dog => { renderDog(dog)}
        ))
    }

    function renderDog(dog) {
        const table = document.getElementById('table-body')
        table.innerHTML += `
        <tr data-row-id=${dog.id}>
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td data-id=${dog.id}><button class="edit-btn">Edit</button></td>
        </tr>
        `
    }
    
    function editDog() {
        const table = document.getElementById('table-body')
        const dogForm = document.getElementById("dog-form")
        table.addEventListener("click", event => {
            const tableData = event.target.parentNode.parentNode
            const tableRows = Array.from(tableData.getElementsByTagName("td"))
            if (event.target.className === "edit-btn") {
                dogForm.dataset.id = tableRows[3].dataset.id
                dogForm.innerHTML = `
                <input type="text" name="name" placeholder="dog's name" value="${tableRows[0].innerText}" />
                <input type="text" name="breed" placeholder="dog's breed" value="${tableRows[1].innerText}" />
                <input type="text" name="sex" placeholder="dog's sex" value="${tableRows[2].innerText}" />
                <input type="submit" value="Submit" />
                `
            }
        })
        dogForm.addEventListener("submit", event => {
            event.preventDefault()
            console.log(event.target)
            const tr = document.querySelector(`[data-row-id="${dogForm.dataset.id}"]`)
            fetch(`http://localhost:3000/dogs/${dogForm.dataset.id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    name: event.target.name.value,
                    breed: event.target.breed.value,
                    sex: event.target.sex.value })
                })
                .then(resp => resp.json()
                .then(dog => {
                    tr.innerHTML = `
                        <td>${dog.name}</td> 
                        <td>${dog.breed}</td> 
                        <td>${dog.sex}</td> 
                        <td data-id=${dog.id}><button class="edit-btn">Edit</button></td>
                    `
                }))
            })
    }
        
