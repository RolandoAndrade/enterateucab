$(".input-box.email").focus(function ()
{
    $(".icon-login.email").css({"background": "white","color":"cyan"});
    $(".input-box.email").css({"border-color":"cyan"});
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
        $(".input-box.pass").css({"border-color":"cyan"});
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

$(".input-button.login").click(async function ()
{
    const manager=new AuthManager();
    const user=await manager.login($(".input-box.email").val(),$(".input-box.pass").val());
    if(!user.key)
    {
        new SwalModal("Error","Usuario o contraseña incorrectos", "error", false,
        "#ffb64e","","Ok", "", null).show();

        $(".input-box").css("border-color", "#ff3f41");
        $(".icon-login.email").css({"background": "#ff3f41"});
        $(".icon-login.lock").css({"background": "#ff3f41"});
    }
    else
    {
        window.location="../";
    }

});