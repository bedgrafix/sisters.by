$('.b-header-search').on('change blur', function() {
	search_placeholder();
});
$('.b-header-search').on('focus', function() {
	$('.b-search-wrap__placeholder').css({"visibility": "hidden"});
});

$('.fancybox').fancybox({
	loop:true,
});

$(function() {
	search_placeholder();
});

function search_placeholder() {
	if( $('.b-header-search').val() == '' ) {
		$('.b-search-wrap__placeholder').css({"visibility": "visible"});
	} else {
		$('.b-search-wrap__placeholder').css({"visibility": "hidden"});
	}
}

$('.b-search-wrap__placeholder').click( function() {
	$(this).css({"visibility": "hidden" });
	$(this).siblings('.b-header-search').focus();
});

var headerBottom = $('.l-header.bottom');

$(window).on('scroll', function() {

	if( $(window).width() > 992 && $(document).scrollTop() > 200 ) {
		headerBottom.addClass('js-fixed');
	} else {
		headerBottom.removeClass('js-fixed');
		$('.l-container.search').removeClass('js-act');
	};

	// if ($('.b-products-loader').length ) {
	// 	if($('.b-products-loader').isOnScreen())
	// 	{
	// 		$('.b-products-loader').addClass('in-viewport');
	// 	} else {
	// 		$('.b-products-loader').removeClass('in-viewport');
	// 	};
	// };

});

$('.b-dropdown-sorting__item').click(function() {
	$.cookie('sorts', $(this).data('sort'), {
		expires: 1,
		path: '/'
	});
	window.location.reload();
});


var _load = false;
$(window).scroll(function() {
	if(_load) return false;
	if(!$('.js-show-more').length) return false;

	if($('.js-show-more').isOnScreen()) {
		load_more($('.js-show-more'));
	}
});
function load_more($this) {
	var $data = $this.data();
	$data.command = 'load_list';
	$.ajax({
		beforeSend: function() {
			_load = true;
			$this.addClass('in-viewport');
		},
		data: $data,
		dataType: 'json',
		success: function(responce) {

			if (responce.result) {
				$('#items-place').append(responce.message);
				if($this.data('load') == 1) load_products_sliders()
			}
			$this.remove();
			_load = false;
		}
	});
}

$(document).ready( function() {

	$('.b-mobile-btn.js-search').click( function() {

		// $(this).addClass('js-inactive');
		$('.l-container.search').toggleClass('js-act');
		if($('.l-container.search').hasClass('js-act')) {
			$('.b-header-search').focus();
		}
	});

	$('.b-search-wrap__close').click( function() {
		$('.b-mobile-btn.js-search').removeClass('js-inactive');
		$('.l-container.search').removeClass('js-act');
	});

	$('.b-footer-list__button').click( function() {
		$(this).parents('.b-footer-list__category').siblings('').find('.b-footer-list__wrap').removeClass('js-act');
		$(this).parent('.b-footer-list__title-wrap').siblings('.b-footer-list__wrap').toggleClass('js-act');
	});


	$("[data-fancybox]").fancybox({
		loop:true,
	});


	load_products_sliders();

	if( $(window).width() < 980 ) {
		$('.b-goods-wrap-slider').owlCarousel( {
			dots:true,
			nav: true,
			navText: [],
			// onChanged: setPositionNav,
			responsive: {
				0 : {
					items: 1,
				},
				500 : {
					items: 2,
					margin: 20
				},
				800 : {
					items: 3,
					margin: 20
				}
			}
		});
	};


	$('.b-goods-slider').owlCarousel( {
		dots:true,
		nav: true,
		navText: [],
		loop: true,
		// onChanged: setPositionNav,
		responsive: {
			0 : {
				items: 1,
				slideBy: 1
			},
			500 : {
				items: 2,
				margin: 20,
				slideBy: 2
			},
			800 : {
				items: 3,
				margin: 20,
				slideBy: 3
			},
			1100 : {
				items: 4,
				margin: 20,
				slideBy: 4
			},
			1360 : {
				items: 5,
				margin: 30,
				slideBy: 5
			}
		}
	});

	$('.b-good-slider').owlCarousel({
		nav: true,
		navText: [],
		items: 1,
		responsive: {
			0 : {
				loop: true
			},
			992 : {
				loop: false
			}
		}
	});



	$('.b-main-slider').owlCarousel({
		dots:true,
		nav: true,
		loop: true,
		navText: [],
		items: 1
	});

	itemsEllipsizeText.each( function(index, element) {
		ellipsizeTextBox(element);
	});

	// newsTextWrapEllipsize.each( function(index, element) {
	// 	ellipsizeTextBox(element);
	// });

	// newsTitleEllipsize.each( function(index, element) {
	// 	ellipsizeTextBox(element);
	// });

	if ( $(window).width() > 992 ) {

		$('.b-reviews-slider').owlCarousel({
			dots:true,
			nav: true,
			navText: [],
			loop: true,
			margin: 35,
			responsive: {
				992 : {
					items: 2,
					slideBy: 2
				},
				1360 : {
					items: 3,
					slideBy: 3
				}
			}
		});

	};

	calcHeaderWidth();

    var $slider = $('.b-range');

    $slider.each( function() {
		var prefix = $(this).data('pref');
		var min_name = $(this).data('min_name');
		var max_name = $(this).data('max_name');
		var $min_input = $('#'+prefix+min_name);
        var $max_input = $('#'+prefix+max_name);

		var $sl = $(this);
		$sl.slider({
          range: true,
          min: $slider.data('min'),
          max: $slider.data('max'),
          step: $slider.data('step'),
          values: [ $slider.data('min-value'), $slider.data('max-value')],
          slide: function( event, ui ) {
            $min_input.val( ui.values[ 0 ] ),
            $max_input.val( ui.values[ 1 ] );
          }
        });

		$min_input.val( $sl.slider( "values", 0));
	    $max_input.val( $sl.slider( "values", 1));

		$min_input.change( function() {
	        $sl.slider( "values", 0, $(this).val() );
	    });

	    $max_input.change( function() {
	        $sl.slider( "values", 1, $(this).val() );
	    });
    });





});

