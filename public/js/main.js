// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    const mobileMenu = document.querySelector('.md\\:flex.items-center.space-x-8');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            mobileMenu.classList.toggle('flex-col');
            mobileMenu.classList.toggle('absolute');
            mobileMenu.classList.toggle('top-16');
            mobileMenu.classList.toggle('left-0');
            mobileMenu.classList.toggle('right-0');
            mobileMenu.classList.toggle('bg-white');
            mobileMenu.classList.toggle('p-4');
            mobileMenu.classList.toggle('shadow-md');
        });
    }

    // Date picker initialization
    const dateInput = document.querySelector('input[placeholder="Dates de voyages"]');
    if (dateInput) {
        // You can add a date picker library here
        dateInput.type = 'date';
    }

    // Filter tabs functionality
    const filterButtons = document.querySelectorAll('.flex.space-x-4.mb-8 button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-gray-800', 'text-white');
                btn.classList.add('text-gray-800', 'hover:text-[#B38F2E]');
            });

            // Add active class to clicked button
            button.classList.remove('text-gray-800', 'hover:text-[#B38F2E]');
            button.classList.add('bg-gray-800', 'text-white');
        });
    });
}); 