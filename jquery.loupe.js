/**
 * loupe - an image magnifier for jQuery
 * http://github.com/jdbartlett/loupe
 */
(function($) {
	$.fn.loupe = function(options) {
		if (!this.length) return this;
		options = $.extend({
			loupe: 'loupe',
			width: 200,
			height: 150
		}, options || {});

		this.each(function() {
			var $this = $(this), loupe = null, big = null, small = null,
			move = function(e) {
				var offset = small.offset(), smallWidth = small.width(), smallHeight = small.height();
				if (
					e.pageX > smallWidth + offset.left + 10 || e.pageX < offset.left - 10 ||
					e.pageY > smallHeight + offset.top + 10 || e.pageY < offset.top - 10
				) return loupe.hide();
				loupe.css({
					left:e.pageX - options.width/2,
					top:e.pageY - options.height/2
				})
				big.css({
					left: -(((e.pageX - offset.left) / smallWidth) * big.width() - options.width/2)|0,
					top: -(((e.pageY - offset.top) / smallHeight) * big.height() - options.height/2)|0
				});
			}

			$this.mouseenter(function(e) {
				if (!small) small = $this.is('img') ? $this : $this.find('img:first');
				loupe = (loupe || (loupe = $('<div></div>')
					.addClass(options.loupe)
					.css({
						width:options.width+'px', height:options.height+'px',
						position:'absolute', overflow:'hidden'
					})
					.append(big = $('<img src="' + $this.attr($this.is('img') ? 'src' : 'href') + '" />').css({position:'absolute'}))
					.mousemove(move)
					.appendTo('body')
				)).show();
				move(e);
			}).click(function() {
				return false;
			});
		});

		return this;
	}
})(jQuery);