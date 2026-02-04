from django.db import models

class EquipmentData(models.Model):
    name = models.CharField(max_length=100)
    flowrate = models.FloatField()
    pressure = models.FloatField()
    temperature = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        # This ensures the 'Last 5 Uploads' requirement is met
        ordering = ['-timestamp']