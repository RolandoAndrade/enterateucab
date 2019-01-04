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


function getNameOfDay(date)
{
    const d=["Domingo", "Lunes","Martes", "Miércoles", "Jueves","Viernes", "Sábado" ];
    return d[date.getDay()];
}
function getNameOfMonth(date)
{
    const d=["Enero","Febrero", "Marzo", "Abril","Mayo", "Junio", "Julio","Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return d[date.getMonth()];
}
class CardEvent
{
    constructor(event, i)
    {
        i++;
        this.changeDay(getNameOfDay(event.date),i);
        this.changeMonth(getNameOfMonth(event.date),i);
        this.changeNumberDay(event.date.getDate(),i);
        this.changeTitle(event.title, i);
        this.changeCover(event.cover, i);
        console.log(event.cover);
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
}
function navbar()
{
    let active=false;
    $(".button-menu").click(function ()
    {
        if($('.navbar').position().left<0)
        {
            if(!active)
            {
                active=true;
                $('.navbar').animate({"left": '0%'}).promise().done(function ()
                {
                    active=false;
                });
                $("header")
            }
        }
        else
        {
            if(!active)
            {
                active=true;
                $('.navbar').animate({"left": '-30%'}).promise().done(function ()
                {
                    active=false;
                });
            }
        }
    });
}
$(document).ready(function ()
{
    navbar();
});



function prueba()
{
    let date=new Date("2019-01-05T10:10:00");
    console.log(date);
    let event=new Event(1, 1, date, 1, "Maratón de programación", "", "https://www.coalitionagency.com/wp-content/uploads/Coalition-Event-Background.jpg", "", "");
    new CardEvent(event,0);
}

prueba();