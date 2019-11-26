# Generated by Django 2.2.7 on 2019-11-26 12:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('parties', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='partymember',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='party_characters', to='users.User'),
        ),
    ]
