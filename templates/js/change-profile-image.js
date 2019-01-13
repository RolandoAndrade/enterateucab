let myWidget = cloudinary.createUploadWidget({
  cloudName: 'rolandoandrade',
  uploadPreset: 'rolando_andrade'}, (error, result) =>{
    if(result.event==="success")
    {
        image=result.info.url;
        $(".profile-image-navbar").attr("src",image);
        new AuthManager().updateProfileImage(image);
    }

});

$(".profile-image-navbar").on("click", function () {
   myWidget.open();
});

async function changeProfileImage()
{
    let user=await new AuthManager().me();
    if(user!=null&&user.image&&user.image.includes("http"))
    {
        $(".profile-image-navbar").attr("src",user.image);
    }
}
changeProfileImage();