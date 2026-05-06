document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.getElementById('ctaButton');

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            console.log('Explore Features button clicked!');
            alert('Thank you for your interest in Commercebot features!');
        });
    }
});
