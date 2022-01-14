from django.db import models

# Create your models here.


class Todo(models.Model):
    id = models.AutoField(db_column='Id', primary_key=True)
    todo = models.JSONField(db_column='todo')
