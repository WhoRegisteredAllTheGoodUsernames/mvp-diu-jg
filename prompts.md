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
20. The tailwind classes are in the code, but they are not applied. Configure Tailwind correctly by adding the corresponding imports and configuration used in the PostCSS configuration
21. There are some missing CSS classes that were not ported to Tailwind in the .tsx files in views. These were deleted from the original CSS file, so recreate them with Tailwind.
22. It's not complete yet. Use the following CSS code as the base for replacing the remaining CSS classes: (app/globals.css del commit b0a457b32520d23f1c3041d0dbaa6cfa657554e7)
23. There's still missing CSS classes: In components/header.tsx: profile-name, status, status-dot. In views/ticketDetail.tsx: worker-avatar.
24. Fix the following error: components/header.tsx(43,166): error TS2367: This comparison appears to be unintentional because the types '"In progress" | "Resolved"' and '"In Progress"' have no overlap.

## Después de 6367eccd1514e419e506b8946d41021290a288dd

(...)
