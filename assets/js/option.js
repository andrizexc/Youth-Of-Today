  $(document).ready(function() {
      
    var swiper1 = new Swiper('.swiper1', {
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: '.btn-next',
        prevEl: '.btn-prev',
      },
      pagination: {
        el: ".swiper-pagination",
      },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
    });
      

  });


$(document).ready(function(){
  // Add scrollspy to <body>
  $('body').scrollspy({target: ".scroll", offset: 50});   

  // Add smooth scrolling on all links inside the navbar
  $(".btn-scroll").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }  // End if
  });
});