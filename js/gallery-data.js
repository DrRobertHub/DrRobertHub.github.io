/* =========================================================
   Configuración de la galería
   ---------------------------------------------------------
   Este archivo es lo único que necesitas editar para agregar
   tus imágenes. No requiere tocar el HTML ni el resto del JS.

   CÓMO AGREGAR TUS ARCHIVOS
   1. Guarda tus imágenes en la carpeta que corresponda dentro
      de /assets, usando el nombre exacto que se arma abajo:
        assets/fotografia/foto-01.jpg   ... foto-40.jpg
        assets/ilustraciones/ilustracion-01.jpg ... ilustracion-10.jpg
        assets/proyectos/proyecto-01.jpg ... proyecto-08.jpg
        assets/evidencias/evidencia-01.jpg ... evidencia-08.jpg
      (también puedes usar .png o .webp, ver "ext" más abajo)
   2. Si una imagen todavía no existe, la tarjeta se muestra
      como espacio reservado con el nombre de archivo esperado,
      así sabes exactamente qué falta subir.
   3. Si necesitas más o menos espacios, cambia el valor "count".
   4. Para poner un título real a una foto específica, agrégalo
      en el objeto "captions" usando el número de la imagen.
   ========================================================= */

function buildGalleryItems({ folder, prefix, count, ext = "jpg", label, captions = {} }) {
  const items = [];
  for (let i = 1; i <= count; i++) {
    const num = String(i).padStart(2, "0");
    items.push({
      id: `${prefix}-${num}`,
      src: `${folder}/${prefix}-${num}.${ext}`,
      fileName: `${prefix}-${num}.${ext}`,
      caption: captions[i] || `${label} ${num}`,
    });
  }
  return items;
}

window.PORTFOLIO_DATA = {
    proyectos: buildGalleryItems({
    folder: "assets/proyectos",
    prefix: "proyecto",
    count: 8,
    label: "Proyecto",
    captions: {
      // 1: "Sistema de gestión escolar — pantalla principal",
    },
  }),
  
  fotografia: buildGalleryItems({
    folder: "assets/fotografia",
    prefix: "foto",
    count: 24,
    label: "Fotografía",
    captions: {
      // 1: "Sesión de retrato, estudio 2024",
    },
  }),

  ilustraciones: buildGalleryItems({
    folder: "assets/ilustraciones",
    prefix: "ilustracion",
    count: 8,
    label: "Ilustración",
    captions: {
      // 1: "Personaje original — línea y color digital",
    },
  }),

  evidencias: buildGalleryItems({
    folder: "assets/evidencias",
    prefix: "evidencia",
    count: 8,
    label: "Evidencia de trabajo",
    captions: {
      1: "Cierre de jornada CFE - Suterm, representando a la UMF-22 (2024)",
      2: "Conferencia sobre enfermedades crónico degenerativas",
      3: "Platica sobre alimentación saludable, CFE (2024)",
      4: "Plática sobre salud en el trabajo, Minera Autlán (2024)",
      5: "Feria de la salud, Tecnológico de Zacapoaxtla (2024)",
      6: "Jurado en la Expo proyectos de innovación, Universidad Hispana (diciembre 2015)",
      7: "Participación en el taller 'De lo abstracto a lo figurativo' impartido por el diseñador y cartelista Francisco Paco Galvez (2013)",
      8: "Con el conductor del programa de radio 'Apague la Luz y Escuche', Braulio Daza, en la estación de radio XEOL Radio Impacto (2008)",
    },
  }),
};
