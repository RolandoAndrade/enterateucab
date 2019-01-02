let dao=new AuthManager();
let b=new EventManager();
let c =new UserDAO();
async function fun()
{
    console.log(await dao.login("lore@gmail.com","12345678abc"));
    console.log(await dao.me());
    console.log(await b.getAll());
    console.log(await b.attendToEventWithID(3));
}
fun();