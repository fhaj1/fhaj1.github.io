let loggedIn = false;

document.getElementById('addLocationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const locationName = document.getElementById('locationName').value;
    const locationImages = document.getElementById('locationImages').files;
    const locationRating = document.getElementById('locationRating').value;
    const locationReview = document.getElementById('locationReview').value;

    const imagePromises = Array.from(locationImages).map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        });
    });

    Promise.all(imagePromises).then(images => {
        const newLocation = {
            name: locationName,
            images: images,
            rating: '★'.repeat(locationRating) + '☆'.repeat(5 - locationRating),
            review: locationReview
        };
        addLocationCard(newLocation);
        closeAddLocationModal();
    });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // For simplicity, assume login always succeeds
    loggedIn = true;
    document.getElementById('loginButton').innerText = 'Logout';
    closeLoginModal();
});

document.getElementById('loginButton').addEventListener('click', function() {
    if (loggedIn) {
        loggedIn = false;
        document.getElementById('loginButton').innerText = 'Login';
    } else {
        toggleLoginModal();
    }
});

function addLocationCard(location) {
    const locationsContainer = document.getElementById('locations-container');
    
    const card = document.createElement('div');
    card.className = 'location-card';
    card.onclick = function() { toggleReviewDetail(card); };

    location.images.forEach(imageSrc => {
        const thumbnail = document.createElement('img');
        thumbnail.src = imageSrc;
        thumbnail.alt = location.name;
        thumbnail.className = 'location-thumbnail';
        card.appendChild(thumbnail);
    });
    
    const info = document
