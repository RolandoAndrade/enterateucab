
function getEventID()
{
    let url = window.location.pathname;
    url=url.substr(url.lastIndexOf("/")+1,url.length);
    return url;
}

function changeAuthor(author)
{
    $(".name").text(author.firstName+" "+author.lastName);
    if(author.image.includes("http"))
    {
        $("#author-profile-image").attr("src",author.image);
    }
    $(".data-fast.name").text(author.firstName+" "+author.lastName);
    $(".data-fast.email").text(author.email);
}
function changeEventData(event)
{
    $(".event-image").css("background-image", "url('"+event.cover+"')");
    $(".data-stat.place").text(event.place!==null?event.place:"No fue especificado");
    $(".data-stat.date").text(event.date.getDateString());
    $(".data-stat.hour").text(event.date.getCompleteHour());
    $(".event-title").text(event.title);
    $(".description").html(event.description);
    $(".data-fast.attendance").text(event.attendance+" asistentes");
    $(".data-fast.location").text(event.getLocationName());
}
function editableButton()
{
    $(".button-edit").show();
    $(".button-edit").attr("href","../events/edit/"+getEventID());
}
async function retrieveEvent()
{
    $(".loading").show();
    const manager=new EventManager();
    const author=new AuthManager();
    const event=await manager.getEventByID(getEventID());
    let aut;
    if(event!=null)
    {
        aut=await author.other(event.author);
        changeAuthor(aut);
        changeEventData(event);
        const user = await author.me();
        if(user!=null)
        {
            if(user.email===aut.email)
            editableButton();
        }
    }

    $(".loading").hide();

}
retrieveEvent();

$(".assist").click(async function ()
{
     const manager=new EventManager();
     $(".loading").show();
     const ans= await manager.attendToEventWithID(getEventID());
     $(".loading").hide();
     if(ans==="Logrado")
     {
         new SuccessDialog("¡Vas a asistir al evento!");
     }
     else
     {
         new ErrorDialog("Algo salió muy mal, intenta de nuevo más tarde");
     }
});