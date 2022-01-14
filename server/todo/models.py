from django.db import models

# Create your models here.


class Todo(models.Model):
    id = models.AutoField(db_column='Id', primary_key=True)
    value = models.CharField(db_column='value', max_length=100)
    complete = models.BooleanField(db_column='complete', default=False)
