$(document).ready(function() {
    const sectionsAndHeaders = $('section, header');  // Include both sections and headers
    const navItems = $('.navigation_item a');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const navLink = $(`.navigation_item a[href="#${id}"]`);
        if (entry.isIntersecting) {
          navItems.removeClass('active-section');  // Ensure only one nav item is active
          navLink.addClass('active-section');
        }
      });
    }, {
      threshold: 0.2
    });
  
    sectionsAndHeaders.each((index, elem) => {
      observer.observe(elem);
    });
  });
  