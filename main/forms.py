from django import forms

class ContactForm(forms.Form):
    nombre = forms.CharField(
        max_length=120, label="Nombre",
        widget=forms.TextInput(attrs={
            "class": "form-control",
            "placeholder": "Tu nombre"
        })
    )
    email = forms.EmailField(
        label="Email",
        widget=forms.EmailInput(attrs={
            "class": "form-control",
            "placeholder": "tucorreo@dominio.com"
        })
    )
    mensaje = forms.CharField(
        label="Mensaje",
        widget=forms.Textarea(attrs={
            "class": "form-control",
            "rows": 5,
            "placeholder": "Cuéntame brevemente tu proyecto"
        })
    )