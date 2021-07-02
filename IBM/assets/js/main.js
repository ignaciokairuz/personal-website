/*
	Paradigm Shift by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Hack: Enable IE workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');

	// Scrolly.
		$('.scrolly')
			.scrolly({
				offset: 100
			});

	// Polyfill: Object fit.
		if (!browser.canUse('object-fit')) {

			$('.image[data-position]').each(function() {

				var $this = $(this),
					$img = $this.children('img');

				// Apply img as background.
					$this
						.css('background-image', 'url("' + $img.attr('src') + '")')
						.css('background-position', $this.data('position'))
						.css('background-size', 'cover')
						.css('background-repeat', 'no-repeat');

				// Hide img.
					$img
						.css('opacity', '0');

			});

			$('.gallery > a').each(function() {

				var $this = $(this),
					$img = $this.children('img');

				// Apply img as background.
					$this
						.css('background-image', 'url("' + $img.attr('src') + '")')
						.css('background-position', 'center')
						.css('background-size', 'cover')
						.css('background-repeat', 'no-repeat');

				// Hide img.
					$img
						.css('opacity', '0');

			});

		}

	// Gallery.
		$('.gallery')
			.on('click', 'a', function(event) {

				var $a = $(this),
					$gallery = $a.parents('.gallery'),
					$modal = $gallery.children('.modal'),
					$modalImg = $modal.find('img'),
					href = $a.attr('href');

				// Not an image? Bail.
					if (!href.match(/\.(jpg|gif|png|mp4)$/))
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Locked? Bail.
					if ($modal[0]._locked)
						return;

				// Lock.
					$modal[0]._locked = true;

				// Set src.
					$modalImg.attr('src', href);

				// Set visible.
					$modal.addClass('visible');

				// Focus.
					$modal.focus();

				// Delay.
					setTimeout(function() {

						// Unlock.
							$modal[0]._locked = false;

					}, 600);

			})
			.on('click', '.modal', function(event) {

				var $modal = $(this),
					$modalImg = $modal.find('img');

				// Locked? Bail.
					if ($modal[0]._locked)
						return;

				// Already hidden? Bail.
					if (!$modal.hasClass('visible'))
						return;

				// Stop propagation.
					event.stopPropagation();

				// Lock.
					$modal[0]._locked = true;

				// Clear visible, loaded.
					$modal
						.removeClass('loaded')

				// Delay.
					setTimeout(function() {

						$modal
							.removeClass('visible')

						setTimeout(function() {

							// Clear src.
								$modalImg.attr('src', '');

							// Unlock.
								$modal[0]._locked = false;

							// Focus.
								$body.focus();

						}, 475);

					}, 125);

			})
			.on('keypress', '.modal', function(event) {

				var $modal = $(this);

				// Escape? Hide modal.
					if (event.keyCode == 27)
						$modal.trigger('click');

			})
			.on('mouseup mousedown mousemove', '.modal', function(event) {

				// Stop propagation.
					event.stopPropagation();

			})
			.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
				.find('img')
					.on('load', function(event) {

						var $modalImg = $(this),
							$modal = $modalImg.parents('.modal');

						setTimeout(function() {

							// No longer visible? Bail.
								if (!$modal.hasClass('visible'))
									return;

							// Set loaded.
								$modal.addClass('loaded');

						}, 275);

					});

})(jQuery);
// File#: _2_modal-video
// Usage: codyhouse.co/license
(function() {
  var ModalVideo = function(element) {
    this.element = element;
    this.modalContent = this.element.getElementsByClassName('js-modal-video__content')[0];
    this.media = this.element.getElementsByClassName('js-modal-video__media')[0];
    this.contentIsIframe = this.media.tagName.toLowerCase() == 'iframe';
    this.modalIsOpen = false;
    this.initModalVideo();
  };

  ModalVideo.prototype.initModalVideo = function() {
    var self = this;
    // reveal modal content when iframe is ready
    this.addLoadListener();
    // listen for the modal element to be open -> set new iframe src attribute
    this.element.addEventListener('modalIsOpen', function(event){
      self.modalIsOpen = true;
      self.media.setAttribute('src', event.detail.closest('[aria-controls]').getAttribute('data-url'));
    });
    // listen for the modal element to be close -> reset iframe and hide modal content
    this.element.addEventListener('modalIsClose', function(event){
      self.modalIsOpen = false;
      Util.addClass(self.element, 'modal--is-loading');
      self.media.setAttribute('src', '');
    });
  };

  ModalVideo.prototype.addLoadListener = function() {
    var self = this;
    if(this.contentIsIframe) {
      this.media.onload = function () {
        self.revealContent();
      };
    } else {
      this.media.addEventListener('loadedmetadata', function(){
        self.revealContent();
      });
    }
    
  };

  ModalVideo.prototype.revealContent = function() {
    if( !this.modalIsOpen ) return;
    Util.removeClass(this.element, 'modal--is-loading');
    this.contentIsIframe ? this.media.contentWindow.focus() : this.media.focus();
  };

  //initialize the ModalVideo objects
  var modalVideos = document.getElementsByClassName('js-modal-video__media');
  if( modalVideos.length > 0 ) {
    for( var i = 0; i < modalVideos.length; i++) {
      (function(i){new ModalVideo(modalVideos[i].closest('.js-modal'));})(i);
    }
  }
}());
