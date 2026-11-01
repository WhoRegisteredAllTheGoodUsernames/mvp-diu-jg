import type { Ticket } from "./ticket-types";

export const locations = [
  "Campus Casa Central Valparaíso",
  "Campus San Joaquín",
  "Campus Vitacura",
  "Sede Viña del Mar",
  "Sede Concepción",
];

export const categories = [
  "Electricidad e Iluminación (Luminarias, enchufes, interruptores)",
  "Infraestructura y Mantención (Puertas, ventanas, cerraduras, pintura)",
  "Mobiliario y Salas (Sillas, mesas, pizarras, bancos)",
  "Equipamiento Audiovisual (Proyectores, telones, sistemas de audio)",
  "Redes y Conectividad (Wi-Fi USM, puntos de red)",
  "Aseo y Servicios Generales (Baños, dispensadores, limpieza)",
  "Climatización y Ventilación (Aire acondicionado, calefacción)",
];

export const requestedForOptions = [
  "Para mí (Diego Pérez)",
  "En nombre de un docente / profesor",
  "En nombre de otro estudiante",
];

export const initialTickets: Ticket[] = [
  {
    id: "INC-1042",
    title: "Falla de luminarias en sala de clases",
    description: "Tres luminarias del sector poniente de la sala parpadean y dos no encienden, dificultando la visibilidad durante las cátedras.",
    created: "Hace 15 min",
    status: "Open",
    type: "Incidence",
    category: "Electricidad e Iluminación (Luminarias, enchufes, interruptores)",
    location: "Campus San Joaquín · Edificio B (Salas)",
    requestedFor: "Diego Pérez",
    worker: "En espera de asignación",
    group: "Mantención e Infraestructura",
    resolution: "",
    messages: [
      {
        author: "Diego Pérez",
        text: "Reporte inicial ingresado por el estudiante.",
        date: "Hace 15 min",
      },
    ],
  },
  {
    id: "REQ-1048",
    title: "Habilitación de acceso a laboratorio de computación",
    description: "Solicito activación de permisos en mi tarjeta universitaria para el laboratorio de redes durante el horario vespertino.",
    created: "Ayer, 16:30",
    status: "In progress",
    type: "Requirement",
    category: "Redes y Conectividad (Wi-Fi USM, puntos de red)",
    location: "Campus San Joaquín · Edificio A (Laboratorios)",
    requestedFor: "Diego Pérez",
    worker: "Carlos Muñoz",
    group: "Mesa de Servicios DTI",
    resolution: "",
    messages: [
      {
        author: "Carlos Muñoz",
        text: "Solicitud recibida. Estamos validando la inscripción académica con la jefatura de carrera.",
        date: "Ayer, 17:15",
      },
    ],
  },
  {
    id: "INC-1029",
    title: "Reparación de proyector multimedia",
    description: "El proyector HDMI no entrega señal de video al conectar computadores portátiles.",
    created: "20 Oct 2026",
    status: "Resolved",
    type: "Incidence",
    category: "Equipamiento Audiovisual (Proyectores, telones, audio)",
    location: "Campus Casa Central Valparaíso · Edificio A",
    requestedFor: "Diego Pérez",
    worker: "Marcela Tapia",
    group: "Soporte Audiovisual",
    resolution: "Se reemplazó el cable HDMI empotrado y se calibró la entrada de video del proyector.",
    messages: [
      {
        author: "Marcela Tapia",
        text: "Cable reemplazado y probado con señal HDMI exitosamente.",
        date: "21 Oct 2026",
      },
      {
        author: "Diego Pérez",
        text: "Confirmado, funcionando impecable. Gracias.",
        date: "21 Oct 2026",
      },
    ],
  },
];