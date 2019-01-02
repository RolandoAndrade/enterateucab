from django.db import models
from django.contrib.auth import models as md


# Create your models here.


class User(md.AbstractUser):
    id = models.AutoField(primary_key = True)
    career = models.CharField(null = True, blank = True, max_length = 35)
    location = models.IntegerField(null = True, blank = True)
    image = models.TextField(null = True, blank = True)

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if not self.id:
            username = self.username
            username_exists = True
            counter = 1
            self.username = username
            while username_exists:
                try:
                    username_exists = User.objects.get(username = username)
                    if username_exists:
                        username = self.username + '_' + str(counter)
                        counter += 1
                except User.DoesNotExist:
                    self.username = username
                    break
        super(User, self).save(*args, **kwargs)


class Event(models.Model):
    id = models.AutoField(primary_key = True)
    author = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "author")
    date = models.DateTimeField(null = True, blank = True)
    attendance = models.ManyToManyField(User, related_name = "attendance")
    title = models.CharField(null = True, blank = True, max_length = 35)
    description = models.TextField(null = True, blank = True)
    cover = models.TextField(null = True, blank = True)
    media = models.TextField(null = True, blank = True)
    location = models.IntegerField(null = True, blank = True)
