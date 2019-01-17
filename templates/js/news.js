async function generateCards()
{
    $(".loading").show();
    let data=await new NewsManager().getAll();
    $(".loading").hide();
    for(let i=0;i<data.length&&i<10;i++)
        new CardNews(data[i],i);
}

generateCards();