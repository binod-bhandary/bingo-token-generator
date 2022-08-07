(function ($) {
    $.fn.extend({
        numAnim: function (options) {
            if (!this.length)
                return false;

            this.defaults = {
                endAt: 90,
                numClass: 'autogen-num',
                duration: 0.5, // seconds
                interval: 25 // ms
            };
            var settings = $.extend({}, this.defaults, options);

            var $num = $('<span/>', {
                'class': settings.numClass
            });

            return this.each(function () {
                var $this = $(this);

                // Wrap each number in a tag.
                var frag = document.createDocumentFragment(),
                    numLen = settings.endAt.toString().length;
                for (x = 0; x < numLen; x++) {
                    var rand_num = Math.floor(Math.random() * 10);
                    frag.appendChild($num.clone().text(rand_num)[0])
                }
                $this.empty().append(frag);

                var get_next_num = function (num) {
                    ++num;
                    if (num > 9) return 0;
                    return num;
                };

                // Iterate each number.
                $this.find('.' + settings.numClass).each(function () {
                    var $num = $(this),
                        num = parseInt($num.text());

                    var interval = setInterval(function () {
                        num = get_next_num(num);
                        $num.text(num);
                    }, settings.interval);

                    setTimeout(function () {
                        clearInterval(interval);
                    }, settings.duration * 1000 - settings.interval);
                });

                setTimeout(function () {
                    $this.text(settings.endAt.toString());
                    $("#num-" + settings.endAt).addClass("generated");
                    generated_numbers.push(settings.endAt);
                }, settings.duration * 1000);
            });
        }
    });
})(jQuery);

var generated_numbers = [];
var count = generated_numbers.length;
var inc = 1;

$(function () {

    document.getElementById("generated").innerHTML = "Generated: <b>" + (count) +"</b>";
    document.getElementById("remaining").innerHTML = "Remaining: <b>" + (90 - count)+"</b>";

    for (i = 1; i <= 90; i++) {
        $("<div />").addClass("num").html(i).attr("id", "num-" + i).appendTo("#grid-container");
    }

    var cw = $('.num').width();
    $('.num').css({
        'height': cw + 'px',
        'line-height': cw + 'px'
    });
});

function generateNum() {
    if (count == 90) {
        $('#housefull').dialog({
                dialogClass: "no-titlebar",
                resizable: false,
                draggable: false,
                width:'100%',
                modal: true,
                show: "blind",
                overlay: {
                    backgroundColor: '#fff',
                    opacity: 0.5
                },
            });
        return;
    }
    while (true) {
        var i = getRandomInt(1, 90);
            // if ($.inArray(i, generated_numbers) === -1) {
            // console.log(i,!generated_numbers.includes(i),inc++);
        if (!generated_numbers.includes(i)) {
            //$("#number").html(i);
            $("#number,#number-box").numAnim({
                endAt: i
            });

            //$("#num-" + i).addClass("generated");
            //generated_numbers.push(i);
            //setTimeout("generateNum()",200);


            count = (generated_numbers.length+1);
            $('#dialog').dialog({
                dialogClass: "no-titlebar",
                resizable: false,
                draggable: false,
                modal: true,
                show: "blind",
                overlay: {
                   backgroundColor: '#ccc',
                   opacity: 0.7
                },
                open : function(eve, ui) {
                   window.setTimeout(function(item) {
                     $('#dialog').dialog('close');
                     }, 
                   5000);
                 }
           });

            // var gn = generated_numbers.length +1
            document.getElementById("generated").innerHTML = "Generated: <b>" + (count) +"</b>";
            document.getElementById("remaining").innerHTML = "Remaining: <b>" + (90 - count)+"</b>";
            
           setTimeout(function () {
            var recentList =  $("<li />").html(i).prependTo("#lastnumber");
            $('#lastnumber li.active').removeClass('active');
            $('#lastnumber li.actives').removeClass('actives');
            recentList.addClass('active');
            $( "ul#lastnumber li:nth-child(2)" ).addClass('actives');
         }, 600);

            break;
        }
    }
}

function getRandomInt(min, max,gnNum) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}