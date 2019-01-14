function removeAllEventsOutsideMonth(month, events)
{
    let i=0;
    while (i<events.length)
    {
        if(events[i].date.getNameOfMonth()!==month)
        {
            events.splice(i,1);
        }
        else
        {
            i++;
        }
    }
    return events;
}
function getAllEventsOfDay(day, events)
{
    let r=[];
    for(let i=0;i<events.length;i++)
    {
        if(events[i].date.getDay()===day)
            r.push(events[i]);
    }
    return r;
}
function goToEvent(id)
{
    window.location="../events/"+id;

}
function writeListOfEvents(events)
{
    const colors=["cyan","green", "yellow",  "red"];
    if (events.length===0)
        return '<div class="event-of-day"> No hay eventos programados para este día</div>';
    let s="";
    for(let i=0;i<events.length;i++)
    {
        s+='<div class="event-of-day '+colors[i%4]+'" onclick="goToEvent('+events[i].id+')">'+events[i].title+'</div>';
    }
    return s;

}

async function startCalendar()
{
    $(".loading").show();
    let events=await new EventManager().getAll();
    $(".loading").hide();
    events=removeAllEventsOutsideMonth("Enero",events);
    for(let i=2;i<33;i++)
    {
        let s=".date"+i;
        let eod=getAllEventsOfDay(i-1, events);
        let dat=$(s).children(".alpha");

        if(eod.length>0)
        {
            $(s).css("background-image","url('"+eod[0].cover+"'");
        }
        const eventList=writeListOfEvents(eod);
        dat.append('<div class="events-of-day">'+eventList+'</div>');
        dat.append('<div class="calendar-date"><div class="date-day">'+(i-1)+'</div></div>');
    }
}
startCalendar();