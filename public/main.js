const initFixedHeader = () => {
    const container = document.body;
    const isPageScrolled = () => document.body.scrollTop > 0;
    container.addEventListener('scroll', () => {
        if (isPageScrolled()) {
            container.classList.add('scrolled');
            return;
        }
        container.classList.remove('scrolled');
    });
};
document.addEventListener('DOMContentLoaded', initFixedHeader);
export {};
