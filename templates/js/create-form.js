let me;
let image;
async function getMe()
{
    me=await new AuthManager().me();
    if(me!=null)
    {
        $(".name").text(me.firstName+" "+me.lastName);
        if(me.image.includes("http"))
        {
            $("#author-profile-image").attr("src",me.image);
        }
    }
}
getMe();

let myWidget = cloudinary.createUploadWidget({
  cloudName: 'rolandoandrade',
  uploadPreset: 'rolando_andrade'}, (error, result) =>{
    if(result.event==="success")
    {
        image=result.info.url;
        $(".event-image").css("background-image", "url('"+image+"')");
    }

});
$(".text-upload").on("click", function () {
   myWidget.open();
});


$(".ready").click(async function ()
    {
        $("#date").css("border", "none");
        $("#place").css("border", "none");
        $("#hour").css("border", "none");
        $("#title").css("border", "none");
        if (!image)
        {
            new ErrorDialog("Falta una foto de portada");
            return;
        }
        if ($("#place").val().trim().length===0)
        {
            new ErrorDialog("Debes indicar el lugar donde se desarrollará el evento");
            return;
        }
        if ($("#date").val().trim().length===0)
        {
            new ErrorDialog("Selecciona una fecha");
            $("#date").css("border", "solid red");
            return;
        }
        if ($("#hour").val().trim().length===0)
        {
            new ErrorDialog("Debes indicar la hora del evento");
            $("#hour").css("border", "solid red");
            return;
        }
        if ($("#title").val().trim().length===0)
        {
            new ErrorDialog("Debes elegir un título para el evento");
            $("#title").css("border", "solid red");
            return;
        }
        if ($("#description").val().trim().length<20)
        {
            new ErrorDialog("Debes dar una buena descripción del evento.(Al menos 20 caracateres)");
            return;
        }

        let date=$("#date").val()+"T"+$("#hour").val()+":00Z";
        let rd=new Date(date);
        $(".loading").show();
        const response=await new EventManager().create(rd,$("#title").val(),$("#description").val(),image,"",me.location,$("#place").val());
        $(".loading").hide();
        if(response!=null)
        {
            new TimerDialog("Éxito", "Se ha creado el evento de manera exitosa", "success", 3000).show();
        }
        else
        {
            new ErrorDialog("Algo horrible ha ocurrido, intenta de nuevo más tarde");
        }
    }
);
