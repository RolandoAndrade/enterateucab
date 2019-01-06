class SwalModal
{
    constructor(title,text,type,showCancelButton, confirmButtonColor,
                cancelButtonColor, confirmButtonText, cancelButtonText, action)
    {
        this.title= title;
        this.text= text;
        this.type=type;
        this.showCancelButton= showCancelButton;
        this.confirmButtonColor= confirmButtonColor;
        this.cancelButtonColor= cancelButtonColor;
        this.confirmButtonText=confirmButtonText;
        this.cancelButtonText= cancelButtonText;
        this.action=action;
    }
    show()
    {
        swal({
		  	title: this.title,
		  	text: this.text,
		  	type: this.type,
		  	showCancelButton: this.showCancelButton,
		  	confirmButtonColor: this.confirmButtonColor,
		  	cancelButtonColor: this.cancelButtonColor,
		  	confirmButtonText: this.confirmButtonText,
		  	cancelButtonText: this.cancelButtonText
		}).then(this.action).catch(swal.noop);
    }
}

class ErrorDialog extends SwalModal
{
    constructor(message)
    {
        super("Error",message, "error", false,
        "#ffb64e","","Ok", "", null);
        this.show();
    }
}

class SuccessDialog extends SwalModal
{
    constructor(message)
    {
        super("Perfecto",message, "success", false,
        "#ffb64e","","Ok", "", null);
        this.show();
    }
}