document.querySelector('.upload-button').addEventListener('click', function() {
    const fileInput = document.getElementById('food-image');
    const file = fileInput.files[0];
    if (file) {
        uploadImage(file);
    }
});

function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    fetch('https://api.caloriemama.ai/v1/foodrecognition', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer https://logmeal.com/api/'
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        displayCalories(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayCalories(data) {
    const foodList = document.getElementById('food-list');
    foodList.innerHTML = ''; // Clear previous results

    data.foods.forEach(food => {
        const listItem = document.createElement('li');
        listItem.textContent = `${food.name}: ${food.calories} calories`;
        foodList.appendChild(listItem);
    });
}
