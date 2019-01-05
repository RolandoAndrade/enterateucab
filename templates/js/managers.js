class User
{
    constructor(email, password, firstName, lastName, career, location, image, attendance)
    {
        this.email=email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.career = career;
        this.location = location;
        this.image = image;
        this.attendance= attendance;
    }
}

class Event
{
    constructor(id, author, date, attendance, title, description, cover, media, location)
    {
        this.id = id;
        this.author = author;
        this.date = date;
        this.attendance = attendance;
        this.title = title;
        this.description = description;
        this.cover = cover;
        this.media = media;
        this.location = location;
    }
}

class JSONparser
{
    parseUser(json)
    {
        if(json.email&&json.first_name&&json.last_name&&
            json.career&&json.location&&json.image&&json.attendance)
        {
            let user= new User(json.email,"",json.first_name,
                json.last_name, json.career, json.location, json.image, json.attendance);
            return user;
        }
        return null;
    }

    parseEvent(json)
    {
        if(json.author&&json.date&&
            json.title&&json.description&&json.cover&&json.location)
        {
            let event= new Event(json.id?json.id:0,json.author,new Date(json.date),
                json.attendance?json.attendance.length:0,
                json.title, json.description, json.cover, json.media, json.location);
            return event;
        }
        return null;
    }
}

class UserDAO
{
    async login(user)
    {
        const data ={
            email: user.email,
            password: user.password,
        };
        const request = new PostRequest(data,'../api/users/login/');
        return await request.execute();
    }

    async logout()
    {
        const data ={
            nothing: ""
        };
        const request = new PostRequest(data,'api/users/logout/');
        return await request.execute();
    }

    async create(user)
    {
        const data ={
            email: user.email,
            password1: user.password,
            first_name: user.firstName,
            last_name: user.lastName,
            career: user.career,
            location: user.location,
            image: user.image
        };
        const request = new PostRequest(data,'../api/users/signup');
        return await request.execute();
    }

    async getUser()
    {
        const request=new GetRequest('../api/users/get/me');
        const response = await request.execute();
        return response;
    }
}

class EventDAO
{
    async create(event)
    {
        const data ={
            author: 1,
            date: event.date,
            title: event.title,
            description: event.description,
            cover: event.cover,
            media: event.media,
            location: event.location
        };
        const request = new PostRequest(data,'../api/events/create');
        return await request.execute();
    }

    async getEventByID(id)
    {
        const request=new GetRequest('../api/events/get/'+id);
        return await request.execute();
    }

    async getAll()
    {
        const request=new GetRequest('../api/events/getAll');
        return await request.execute();
    }

    async attendToEventWithID(id)
    {
        const data={};
        const request = new PutRequest(data,'../api/events/attend/'+id);
        return await request.execute();
    }
}

class AuthManager
{
    constructor()
    {
        this.dao = new UserDAO();
    }

    async login(email, password)
    {
        const user=new User(email, password);
        return await this.dao.login(user);
    }

    async signup(email, password, firsName, lastName, career, location, image)
    {
        const user=new User(email, password, firsName, lastName, career, location, image);
        return await this.dao.create(user);
    }

    async me()
    {
        const response = await this.dao.getUser();
        return new JSONparser().parseUser(response);
    }
}

class EventManager
{
    constructor()
    {
        this.dao=new EventDAO();
    }

    async create(date, title, description, cover, media, location)
    {
        const event=new Event(0,0,date,0,title, description, cover, media, location);
        const response= await this.dao.create(event);
        return new JSONparser().parseEvent(response);
    }

    async getEventByID(id)
    {
        const response= await this.dao.getEventByID(id);
        return new JSONparser().parseEvent(response);
    }

    async getAll()
    {
        const response= await this.dao.getAll();
        let r=[];
        const parser=new JSONparser();
        for(let i=0;i<response.length;i++)
        {
            r.push(parser.parseEvent(response[i]));
        }
        return r;
    }

    async attendToEventWithID(id)
    {
        return await this.dao.attendToEventWithID(id);
    }
}
