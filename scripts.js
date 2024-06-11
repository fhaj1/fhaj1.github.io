document.addEventListener('DOMContentLoaded', () => {
    const addNewSpotButton = document.getElementById('add-new-spot');
    const reviewFormModal = document.getElementById('review-form');
    const fullReviewModal = document.getElementById('full-review');
    const closeButtons = document.querySelectorAll('.close');
    const newReviewForm = document.getElementById('new-review-form');
    const dashboard = document.getElementById('dashboard');
    
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    function saveReviews() {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    function displayReviews() {
        dashboard.innerHTML = '';
        reviews.forEach((review, index) => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');
            reviewCard.innerHTML = `
                <img src="${review.image}" alt="${review.name}">
                <h3>${review.name}</h3>
                <p>Rating: ${review.rating}</p>
                <p>${review.review.substring(0, 30)}...</p>
            `;
            reviewCard.addEventListener('click', () => showFullReview(index));
            dashboard.appendChild(reviewCard);
        });
    }

    function showFullReview(index) {
        const review = reviews[index];
        const fullReviewContent = document.getElementById('full-review-content');
        fullReviewContent.innerHTML = `
            <img src="${review.image}" alt="${review.name}" style="width: 100%; border-radius: 10px;">
            <h2>${review.name}</h2>
            <p>Rating: ${review.rating}</p>
            <p>${review.review}</p>
        `;
        fullReviewModal.style.display = 'block';
    }

    addNewSpotButton.addEventListener('click', () => {
        reviewFormModal.style.display = 'block';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            reviewFormModal.style.display = 'none';
            fullReviewModal.style.display = 'none';
        });
    });

    newReviewForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const spotImage = document.getElementById('spot-image').files[0];
        const spotName = document.getElementById('spot-name').value;
        const spotRating = document.getElementById('spot-rating').value;
        const spotReview = document.getElementById('spot-review').value;

        const reader = new FileReader();
        reader.onloadend = () => {
            const review = {
                image: reader.result,
                name: spotName,
                rating: spotRating,
                review: spotReview
            };
            reviews.push(review);
            saveReviews();
            displayReviews();
            reviewFormModal.style.display = 'none';
            newReviewForm.reset();
        };
        reader.readAsDataURL(spotImage);
    });

    displayReviews();
});
