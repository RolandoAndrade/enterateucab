$(".input-box.email").focus(function ()
{
    $(".icon-login.email").css({"background": "white","color":"cyan"});
});

$(".input-box.email").focusout(function ()
{
    $(".icon-login.email").css({"background": "cyan","color":"white"});
});

function changeFocus()
{
    $(".input-box.pass").focus(function ()
    {
        $(".icon-login.lock").css({"background": "white","color":"cyan"});
    });

    $(".input-box.pass").focusout(function ()
    {
        $(".icon-login.lock").css({"background": "cyan","color":"white"});
    });
}

changeFocus();
$(".showme").click(function () {
    if($(".input-box.pass").attr("type")=="password")
        $('.input-box.pass').clone().attr('type','text').insertAfter('.input-box.pass').prev().remove();
    else
        $('.input-box.pass').clone().attr('type','password').insertAfter('.input-box.pass').prev().remove();
    changeFocus();
});