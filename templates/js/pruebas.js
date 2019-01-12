async function prueba()
{
    $(".loading").show();
    let data=await new EventManager().getAll();
    let user=await new AuthManager().me();
    $(".loading").hide();
    for(let i=0;i<data.length&&i<10;i++)
        new CardEvent(data[i],i);
    if(user!=null&&user.image&&user.image.includes("http"))
    {
        $(".profile-image-navbar").attr("src",user.image);
    }
}

prueba();