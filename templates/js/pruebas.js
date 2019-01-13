async function prueba()
{
    $(".loading").show();
    let data=await new EventManager().getAll();

    $(".loading").hide();
    for(let i=0;i<data.length&&i<10;i++)
        new CardEvent(data[i],i);
}

prueba();