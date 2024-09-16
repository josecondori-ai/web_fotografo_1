
;(function(window) {

	'use strict';

	
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}
	
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	function MLSlideshow(el, options) {
		this.el = el;
		
		this.options = extend( {}, this.options );
		extend( this.options, options );

		
		this.slides = [].slice.call(this.el.querySelectorAll('.slide'));
		
		this.slidesTotal = this.slides.length;
		if( this.slidesTotal <= 1 ) return;
		
		this.current = this.options.startIdx || 0;
		
		this.dimentions = {width : this.el.offsetWidth, height : this.el.offsetHeight};
		
		this._init();
	}

	
	MLSlideshow.prototype.options = {
	
		startIdx : 0,
		
		layoutConfig : {
			layout1 : {
				out : {
					translateX : {
						next: '-100%', 
						prev: '100%'
					},
					rotateZ : {
						next: function(el, index) {
							return anime.random(-15, 0);
						}, 
						prev: function(el, index) {
							return anime.random(0, 15);
						}
					},
					opacity : 0,
					duration: 1200,
					easing : 'easeOutQuint',
					itemsDelay : 80
				},
				in : {
					resetProps : {
						translateX : {
							next: '100%', 
							prev: '-100%'
						},
						rotateZ : {
							next: function(el, index) {
								return anime.random(0, 15);
							}, 
							prev: function(el, index) {
								return anime.random(-15, 0);
							}
						},
						opacity : 0,
					},
					translateX : '0%',
					rotateZ : 0,
					opacity : 1,
					duration: 700,
					easing : 'easeOutQuint',
					itemsDelay : 80
				}
			},
			layout2 : {
				out : {
					translateX : {
						next: function(el, index) {
							return anime.random(-50, 50) + '%';
						}, 
						prev: function(el, index) {
							return anime.random(-50, 50) + '%';
						}
					},
					translateY : {
						next: function(el, index) {
							return anime.random(-50, 50) + '%';
						}, 
						prev: function(el, index) {
							return anime.random(-50, 50) + '%';
						}
					},
					opacity : 0,
					duration: 1200,
					easing : 'easeOutQuint',
					itemsDelay : 10
				},
				in : {
					resetProps : {
						translateX : {
							next: '100%', 
							prev: '-100%'
						},
						rotateZ : {
							next: function(el, index) {
								return anime.random(0, 90);
							}, 
							prev: function(el, index) {
								return anime.random(-90, 0);
							}
						},
						opacity : 0,
					},
					translateX : '0%',
					rotateZ : 0,
					opacity : 1,
					duration: 900,
					easing : 'easeOutExpo',
					itemsDelay : 30
				}
			},
			layout3 : {
				out : {
					translateX : '-10%',
					rotateZ : 0,
					opacity : 0,
					duration: 500,
					easing : 'easeOutExpo',
					itemsDelay : 0
				},
				in : {
					resetProps : {
						translateX : '-10%',
						rotateZ : 0,
						opacity : 0
					},
					translateX : 0,
					opacity : 1,
					rotateZ : {
						next: function(el, index) {
							return index*6;
						}, 
						prev: function(el, index) {
							return index*6;
						}
					},
					duration: 1200,
					easing : 'easeOutElastic',
					itemsDelay : 0
				}
			},
			layout4 : {
				out : {
					translateY : {
						next: '60%',
						prev: '-60%'
					},
					opacity : 0,
					duration: 700,
					easing : 'easeOutQuint',
					itemsDelay : 50
				},
				in : {
					resetProps : {
						translateY : {
							next: '-60%',
							prev: '60%'
						},
						opacity : 0,
					},
					translateY : '0%',
					opacity : 1,
					duration: 700,
					easing : 'easeOutQuint',
					itemsDelay : 50,
					delay : 250
				}
			},
			layout5 : {
				out : {
					scale : 0.5,
					opacity : 0,
					duration: 500,
					easing : 'easeOutExpo',
					itemsDelay : 20
				},
				in : {
					resetProps : {
						scale : 0.5,
						opacity : 0
					},
					opacity : 1,
					scale : 1,
					duration: 500,
					easing : 'easeOutExpo',
					itemsDelay : 20,
					delay: 300
				}
			},
			layout6 : {
				out : {
					scale : 0.5,
					opacity : 0,
					duration: 300,
					easing : 'easeInBack',
					itemsDelay : 20
				},
				in : {
					resetProps : {
						scale : 0.5,
						opacity : 0
					},
					opacity : 1,
					scale : 1,
					duration : 1000,
					easing : 'easeOutElastic',
					itemsDelay : 50,
					delay : 400
				}
			},
			layout7 : {
				out : {
					translateX : {
						next: '-100%', 
						prev: '100%'
					},
					opacity : 0,
					duration: 1200,
					easing : 'easeOutQuint',
					itemsDelay : 40
				},
				in : {
					resetProps : {
						translateX : {
							next: '100%', 
							prev: '-100%'
						},
						rotateZ : {
							next: function(el, index) {
								return anime.random(0, 25);
							}, 
							prev: function(el, index) {
								return anime.random(-25, 0);
							}
						},
						opacity : 0,
					},
					translateX : '0%',
					rotateZ : 0,
					opacity : 1,
					duration: 700,
					easing : 'easeOutQuint',
					itemsDelay : 40,
					delay : 250 
				}
			}
		}
	};

	
	MLSlideshow.prototype._init = function() {
		var self = this,
			onPreload = function() {
				self.el.classList.add('slideshow--loaded');
				
				self.slides[self.current].classList.add('slide--current');
			};

		
		this._preload(onPreload);
	
		this._initEvents();
	};

	
	MLSlideshow.prototype._initEvents = function() {
		var self = this;
		
		
		this.debounceResize = debounce(function(ev) {
			
			self.dimentions = {width : self.el.offsetWidth, height : self.el.offsetHeight};
		}, 10);

		
		this.keyboardFn = function(ev) {
			var keyCode = ev.keyCode || ev.which;
			switch (keyCode) {
				case 37:
					self._navigate('prev');
					break;
				case 39:
					self._navigate('next');
					break;
			}
		};

		window.addEventListener('resize', this.debounceResize);
		this.el.addEventListener('keydown', this.keyboardFn);
	};

	
	MLSlideshow.prototype._preload = function(callback) {
		imagesLoaded(this.el, {background: true}, function() {
			if( typeof callback === 'function' ) { callback(); }
		});
	};

	
	MLSlideshow.prototype._navigate = function(direction) {
		if( this.isAnimating ) {
			return false;
		}
		this.isAnimating = true;

		var self = this,
		
			currentSlide = this.slides[this.current],
			
			currentLayout = currentSlide.getAttribute('data-layout') || 'layout1',
			currentTitle = currentSlide.querySelector('.slide__title');

		if( direction === 'next' ) {
			this.current = this.current < this.slidesTotal - 1 ? this.current + 1 : 0;
		}
		else {
			this.current = this.current > 0 ? this.current - 1 : this.slidesTotal - 1;
		}

		var nextSlide = this.slides[this.current],
			nextLayout = nextSlide.getAttribute('data-layout'),
			nextTitle = nextSlide.querySelector('.slide__title');

		
		var animateIn = function() {
			clearTimeout(self.navtime);

			var inItems = [].slice.call(nextSlide.querySelectorAll('.slide-imgwrap .slide__img-inner')),
				inconfig = self.options.layoutConfig[nextLayout] !== undefined ? self.options.layoutConfig[nextLayout].in : self.options.layoutConfig['layout1'].in,
				inresetconfig = inconfig.resetProps,
				animeInProps = {
					targets: inItems,
					duration: inconfig.duration,
					easing: inconfig.easing,
					delay: function(el, index) {
						return direction === 'next' ? index * inconfig.itemsDelay : (inItems.length - 1 - index) * inconfig.itemsDelay;
					},
					complete: function() {
						self.isAnimating = false;
					}
				};

			
			self._setAnimationProperties(animeInProps, inconfig, direction);
			
			inItems.forEach(function(item, pos) {
				var transformStr = '';
				if( inresetconfig.translateX !== undefined ) {
					var tx = typeof inresetconfig.translateX === 'object' ? function() {
						return typeof inresetconfig.translateX[direction] === 'function' ? self._getValuePercentage(inresetconfig.translateX[direction](item, pos), 'width') : self._getValuePercentage(inresetconfig.translateX[direction], 'width');
					} : self._getValuePercentage(inresetconfig.translateX, 'width');
					
					transformStr += ' translateX(' + (typeof tx === 'function' ? tx() : tx) + 'px)';
				}
				if( inresetconfig.translateY !== undefined ) {
					var ty = typeof inresetconfig.translateY === 'object' ? function() {
						return typeof inresetconfig.translateY[direction] === 'function' ? self._getValuePercentage(inresetconfig.translateY[direction](item, pos), 'height') : self._getValuePercentage(inresetconfig.translateY[direction], 'height');
					} : self._getValuePercentage(inresetconfig.translateY, 'height');
					transformStr += ' translateY(' + (typeof ty === 'function' ? ty() : ty) + 'px)';
				}
				if( inresetconfig.rotateZ !== undefined ) {
					var rot = typeof inresetconfig.rotateZ === 'object' ? function() {
						return typeof inresetconfig.rotateZ[direction] === 'function' ? inresetconfig.rotateZ[direction](item, pos) : inresetconfig.rotateZ[direction];
					} : inresetconfig.rotateZ;
					
					transformStr += ' rotateZ(' + (typeof rot === 'function' ? rot() : rot) + 'deg)';
				}
				if( inresetconfig.scale !== undefined ) {
					var s = typeof inresetconfig.scale === 'object' ? function() {
						return typeof inresetconfig.scale[direction] === 'function' ? inresetconfig.scale[direction](item, pos) : inresetconfig.scale[direction];
					} : inresetconfig.scale;
					
					transformStr += ' scale(' + (typeof s === 'function' ? s() : s) + ')';
				}
				if( transformStr !== '' ) {
					item.style.transform = item.style.WebkitTransform = transformStr;
				}
				if( inresetconfig.opacity !== undefined ) {
					item.style.opacity = inresetconfig.opacity;
				}
			});
		
			nextTitle.style.opacity = 0;
			
			nextSlide.classList.add('slide--current');
		
			anime(animeInProps);
			
			self._animateTitle(nextTitle, 'in');
		};

	
		var outItems = [].slice.call(currentSlide.querySelectorAll('.slide-imgwrap .slide__img-inner')),
			outconfig = this.options.layoutConfig[currentLayout] !== undefined ? this.options.layoutConfig[currentLayout].out : this.options.layoutConfig['layout1'].out,
			animeOutProps = {
				targets: outItems,
				duration: outconfig.duration,
				easing : outconfig.easing,
				delay: function(el, index) {
					return direction === 'next' ? index * outconfig.itemsDelay : (outItems.length - 1 - index) * outconfig.itemsDelay;
				},
				complete: function() {
					currentSlide.classList.remove('slide--current');
				}
			};

	
		this._setAnimationProperties(animeOutProps, outconfig, direction);
		
		anime(animeOutProps);
		
		this._animateTitle(currentTitle, 'out');
		
		clearTimeout(this.navtime);
		this.navtime = setTimeout(animateIn, this.options.layoutConfig[nextLayout] !== undefined && this.options.layoutConfig[nextLayout].in.delay !== undefined ? this.options.layoutConfig[nextLayout].in.delay : 150 );
	};


	MLSlideshow.prototype._setAnimationProperties = function(props, config, direction) {
		var self = this;
		if( config.translateX !== undefined ) {
			props.translateX = typeof config.translateX === 'object' ? function(el, index) {
				return typeof config.translateX[direction] === 'function' ? self._getValuePercentage(config.translateX[direction](el, index), 'width') : self._getValuePercentage(config.translateX[direction], 'width');
			} : this._getValuePercentage(config.translateX, 'width');
		}
		if( config.translateY !== undefined ) {
			props.translateY = typeof config.translateY === 'object' ? function(el, index) {
				return typeof config.translateY[direction] === 'function' ? self._getValuePercentage(config.translateY[direction](el, index), 'width') : self._getValuePercentage(config.translateY[direction], 'height');
			} : this._getValuePercentage(config.translateY, 'height');
		}
		if( config.rotateZ !== undefined ) {
			props.rotateZ = typeof config.rotateZ === 'object' ? function(el, index) {
				return typeof config.rotateZ[direction] === 'function' ? config.rotateZ[direction](el, index) : config.rotateZ[direction];
			} : config.rotateZ;
		}
		if( config.scale !== undefined ) {
			props.scale = typeof config.scale === 'object' ? function(el, index) {
				return typeof config.scale[direction] === 'function' ? config.scale[direction](el, index) : config.scale[direction];
			} : config.scale;
		}
		if( config.opacity !== undefined ) {
			props.opacity = config.opacity;
		}
	};

	
	MLSlideshow.prototype._animateTitle = function(titleEl, dir) {
		anime({
			targets: titleEl,
			opacity: dir === 'out' ? 0 : 1,
			duration: dir === 'out' ? 200 : 500,
			easing: 'easeOutExpo'
		});
	};

	
	MLSlideshow.prototype.next = function() {
		this._navigate('next');
	};

	
	MLSlideshow.prototype.prev = function() {
		this._navigate('prev');
	};

	
	MLSlideshow.prototype._getValuePercentage = function(str, axis) {
		return typeof str === 'string' && str.indexOf('%') !== -1 ? parseFloat(str)/100*this.dimentions[axis] : str;
	};

	window.MLSlideshow = MLSlideshow;

})(window);