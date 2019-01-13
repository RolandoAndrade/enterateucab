function startCalendar()
{
    for(let i=2;i<33;i++)
    {
        let s=".date"+i;
        let dat=$(s).children(".alpha");
        dat.append('<div class="events-of-day">'+'</div>');
        dat.append('<div class="calendar-date"><div class="date-day">'+(i-1)+'</div></div>');
    }
}
startCalendar();