function calcHeaderWidth() {
	$('.l-header.bottom').css({'width': $('.l-page').width() });
	$('.l-header.top .l-container').css({'width': $('.l-page').width() });
};



function load_products_sliders() {
	$('.b-product-item__img-slider').each( function(index, el) {
		if($(el).data('load') == 1)  return;

		if ( $(el).children('.b-product-item__item').length < 2 ) {
			return;
		};

		var id = $(el).parents('.b-product-item__link').siblings('.b-product-item__nav-container').attr('id');
		$(el).owlCarousel({
			nav: true,
			loop: true,
			navText: [],
			// loop: false,
			items: 1,
			navContainer: '#'+id,
			onResized: setPositionProductsNav,
			onInitialized: setPositionProductsNav
		});
		$(el).data('load', 1);
	});
	setTimeout( function () {
		setPositionProductsNav();
	}, 900)
};

var $mainSliderItem = $('.b-main-slider__item');
// calcSliderHeight();

$(window).on('resize', function() {
	itemsEllipsizeText.each( function(index, element) {
		ellipsizeTextBox(element);
	});

	calcHeaderWidth();

	promoItemHeight();

	// calcSliderHeight();

	// if( $(window).width() > 786 ) {
	// 	$mainSliderItem.css({'height' : '' });
	// } else {
	// 	$mainSliderItem.css({'height' : $(window).width() });
	// };

	// setPositionNav();
});

// function calcSliderHeight () {
// 	if( $(window).width() > 786 ) {
// 		$mainSliderItem.css({'height' : '' });
// 	} else {
// 		$mainSliderItem.css({'height' : $(window).width() });
// 	};
// }




var itemsEllipsizeText = $('.b-product-item__title');
var newsTextWrapEllipsize = $('.b-news__text-wrap');

checkMultiLables();

function checkMultiLables() {
	var productLabel = $('.b-product-labels');
	productLabel.each( function(index, el) {
		if( $(el).children('.b-product-labels__item').length > 1 ) {
			$(el).addClass('multy_banners');
		}
	});
};


$(window).on('load', function() {

	$('.b-vertical-slider.slick-slider').slick({
		slidesToShow: 5,
		slidesToScroll: 3,
		vertical: true,
		arrows: true,
		draggable: false,
		verticalSwiping: true,
		infinite: false
	});

	var $multy_banners = $('.multy_banners');
	if ($multy_banners.length) {
	    setInterval(function() {
	        $multy_banners.each(function(index, el) {
	            var $all = $(el).find('svg, img');
	            var $active = $(el).find('.active');
	            var $next = $active.next();
	            if (!$next.length) {
	                $next = $all.filter(':first');
	            }

	            var new_active_index = $all.index($next);

	            $all.not(':eq(' + new_active_index + ')').fadeOut(1000);
	            $all.eq(new_active_index).fadeIn(1000);

	            $all.removeClass('active');
	            $next.addClass('active');
	        });

	    }, 5000);
	};

	setPositionProductsNav();
	// setPositionNav();

	if( $(window).width() > 786 ) {
		$mainSliderItem.css({'height' : '' });
	} else {
		$mainSliderItem.css({'height' : $(window).width() });
	};

	promoItemHeight();

});


