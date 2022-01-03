from django.db import models

# Create your models here.
class Image(models.Model):
    file = models.ImageField(upload_to='images')
    upload_time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.pk)