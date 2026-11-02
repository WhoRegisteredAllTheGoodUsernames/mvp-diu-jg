# Registro de promps por commits y herramienta

## Inicio - v0

1. We need the frontend for a ticket platform. The following views are needed: A simple start page that allows the user to go to both next views, a ticket creation page and a 'my-tickets' section. The ticket creation should consider the following fields: Title, description, an option for creating the ticket in behalf of another user, a location selector (fixed locations in a list), type (requirement or incidence) and category. The 'my-tickets' section shows all tickets made by the user with their state, and also an optional detailed view of each ticket with all the fields in the creation form, and related to the ticket's state (assigned worker and their group) and resolution.
2. The user should be able to edit an open ticket, add additional info (with a message to the assigned person) to in-progress and closed tickets.
3. Add a evaluation of resolution, like, a short survey that the user can use to rate the solution provided. Note that the ticket can be closed by the assigned person, which is also a resolution.
4. Install tsc
5. Fix the spacing in the conversation view. The comments are sticking to each other and to the message writing form.
6. El último prompt no generó los cambios visuales esperados, así que se añade la sugerencia al elemento problemático directamente, el div que contiene el contenido del comentario: Fix the spacing here. Each comment is too close to each other.
7. Se añade la sugerencia al elemento que contiene los atributos del comentario: Add spacing to the ticket's attributes.
8. Se añade la sugerencia al elemento que rodea el formulario de comentarios: Add spacing below.
9. In the file app/page.tsx, separate the placeholder data, page components and views in different files.
10. Fix spacing and indentation in all .tsx and css files.
11. Separate the views in components/views.tsx in different files.
12. Move the views in components to a new folder called views on the root.
13. In the view createTicket.tsx, replace the inline values for categories and requestedFor values defined in lib/ticket-data.
14. The 'my-tickets' view should allow the user to filter tickets by status and sort by date.
15. In the ticket's details view, the assigned worker's avatar (that uses their initials in a circle) has it's text out of place. Center the text.
16. El último prompt no generó los cambios visuales esperados, así que se añade la sugerencia al div que contiene las iniciales del trabajador asignado: Center the text.
17. The buttons in the home for making a request or reporting an incident should send to the ticket creation form with the corresponding type selected.
18. Install tsc
19. Port all css code in app/globals.css to tailwind classes applied to the corresponding code in the .tsx files.
20. The tailwind classes are in the code, but they are not applied. Configure Tailwind correctly by adding the corresponding imports and configuration used in the PostCSS configuration.
21. There are some missing CSS classes that were not ported to Tailwind in the .tsx files in views. These were deleted from the original CSS file, so recreate them with Tailwind.
22. It's not complete yet. Use the following CSS code as the base for replacing the remaining CSS classes: (app/globals.css del commit b0a457b32520d23f1c3041d0dbaa6cfa657554e7)
23. There's still missing CSS classes: In components/header.tsx: profile-name, status, status-dot. In views/ticketDetail.tsx: worker-avatar.
24. Fix the following error: components/header.tsx(43,166): error TS2367: This comparison appears to be unintentional because the types '"In progress" | "Resolved"' and '"In Progress"' have no overlap.

## Commits 01e66508b4a925d6db4f948457d403ec3903f36d y 9c2776e9d84708cd016dbf2fea50285b27742bbe (rama front)

1. Hola! Te comento el trabajo de hoy: Debemos desarrollar un MVP hecho en React de una plataforma tipo "Service Desk" (reporte de incidencias/apertura de tickets) universitario tal que las hipótesis propuestas en el informe se puedan testear directamente.

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
