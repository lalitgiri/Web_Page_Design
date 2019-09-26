window.addEventListener('scroll', function() {
    var elementsToShow = document.querySelectorAll('.show-on-scroll');
   

        elementsToShow.forEach(function (element) {
          if (isElementInViewport(element)) {
            element.classList.add('left');
          } else {
            element.classList.remove('left');
          }
        });
      
        // scroll(loop);
      
  });

  function isElementInViewport(el) {
    // special bonus for those using jQuery
    // if (typeof jQuery === "function" && el instanceof jQuery) {
    //   el = el[0];
    // }
    var rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0
        && rect.bottom >= 0)
      ||
      (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      ||
      (rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
  }