function promoItemHeight() {

	$('.b-promo-item').css({'height' : $('.b-promo-item').innerWidth() });

	// if( window.innerWidth > 993 ) {
	// 	$('.b-promo-item').css({'height' : $('.b-promo-item').innerWidth() });
	// } else if( window.innerWidth > 641) {
	// 	$('.b-promo-item').css({'height' : '40vw' });
	// } else {
	// 	$('.b-promo-item').css({'height' : '80vw' });
	// };
};


function setPositionProductsNav() {
	var productsNavContainers = $('.b-product-item__nav-container');

	var position = ( $('.b-product-item__img-slider').height() / 2);
	productsNavContainers.css({'top' : position });
};

// позиционирует стрелки по горизонтали

// function setPositionNav() {
// 	var position = ( $('.b-goods-wrap-slider').find('.b-product-item__img-slider').height() / 2);
// 	$('.b-goods-wrap-slider').find('.owl-nav').css({'top' : position });
// };


// обрезает текст который не влазит в контэйнер

function ellipsizeTextBox(el) {
    var wordArray = el.innerHTML.split(' ');
    while(el.scrollHeight > el.offsetHeight) {
        wordArray.pop();
        el.innerHTML = wordArray.join(' ') + '...';
     }
};

// end

$('.b-hidden-text__show').click( function() {
	$(this).siblings('.b-hidden-text__wrap').css({'overflow' : 'visible', 'max-height' : 'none'});
	$(this).remove();
});

$('.b-mobile-btn.mob-menu').click( function() {
	if( $('.l-mob-filter').hasClass('js-act') ) {

		$('.l-content-wrap').removeClass('js-open-menu');
		$('.l-header.bottom').removeClass('js-open-menu');
		$('.l-mob-filter').removeClass('js-act');

		setTimeout(function(){
			$('.l-content-wrap').toggleClass('js-open-menu');
			$('.l-mob-menu').toggleClass('js-act');
			$('.l-header.bottom').toggleClass('js-open-menu');

		}, 700);

		return;
	};

	$('.l-content-wrap').toggleClass('js-open-menu');
	$('.l-mob-menu').toggleClass('js-act');
	$('.l-header.bottom').toggleClass('js-open-menu');
});

// mob-nav action

$('.b-mob-nav__btn-toggle').click( function() {
	$(this).parents('.b-mob-nav__wrap').siblings('').children('.b-mob-nav__title-link').removeClass('js-act').end('').children('.b-mob-nav__dropdown').removeClass('js-act');
	$(this).siblings('.b-mob-nav__title-link').toggleClass('js-act').end('').siblings('.b-mob-nav__dropdown').toggleClass('js-act');
});

$('.b-mob-nav__inner-btn-toggle').click( function() {
	$(this).parents('.b-mob-nav__inner-wrap').siblings('').children('.b-mob-nav__inner-btn-toggle').removeClass('js-act');
	$(this).toggleClass('js-act');
});

// end

// mob-filter action

$('.b-btn-filters').click( function() {

	if ( $('.l-mob-menu').hasClass('js-act') ) {
		$('.l-content-wrap').removeClass('js-open-menu');
		$('.l-mob-menu').removeClass('js-act');
		$('.l-header.bottom').removeClass('js-open-menu');

	setTimeout(function(){
		$('.l-content-wrap').addClass('js-open-menu');
		$('.l-header.bottom').addClass('js-open-menu');
		$('.l-mob-filter').addClass('js-act');
	}, 700);

	return

	};

	$('.l-content-wrap').addClass('js-open-menu');
	$('.l-header.bottom').addClass('js-open-menu');
	$('.l-mob-filter').addClass('js-act');
});

$('.b-mobile-filter__close').click( function() {
	$('.l-content-wrap').removeClass('js-open-menu');
	$('.l-header.bottom').removeClass('js-open-menu');
	$('.l-mob-filter').removeClass('js-act');
});

//end

$('.b-link.js-show-list').click( function() {
	$(this).parent('').removeClass('js-hidden-list');
	$(this).remove('');
});

