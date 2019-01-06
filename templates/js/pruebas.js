/*let dao=new AuthManager();
let b=new EventManager();
let c =new UserDAO();
async function fun()
{
    console.log(await dao.login("lore@gmail.com","12345678abc"));
    console.log(await dao.me());
    console.log(await b.getAll());
    console.log(await b.attendToEventWithID(3));
}
//fun();
*/

class CardEvent
{
    constructor(event, i)
    {
        i++;
        this.changeDay(event.date.getNameOfDay(),i);
        this.changeMonth(event.date.getNameOfMonth(),i);
        this.changeNumberDay(event.date.getDay(),i);
        this.changeTitle(event.title, i);
        this.changeCover(event.cover, i);
        this.onClickEvent(event, i);
    }
    changeDay(day, i)
    {
        $(".card"+i).find(".text-day.day").text(day);
    }
    changeMonth(month, i)
    {
        $(".card"+i).find(".text-day.month").text(month);
    }
    changeNumberDay(number,i)
    {
        $(".card"+i).find(".number-day").text(number);
    }

    changeTitle(title, i)
    {
        $(".card"+i).find(".title-event-card").text(title);
    }

    changeCover(cover, i)
    {
        $(".card"+i).find(".card").css("background-image", 'url('+cover+')');
    }
    onClickEvent(event, i)
    {
        $(".card"+i).click(function ()
        {
            window.location="events/"+event.id;
        });
    }
}
function navbar()
{
    let active=false;
    $(".button-menu").click(function ()
    {
        if($('.navbar').position().left<0)
        {
            $(".section-header.min").css("visibility","hidden");
            $(".dark-background").show();
            if(!active)
            {

                active=true;
                $('.navbar').animate({"left": '0%'}).promise().done(function ()
                {
                    active=false;
                });

            }
        }
        $("body").click
        (
          function(e)
          {
            if(e.target.className !== "navbar"&&!active)
            {
                $(".dark-background").hide();
                $(".navbar").active=true;
                $('.navbar').animate({"left": '-30%'}).promise().done(function ()
                {
                    active=false;
                });
                $(".section-header.min").css("visibility","visible");
            }
          }
        );
    });
}
$(document).ready(function ()
{
    navbar();
});




async function prueba()
{
    $(".loading").show();
    let data=await new EventManager().getAll();
    let user=await new AuthManager().me();
    $(".loading").hide();
    for(let i=0;i<data.length&&i<10;i++)
        new CardEvent(data[i],i);
    if(user.image&&user.image.includes("http"))
    {
        $(".profile-image-navbar").attr("src",user.image);
    }
}

prueba();