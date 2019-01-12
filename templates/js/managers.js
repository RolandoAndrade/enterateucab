class MyDate
{
    constructor(date)
    {
        this.date=new Date(date);
    }
    getNameOfDay()
    {
        const d=["Domingo", "Lunes","Martes", "Miércoles", "Jueves","Viernes", "Sábado" ];
        return d[this.date.getDay()];
    }
    getNameOfMonth()
    {
        const d=["Enero","Febrero", "Marzo", "Abril","Mayo", "Junio", "Julio","Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return d[this.date.getUTCMonth()];
    }
    getDay()
    {
        return this.date.getDate();
    }

    getCompleteHour()
    {
        let s=" a.m.";
        let hour=this.date.getUTCHours();
        let minutes=""+this.date.getUTCMinutes();
        if(hour>12)
        {
            s=" p.m."
            hour-=12;
        }
        if(minutes.length===1)
        {
            minutes="0"+minutes;
        }
        return hour+":"+minutes+s;
    }

    getDateString()
    {
        return this.getNameOfDay()+" "+this.getDay()+" de "+this.getNameOfMonth();
    }
}

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
    constructor(id, author, date, attendance, title, description, cover, media, location, place)
    {
        this.id = id;
        this.author = author;
        this.date = date;
        this.attendance = attendance;
        this.title = title;
        this.description = description;
        this.cover = cover;
        this.media = media;
        this.location=location;
        this.place = place;
    }
    getLocationName()
    {
        switch (this.location)
        {
            case 1:
                return "Caracas";
            case 2:
                return "Los Teques";
            case 3:
                return "Puerto Ordaz";
            case 4:
                return "Coro"
        }
    }
}

class JSONparser
{
    parseUser(json)
    {
        if(json.email)
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
            json.description=json.description.replace(/\n/g, "<br />");
            let event= new Event(json.id?json.id:0,json.author,new MyDate(json.date),
                json.attendance?json.attendance.length:0,
                json.title, json.description, json.cover, json.media, json.location, json.place);
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

    async getUserByID(id)
    {
        const request=new GetRequest('../api/users/get/'+id);
        const response = await request.execute();
        return response;
    }

    async updateProfileImage(image)
    {
        const data ={
            image: image
        };
        const request = new PutRequest(data,'../api/users/image/me');
        return await request.execute();
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
            location: event.location,
            place: event.place
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

    async other(id)
    {
        const response = await this.dao.getUserByID(id);
        return new JSONparser().parseUser(response);
    }

    async updateProfileImage(url)
    {
        const response = await this.dao.updateProfileImage(url);
        return response.image;
    }
}

class EventManager
{
    constructor()
    {
        this.dao=new EventDAO();
    }

    async create(date, title, description, cover, media, location, place)
    {
        const event=new Event(0,0,date,0,title, description, cover, media, location, place);
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
        this.sort(r);
        return r;
    }

    sort(data)
    {
        for(let i=0;i<data.length;i++)
        {
            for(let j=i+1;j<data.length;j++) {
                if (data[i].date.date > data[j].date.date)
                {
                    let aux=data[i];
                    data[i]=data[j];
                    data[j]=aux;
                }
            }
        }
    }

    async attendToEventWithID(id)
    {
        return await this.dao.attendToEventWithID(id);
    }
}
