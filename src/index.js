document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
});

document.addEventListener("click", function (event) {
    if (event.target.id === "btn edit") {
        editDog(event.target);
    }
});

const fetchDogs = function () {
    fetch("http://localhost:3000/dogs")
        .then(function (response) {
            return response.json();
        })
        .then(function (dogs) {
            displayDogs(dogs);
        });
};

function displayDogs(dogs) {
    const table = document.getElementById("table-body");
    dogs.forEach(function (dog) {
        table.innerHTML += `
            <tr>
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button id="btn edit" data-dog-id=${dog.id}>Edit</button></td>
        </tr>
        `;
    });
}

function editDog(btn) {
    let form = document.getElementById("dog-form");
    form[0].placeholder = btn.parentNode.parentNode.children[0].innerText;
    form[1].placeholder = btn.parentNode.parentNode.children[1].innerText;
    form[2].placeholder = btn.parentNode.parentNode.children[2].innerText;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const editForm = {};

        inputs = Array.from(event.target.children);
        inputs.pop();
        inputs.forEach(function (input) {
            editForm[input.name] = input.value;
        });

        fetch(`http://localhost:3000/dogs/${btn.dataset.dogId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(editForm)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function () {
                fetchDogs();
                location.reload();
            });

        event.target.reset();
    });
}