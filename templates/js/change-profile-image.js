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