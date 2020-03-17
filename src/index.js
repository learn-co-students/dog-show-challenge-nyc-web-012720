document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById("table-body")
    const dogForm = document.getElementById("dog-form")
    document.addEventListener("click", assignEdit)
    fetch('http://localhost:3000/dogs')
    .then(function(response){
        return response.json()
    })
    .then(function(dogs){
        dogs.forEach(dog => {
            table.innerHTML += `<tr>
            <td>${dog.name}</td> 
            <td>${dog.breed}</td> 
            <td>${dog.sex}</td> 
            <td><button id="edit-btn" data-id=${dog.id}>Edit</button></td>
            </tr>`
        });
    })
    function assignEdit(event) {
        event.preventDefault()
        if(event.target.id === "edit-btn"){
            editDog(event.target.dataset.id)
        } 
        else if(e.target.parentElement.id === 'dog-form'){
            editedDog(e)
          }
    }
    function editDog(id){
        fetch(`http://localhost:3000/dogs/${id}`)
        .then(response => response.json())
        .then(dog => {
          dogForm.name.value = dog.name,
          dogForm.sex.value = dog.sex,
          dogForm.breed.value = dog.breed,
          dogForm.dataset.id = dog.id
        })
    }
    function editedDog(e){
        let dog = {
          name: e.target.parentElement.name.value,
          sex: e.target.parentElement.sex.value,
          breed: e.target.parentElement.breed.value
        }
      
        fetch(`http://localhost:3000/dogs/${e.target.parentElement.dataset.id}`, {
          method: 'PATCH',
          headers: {
            "content-type": 'application/json',
            accepts: 'application/json'
          },
          body: JSON.stringify(dog)
        }).then(res => res.json())
        .then(dog => {
          let foundDog = document.querySelector(`tr[data-id="${dog.id}"]`)
          foundDog.children[0].innerText = dog.name
          foundDog.children[1].innerText = dog.breed
          foundDog.children[2].innerText = dog.sex
        })
      }
})