$(function () {
    var ANIM_DURATION = 0,
        ANIM_TIMEOUT = 200;
    $('button#chatbotTrigger').unbind()
        .on('click', function () {
            $button = $(this);
            setTimeout(function () {
                $frame = $('iframe.chatbot');
                $frame.toggleClass('active');
                $frame.contents()
                    .find('a#closeChatbot').unbind()
                    .on('click', function () {
                        $frame.removeClass('active');
                    });
            }, ANIM_TIMEOUT);
        });
});