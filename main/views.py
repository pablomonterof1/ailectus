from django.shortcuts import render, redirect
from django.utils.timezone import now
from django.contrib import messages
from django.core.mail import EmailMessage
from django.utils.html import strip_tags
from .forms import ContactForm

def home(request):
    return render(request, "home.html", {"now": now()})


def contacto_view(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            nombre = form.cleaned_data["nombre"]
            email = form.cleaned_data["email"]
            mensaje = form.cleaned_data["mensaje"]

            asunto = f"Nuevo contacto desde Ailectus – {nombre}"
            cuerpo_html = f"""
                <h3>Nuevo mensaje de contacto</h3>
                <p><b>Nombre:</b> {nombre}</p>
                <p><b>Email:</b> {email}</p>
                <p><b>Mensaje:</b><br>{mensaje.replace('\n', '<br>')}</p>
            """
            email_msg = EmailMessage(
                subject=asunto,
                body=cuerpo_html,
                from_email=None,                         # usa DEFAULT_FROM_EMAIL
                to=["info@ailectus.com"],               # destinatario(s)
                reply_to=[email],                        # para responder al remitente
            )
            email_msg.content_subtype = "html"           # enviar HTML
            try:
                email_msg.send(fail_silently=False)
                messages.success(request, "¡Gracias! Tu mensaje fue enviado.")
                return redirect("contacto")
            except Exception as e:
                messages.error(request, f"Ocurrió un error al enviar el correo: {e}")
    else:
        form = ContactForm()
    return render(request, "contacto.html", {"form": form})