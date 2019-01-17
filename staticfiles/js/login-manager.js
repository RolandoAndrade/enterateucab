function addFocusEvent(item,icon)
{
    item.focus(function () {
        icon.css({"background": "white", "color": "cyan"});
        item.css({"border-color": "cyan"});
    });
    item.focusout(function ()
    {
        icon.css({"background": "cyan","color":"white"});
    });
}

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
function startEvents()
{
    addFocusEvent($(".input-box.email"),$(".icon-login.email"));
    changeFocus();
    addFocusEvent($(".input-box.name"),$(".icon-login.name"));
    addFocusEvent($(".input-box.surname"),$(".icon-login.surname"));
    addFocusEvent($(".select-form.career"),$(".icon-login.career"));
    addFocusEvent($(".select-form.location"),$(".icon-login.location"));
}

startEvents();

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
    $(".loading").show();
    const user=await manager.login($(".input-box.email").val(),$(".input-box.pass").val());
    $(".loading").hide();
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

$(".input-button.signup").click(async function ()
{
    const v=new Validator();
    if($(".input-box.name").val().trim().length<1)
    {
        new ErrorDialog("¿De verdad te llamas así?");
        $(".icon-login.name").css({"background": "#ff3f41"});
        $(".input-box.name").css("border-color", "#ff3f41");
        return;
    }
    if($(".input-box.surname").val().trim().length<1)
    {
        new ErrorDialog("Con ese apellido seguro tendrás problemas legales");
        $(".icon-login.name").css({"background": "#ff3f41"});
        $(".input-box.name").css("border-color", "#ff3f41");
        return;
    }
    if(!v.validateEmail($(".input-box.email").val()))
    {
        new ErrorDialog("Correo incorrecto. Recuerda que debe ser un correo UCAB");
        $(".icon-login.email").css({"background": "#ff3f41"});
        $(".input-box.email").css("border-color", "#ff3f41");
        return;
    }
    if(!v.validatePassword($(".input-box.pass").val()))
    {
        new ErrorDialog("No es una buena contraseña. Por tu seguridad estudiantil, tu contraseña debe tener al menos una mayúscula, una minúscula y un número");
        $(".icon-login.lock").css({"background": "#ff3f41"});
        $(".input-box.pass").css("border-color", "#ff3f41");
        return;
    }
    const manager=new AuthManager();
    $(".loading").show();
    const user=await manager.signup($(".input-box.email").val(),$(".input-box.pass").val(),$(".input-box.name").val(),$(".input-box.surname").val(),$(".select-form.career")[0].options[$(".select-form.career")[0].selectedIndex].text,$(".select-form.location").val(),"");
    $(".loading").hide();

    if(!user.key)
    {
        new ErrorDialog("Un usuario ya tiene esta cuenta de correo registrada");
        $(".input-box").css("border-color", "#ff3f41");
        $(".icon-login.email").css({"background": "#ff3f41"});
        $(".icon-login.lock").css({"background": "#ff3f41"});
    }
    else
    {
        window.location="../";
    }

});