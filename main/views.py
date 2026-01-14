from django.shortcuts import render, redirect
from django.utils.timezone import now
from django.contrib import messages
from django.core.mail import EmailMessage
from django.utils.html import strip_tags
from .forms import ContactForm
from django.conf import settings
from django.http import Http404

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


from django.shortcuts import render

def ova_view(request):
    context = {
        "ova_url": "https://ailectus.com/ova/iagd/t11/",  # SCORM, OVA, H5P, etc.
        "titulo": "Objeto Virtual de Aprendizaje"
    }
    return render(request, "ova.html", context)


def genially_view(request):
    presentations = getattr(settings, "GENIALLY_PRESENTATIONS", [])
    if not presentations:
        raise Http404("No hay presentaciones configuradas")

    first_slug = presentations[0]["slug"]
    return redirect("genially_detail", slug=first_slug)

def genially_detail_view(request, slug):

    presentations = getattr(settings, "GENIALLY_PRESENTATIONS", [])
    current = next((p for p in presentations if p["slug"] == slug), None)

    if not current:
        raise Http404("Presentación no encontrada")

    # Otras presentaciones (excluye la actual)
    others = [p for p in presentations if p["slug"] != slug]

    context = {
        "titulo": current["title"],
        "genially_url": current["url"],
        "presentations": others,
        "current_slug": slug,
    }
    return render(request, "genially.html", context)


def recursos_view(request):
    recursos = [
        {
            "name": "H5P – Actividades interactivas",
            "type": "Herramienta",
            "url": "https://h5p.org/",
        },
        {
            "name": "Genially – Presentaciones interactivas",
            "type": "Herramienta",
            "url": "https://genially.com/",
        },
        {
            "name": "Canva Educación – Recursos para clases",
            "type": "Herramienta",
            "url": "https://www.canva.com/education/",
        },
        {
            "name": "Pexels – Imágenes gratuitas",
            "type": "Banco de recursos",
            "url": "https://www.pexels.com/",
        },
        {
            "name": "Flaticon – Íconos (uso gratuito con atribución)",
            "type": "Banco de recursos",
            "url": "https://www.flaticon.com/",
        },
        {
            "name": "Google Fonts – Tipografías",
            "type": "Banco de recursos",
            "url": "https://fonts.google.com/",
        },
    ]

    context = {
        "titulo": "Recursos abiertos",
        "recursos": recursos,
    }
    return render(request, "recursos.html", context)