from django.db import models
from users.models import User

MEMBER_ROLE = [
    ("plr", "Player"),
    ("dm", "DM"),
    ("obs", "Observer"),
]

# Create your models here.
class Party(models.Model):
    name = models.CharField(max_length=256)


class PartyMember(models.Model):
    name = models.CharField(max_length=256)
    type = models.CharField(max_length=3, choices=MEMBER_ROLE, default="plr")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="party_characters")
    party = models.ForeignKey(Party, on_delete=models.CASCADE, related_name="party_members")