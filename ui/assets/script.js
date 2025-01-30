var tasks = []
var canWheel = true;
$(document).ready(function () {
    $(".envelope-container .seal").on("click", function () {
        $(".envelope-container").css({
            background: 'url("./assets/img/envelope2.png") center / 100% 100% no-repeat',
        });
        $(".envelope-container .seal").hide();
        $(".envelope-container .paper").show();
    })
    $(".envelope-container .paper").on("click", function () {
        $(".envelope-container").hide();
        $(".paper-container").show();
    })
    $(".paper-container .savebutton").on("click", function () {
        $(".paper-container").fadeOut(500)
        if ($('.paper-container #text').prop('disabled')) {
            $.post(`https://${GetParentResourceName()}/close`, JSON.stringify({}));
        } else {
            var message = $(".paper-container #text").val()
            var from = $(".paper-container #from").val()
            var to = $(".paper-container #to").val()
            $.post(`https://${GetParentResourceName()}/save`, JSON.stringify({ message: message, from: from, to: to }));
        }
    })

    $(".wheel-spinner-container .rose").on("click", function () {

        if (canWheel) {
            canWheel = false
            var audio = new Audio('./assets/sounds/spin.mp3')
            audio.currentTime = 0;
            audio.volume = 0.4;
            audio.play();
            $('.wheel-spinner-container .wheel-spinner').animate(
                {
                    deg: Math.floor(Math.random() * 6000) + 360
                },
                {
                    step: function (now, fx) {
                        $(this).css({
                            transform: 'translate(-50%,-50%) rotate(' + now + 'deg)'
                        });
                    },
                    duration: 3000,
                    complete: function () {
                        audio.pause();
                        audio.remove();
                        var task = tasks[Math.floor(Math.random() * tasks.length)];
                        $(".wheel-spinner-container .wheel-spinner").hide()
                        $(".wheel-spinner-container .rose").hide()
                        $(".wheel-spinner-container .question .task").html(task)
                        $(".wheel-spinner-container .question").fadeIn(500)
                        $.post(`https://${GetParentResourceName()}/showTask`, JSON.stringify({ task: task }));
                        setTimeout(() => {
                            $(".wheel-spinner-container .question").fadeOut(500)
                            $(".wheel-spinner-container .wheel-spinner").show()
                            $(".wheel-spinner-container .rose").show()
                            canWheel = true
                        }, 5000);
                    }
                }
            )
        }
    })
    $(document).keydown(function (event) {
        if (event.key === "Escape") {

            if (!$(".paper-container").is(':hidden')) {
                var message = $(".paper-container #text").val();
                var from = $(".paper-container #from").val();
                var to = $(".paper-container #to").val();
                if (!$('.paper-container #text').prop('disabled')){
                    $.post(`https://${GetParentResourceName()}/save`, JSON.stringify({ message: message, from: from, to: to }));
                }
            }

            $(".envelope-container").fadeOut(500)
            $(".paper-container").fadeOut(500)
            $(".wheel-spinner-container").fadeOut(500)
            $(".players").html("");
            $(".players").hide();
            $.post(`https://${GetParentResourceName()}/close`, JSON.stringify({}));
        }
    });

    $(".bscript").on("click", function () {
        window.invokeNative('openUrl', 'https://discord.com/invite/dxVJ2wxfc6')
    })
    window.addEventListener('message', function (event) {
        switch (event.data.action) {
            case "openPlayerPositions":
                $(".players").show();
                break;
            case "setPlayersPositions":
                var players = event.data.players;
                $(".players").html("")
                $(".player").off("click")

                players.forEach(element => {
                    $(".players").append(`<div class="player" style="top: ${element.y}%;left: ${element.x}%" data-uid="${element.value}">
                        <div class="box"><i class="fa-solid fa-user"></i></div>
                        <div class="text">
                            Player ID: ${element.value}
                        </div>
                    </div>`)
                });
                $(".player").on("click", function () {
                    var id = $(this).attr("data-uid")
                    $(".players").hide();
                    $.post(`https://${GetParentResourceName()}/selectPlayer`, JSON.stringify({ target: id }));
                })
                break;
            case "openWheel":
                tasks = event.data.tasks;
                $('.wheel-spinner-container .wheel-spinner').css({
                    transform: 'translate(-50%,-50%) rotate(0deg)'
                })
                $(".wheel-spinner-container .wheel-spinner").show()
                $(".wheel-spinner-container .rose").show()
                $(".wheel-spinner-container").slideDown(1000)
                break;
            case "openEnvelope":
                $(".paper-container #from").val(event.data.from)
                $(".paper-container #to").val(event.data.to)
                $(".paper-container #text").val(event.data.message)
                $(".paper-container #text").prop('disabled', event.data.disabled);
                $(".envelope-container").css({
                    background: 'url("./assets/img/envelope.png") center / 100% 100% no-repeat',
                });
                $(".envelope-container .seal").show();
                $(".envelope-container .paper").hide();
                $(".envelope-container").slideDown(1000)
                break;
            case "showTask":
                let task = event.data.task;
                $(".wheel-spinner-container .wheel-spinner").hide()
                $(".wheel-spinner-container .rose").hide()
                $(".wheel-spinner-container").show()
                $(".wheel-spinner-container .question .task").html(task)
                $(".wheel-spinner-container .question").fadeIn(500)
                setTimeout(() => {
                    $(".wheel-spinner-container .question").fadeOut(500)
                    canWheel = true
                }, 5000);
                break;
        }
    });
});