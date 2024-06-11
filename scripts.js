document.getElementById('addLocationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const locationName = document.getElementById('locationName').value;
    const locationImage = document.getElementById('locationImage').files[0];
    const locationRating = document.getElementById('locationRating').value;
    const locationReview = document.getElementById('locationReview').value;

    if (locationImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newLocation = {
                name: locationName,
                image: e.target.result,
                rating: '★'.repeat(locationRating) + '☆'.repeat(5 - locationRating),
                review: locationReview
            };
            addLocationCard(newLocation);
            closeAddLocationModal();
        };
        reader.readAsDataURL(locationImage);
    }
});

function addLocationCard(location) {
    const locationsContainer = document.getElementById('locations-container');
    
    const card = document.createElement('div');
    card.className = 'location-card';
    card.onclick = function() { toggleReviewDetail(card); };
    
    const thumbnail = document.createElement('img');
    thumbnail.src = location.image;
    thumbnail.alt = location.name;
    thumbnail.className = 'location-thumbnail';
    
    const info = document.createElement('div');
    info.className = 'location-info';
    
    const name = document.createElement('h3');
    name.innerText = location.name;
    
    const rating = document.createElement('div');
    rating.className = 'rating';
    rating.innerText = location.rating;
    
    const shortReview = document.createElement('p');
    shortReview.innerText = location.review.length > 30 ? location.review.substring(0, 27) + '...' : location.review;
    
    const fullReview = document.createElement('div');
    fullReview.className = 'review-detail';
    const reviewText = document.createElement('p');
    reviewText.innerText = location.review;
    fullReview.appendChild(reviewText);

    info.appendChild(name);
    info.appendChild(rating);
    info.appendChild(shortReview);

    card.appendChild(thumbnail);
    card.appendChild(info);
    card.appendChild(fullReview);
    
    locationsContainer.appendChild(card);
}

function toggleReviewDetail(card) {
    const reviewDetail = card.querySelector('.review-detail');
    reviewDetail.style.display = reviewDetail.style.display === 'none' || !reviewDetail.style.display ? 'block' : 'none';
}

function openAddLocationModal() {
    document.getElementById('addLocationModal').style.display = 'block';
}

function closeAddLocationModal() {
    document.getElementById('addLocationModal').style.display = 'none';
}
