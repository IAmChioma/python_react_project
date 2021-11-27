from django.db import models
from django.contrib.postgres.fields import ArrayField
# from .enums import AccountStatus

    
# class Account(models.Model):
#     balance = models.FloatField()
#     status = models.CharField(max_length=100, choices=AccountStatus.CHOICES, default=AccountStatus.PENDING)
#
#     def __str__(self):
#         return f'{self.balance}'


class Prefix(models.Model):
    prefix = ArrayField(models.CharField(max_length=200))
    content = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f'{self.content}'