$('.b-vertical-slider__item').click( function() {
	$(this).siblings('').removeClass('js-act');
	$(this).addClass('js-act');
	$('.b-gallery-wrap__item').removeClass('js-act').eq( $(this).index() ).addClass('js-act');
});

$('.b-select-rating__item').mouseover( function() {
	$(this).siblings('').removeClass('act');
	$(this).addClass('act');
});

$('.b-select-rating__wrap').mouseout( function() {
	$(this).children('.b-select-rating__item').removeClass('act');
});

$('.b-select-rating__item').click( function() {
	$(this).siblings('').removeClass('js-act').end('').addClass('js-act');
	console.log($(this).data('raiting'));
	$('#raiting').val($(this).data('raiting'));
});

$('.b-btn-sort').click( function() {
	$(this).toggleClass('js-act');
	$('.b-dropdown-sorting').toggleClass('js-act');
});

$('.b-dropdown-sorting__item').click( function() {
	$(this).siblings('').removeClass('act').end('').addClass('act');
});

$('.b-desktop-filters__title').click( function() {
	$(this).parents('.b-desktop-filters__wrap').siblings('').children('.b-desktop-filters__title').removeClass('js-act').end('').children('.b-desktop-filters__dropdown').removeClass('js-act');
	$(this).toggleClass('js-act').siblings('.b-desktop-filters__dropdown').toggleClass('js-act');
});

$('.b-product-hide-wrap__row').click( function() {
	$(this).toggleClass('js-act');
	$(this).next('.b-product-hide-wrap__content').slideToggle();
});

$('.b-tabs__title-link').click( function() {
	if ( $(this).hasClass('js-act') ) {
		return;
	}

	$(this).siblings('').removeClass('js-act');
	$(this).parents('.b-tabs__title-wrap').siblings('.b-tabs__content-wrap').children('.b-tabs__content').siblings('').removeClass('js-act').eq( $(this).index() ).addClass('js-act');
	$(this).addClass('js-act');

	// var owl = $('.b-goods-slider');
	// owl.owlCarousel();

	// owl.on('initialized.owl.carousel', function() {
	// 	$(this).find('.b-product-item__title').each( function(index, element) {
	// 		ellipsizeTextBox(element);
	// 	});
	// });
});

// open hint on click

// $('.b-hint__icon').click( function() {
// 	if( $(this).hasClass('js-act') ) {
// 		$(this).removeClass('js-act');
// 		return;
// 	}
// 	$('.b-hint__icon').removeClass('js-act');
// 	$(this).toggleClass('js-act');
// });

$('.b-reviews__show-more').click( function() {
	$(this).siblings('.b-reviews__text-wrap').css({'height': 'auto'});
	$(this).remove();
});

$(document).mouseup(function (e){

	if ( $('.l-mob-menu').has(e.target).length === 0 && $('.b-mobile-btn').has(e.target).length === 0 && $('.l-mob-filter').has(e.target).length === 0 && $('.b-desktop-filters__wrap').has(e.target).length === 0 ) {

		$('.l-content-wrap').removeClass('js-open-menu');
		$('.l-mob-menu').removeClass('js-act');
		$('.l-header.bottom').removeClass('js-open-menu');
		$('.l-mob-filter').removeClass('js-act');
		$('.b-desktop-filters__dropdown').removeClass('js-act');

	};
});

// popup

$.fn.imPopup = function() {
    var $this, id;
    $this = this;
    id = '';
    $this.on('click', function(e) {

        e.preventDefault();
        id = $(this).data('id');
		var opened = $('.im-popup._visible');
		opened.removeClass('_visible');
        if (opened.length == 0 && $(id).length) {
            var offset = window.innerWidth - $(window).width();
            $('body').css({
                overflow: 'hidden',
                paddingRight: offset
            });
        };
        return $(".im-popups " + id).addClass('_visible');
    });
    $('.im-popup .b-popup__close').click(function(e) {
        return e.preventDefault();
    });
    return $('.im-popup').on('click', function(e) {
        if (!$(e.target).hasClass('im-popup-inside') && !$(e.target).parents('.im-popup-inside').length || $(e.target).hasClass('b-popup__close')) {
            var id = '#' + $(this).attr('id');
            if ($('.im-popup._visible').length == 1) {
                setTimeout(function() {
                    $('body').css({
                        overflow: '',
                        paddingRight: ''
                    });
                }, 300);
            }
            return $(".im-popups " + id).removeClass('_visible');
        }
    });
};

$('.im-popup-link').imPopup();

$.fn.isOnScreen = function(){
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};
