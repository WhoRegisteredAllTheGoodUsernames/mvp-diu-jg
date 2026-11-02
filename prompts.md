# Registro de promps - Rama "front"
1. Hola! Te comento el trabajo de hoy: Debemos un MVP hecho en React de una plataforma tipo "Service Desk" (reporte de incidencias/apertura de tickets) universitario tal que las hipótesis propuestas en el informe se puedan testear directamente.

Actualmente tenemos generado un MVP, pero está en inglés, no tiene la paleta de colores de la universidad ni su iconografía (Universidad Técnica Federico Santa María), y puede que la información no esté dispuesta de la mejor manera... Entonces, la verdad es que acá solo te voy a pedir que nos hagamos cargo del frontend, la idea es que estructuremos la página tal que la paleta de colores sea acorde a la universidad, la información esté directamente accesible y, como foco central del sitio, debemos primar la FACILIDAD DE USO para el artefacto persona descrito en el informe.

Entonces, partamos con lo básico: Recolección de información. Quiero que me indiques qué componentes del proyecto generado necesitas, como mínimo, saber para empezar a jugar con el front. Actualmente, la carpeta views está compuesta por los archivos que ves en la foto adjunta, y adicionalmente, tenemos el archivo
header.tsx y globals.css, que están alojados, cada uno, en carpetas distintas dentro del proyecto.

Te propongo, además, que los nuevos estilos que vayamos a crear, los dejemos todos en un "styles.css" aparte, el resto de archivos, para simplificar, los modificamos directamente y problema resuelto.

Te escucho entonces, cómo empezamos?

2. Te paso los archivos solicitados: [adjunto ’global.css’ y ’header.tsx’]

3. Genial! Lo que veo me parece bastante bien.

Un detalle sí... Podrías por favor darme la opcion de que en el header, en la parte superior izquierda, donde se ve el cuadro donde dice "USM" me dejes colocar el logo de la universidad? Asume que el archivo se llama "logo.jpg"

4. Genial! Super bien ahora sí!

Procedo entonces a compartirte uno de los archivos solicitados: home.tsx (no te comparto aún createTicket, pues es, a mi gusto, muy largo. Mejor enfoquémonos solo en home y luego pasamos a createTicket): [adjunto ’home.tsx’]

5. Bien! Lo veo super sólido! Te adjunto, ahora sí, createTicket.tsx: [adjunto ’createTicket.tsx’]

6. Bien! Procedo a adjuntarte, para ir uno por uno, tickets.tsx: [adjunto ’tickets.tsx’]

7. Vamos super! Te mando entonces ticketDetail.tsx: [adjunto ’ticketDetail.tsx’]

8. Te comento con respecto a todos los cambios realizados:

Recibí los siguientes comentarios: "A Vercel no le gustó tu correo... Sería bueno si puedes configurarlo para que use el correo que tienes asociado a tu cuenta de GitHub"; "Yo me fijaría un poco más en lo que editó Gemini, porque dejó las categorías en el código en vez de usar el arreglo que corresponde, además volvió a implementar el filtro por estado mal, ya que los estados son exclusivos, así que no tiene sentido hacerlos como bitflags"

Me podrías dar tu impresión con respecto a los comentarios recibidos, y dar una guía de cómo subsanar la situación?
