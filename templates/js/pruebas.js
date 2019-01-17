async function prueba()
{
    $(".loading").show();
    let data=await new EventManager().getAll();

    $(".loading").hide();
    let d=new Date();
    let a=0;
    for(let i=0;i<data.length&&a<10;i++)
    {
        if(data[i].date.date>=d)
        {
            new CardEvent(data[i],a++);
        }

    }

}

prueba();