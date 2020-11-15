import 'bootstrap';
import 'bootstrap-select';
import _ from 'lodash';
import './scss/custom.scss';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

// ----- Custom scripts -----//

//Enable Bootstrap tooltips, popovers & toasts
$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        html: true,
        delay:  {
            show: 400,
            hide: 100
        }
    });
    $('[data-toggle="popover"]').popover({
        //Popover options
    });
    $('.toast').toast({
        autohide: false
    });
});

//Back to top button
$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('#back-to-top').fadeIn();
    } else {
        $('#back-to-top').fadeOut();
    }
});
$(document).on("click", "#back-to-top", function() {
    $('body,html').animate({
        scrollTop: 0
    }, 800);
    return false;
});

//Custom file input
$(function() {
    // We can attach the `fileselect` event to all file inputs on the page
    $(document).on('change', ':file', function() {
      var input = $(this),
          numFiles = input.get(0).files ? input.get(0).files.length : 1,
          label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
      input.trigger('fileselect', [numFiles, label]);
    });
    // We can watch for our custom `fileselect` event like this
    $(document).ready( function() {
        $(':file').on('fileselect', function(event, numFiles, label) {

            var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;

            if( input.length ) {
                input.val(log);
            } else {
                if( log ) alert(log);
            }

        });
    });
});

//Use image as background image
const useAsBg = document.querySelectorAll(".convert-to-bg");
for (var i = 0; i < useAsBg.length; i++){
    const img = useAsBg[i];
    img.style.visibility = "hidden";
    img.parentElement.style.backgroundImage = `url(${img.src})`;
    img.parentElement.style.backgroundSize = "cover";
    img.parentElement.style.backgroundPosition = "center";
}
//Use image as parallax background
const parallaxImg = document.querySelectorAll(".parallax-image");
for(var i = 0; i < parallaxImg.length; i++) {
    const img = parallaxImg[i];
    img.parentElement.style.backgroundImage = `url(${img.src})`;
}
//Use image as avatar
const avatar = document.querySelectorAll(".avatar");
for(var i = 0; i < avatar.length; i++) {
    const avatarEl = avatar[i];
    const avatarImg = avatarEl.querySelector("img");
    avatarImg.parentElement.style.backgroundImage = `url(${avatarImg.src})`;
}
