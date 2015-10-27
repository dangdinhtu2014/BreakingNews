! function() {
	$.fn.breakingNews = function(l) {
		var n = {
				width: "100%",
				modul: "breakingnews",
				color: "default",
				border: !1,
				effect: "fade",
				fontstyle: "normal",
				autoplay: !1,
				timer: 4e3,
				feed: !1,
				feedlabels: !1,
				feedcount: 5
			},
			e = [],
			d = [],
			l = $.extend(n, l);
		return this.each(function() {
			function n() {
				l.modul.width() < 480 ? (l.modul.find(".bn-title h2").css({
					display: "none"
				}), l.modul.find(".bn-title").css({
					width: 10
				}), l.modul.find("ul").css({
					left: 30
				})) : (l.modul.find(".bn-title h2").css({
					display: "inline-block"
				}), l.modul.find(".bn-title").css({
					width: "auto"
				}), l.modul.find("ul").css({
					left: $(l.modul).find(".bn-title").width() + 30
				}))
			}

			function i() {
				u++, u == s && (u = 0), o()
			}

			function o() {
				"fade" == l.effect ? (l.modul.find("ul li").css({
					display: "none"
				}), l.modul.find("ul li").eq(u).fadeIn("normal", function() {
					c = !0
				})) : "slide-h" == l.effect ? l.modul.find("ul li").eq(f).animate({
					width: 0
				}, function() {
					$(this).css({
						display: "none",
						width: "100%"
					}), l.modul.find("ul li").eq(u).css({
						width: 0,
						display: "block"
					}), l.modul.find("ul li").eq(u).animate({
						width: "100%"
					}, function() {
						c = !0, f = u
					})
				}) : "slide-v" == l.effect && (u >= f ? (l.modul.find("ul li").eq(f).animate({
					top: -60
				}), l.modul.find("ul li").eq(u).css({
					top: 60,
					display: "block"
				}), l.modul.find("ul li").eq(u).animate({
					top: 0
				}, function() {
					f = u, c = !0
				})) : (l.modul.find("ul li").eq(f).animate({
					top: 60
				}), l.modul.find("ul li").eq(u).css({
					top: -60,
					display: "block"
				}), l.modul.find("ul li").eq(u).animate({
					top: 0
				}, function() {
					f = u, c = !0
				})))
			}

			function t() {
				for (e = l.feed.split(","), d = l.feedlabels.split(","), s = 0, l.modul.find("ul").html(""), xx = 0, k = 0; k < e.length; k++) $.ajax({
					type: "GET",
					url: document.location.protocol + "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + l.feedcount + "&callback=?&q=" + encodeURIComponent(e[k].trim()),
					dataType: "json",
					success: function(n) {
						feeddata = n.responseData.feed.entries, $(feeddata).each(function(n) {
							s++, l.modul.find("ul").append('<li><a target="_blank" href="' + feeddata[n].link + '"><span>' + d[xx] + "</span> - " + feeddata[n].title + "</a></li>")
						}), 0 == xx && l.modul.find("ul li").eq(0).fadeIn(), xx++
					},
					error: function() {
						l.modul.find("ul").append("RSS Feed Error!")
					}
				})
			}
			l.modul = $("#" + $(this).attr("id"));
			var a = l.modul,
				u = 0,
				f = 0,
				s = l.modul.find("ul li").length,
				c = !0;
			0 != l.feed ? t() : l.modul.find("ul li").eq(u).fadeIn(), n(), l.autoplay ? (a = setInterval(function() {
				i()
			}, l.timer), $(l.modul).on("mouseenter", function() {
				clearInterval(a)
			}), $(l.modul).on("mouseleave", function() {
				a = setInterval(function() {
					i()
				}, l.timer)
			})) : clearInterval(a), l.border || l.modul.addClass("bn-bordernone"), "italic" == l.fontstyle && l.modul.addClass("bn-italic"), "bold" == l.fontstyle && l.modul.addClass("bn-bold"), "bold-italic" == l.fontstyle && l.modul.addClass("bn-bold bn-italic"), l.modul.addClass("bn-" + l.color), $(window).on("resize", function() {
				n()
			}), l.modul.find(".bn-navi span").on("click", function() {
				c && (c = !1, 0 == $(this).index() ? (u--, 0 > u && (u = s - 1), o()) : (u++, u == s && (u = 0), o()))
			})
		})
	}
}(jQuery);