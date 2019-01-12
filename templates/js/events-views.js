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
                $('.navbar').animate({"left": -$('.navbar').width()+"px"}).promise().done(function ()
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