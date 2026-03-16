export type Language = "en" | "es";

type Messages = Record<string, string>;

export const messages: Record<Language, Messages> = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.cars": "Cars",
    "nav.leads": "Leads",
    "nav.automations": "Automations",
    "nav.aiAssistant": "AI Assistant",
    "nav.settings": "Settings",
    "nav.cookies": "Manage cookies or opt out",

    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Welcome back! Here's your overview.",
    "dashboard.recentLeads": "Recent Leads",
    "dashboard.metrics.activeCars": "Active Cars",
    "dashboard.metrics.newLeadsToday": "New Leads Today",
    "dashboard.metrics.totalLeads": "Total Leads",
    "dashboard.metrics.automationsActive": "Automations Active",

    "leads.title": "Leads",
    "leads.subtitle": "Track and manage your sales opportunities.",
    "leads.tableTab": "Table",
    "leads.funnelTab": "Funnel",
    "leads.generateLead": "Generate lead",
    "leads.searchPlaceholder": "Search leads...",
    "leads.filters": "Filters",
    "leads.visibleColumns": "Visible columns",
    "leads.leadDetails": "Lead details",
    "leads.leadEdit": "Edit lead",
    "leads.status": "Status",
    "leads.source": "Source",
    "leads.date": "Date",
    "leads.deleteTitle": "Delete lead",
    "leads.deleteDescription": "Are you sure you want to delete {name}? This cannot be undone.",
    "leads.deleteConfirm": "Delete",
    "leads.deleteCancel": "Cancel",
    "leads.deleteConfirmTitle": "Remove lead?",
    "leads.deleteConfirmDescription":
      "Are you sure you want to remove {name}? This action cannot be undone and will permanently remove this lead from the database.",

    "leads.notesLabel": "Notes",
    "leads.notesPlaceholder": "Add any extra context or notes for this lead (optional)...",
    "leads.saveChanges": "Save changes",

    "settings.title": "Settings",
    "settings.subtitle": "Manage your account and preferences.",
    "settings.profile.title": "Profile",
    "settings.profile.subtitle": "Manage your personal information",
    "settings.profile.fullName": "Full Name",
    "settings.profile.email": "Email",
    "settings.profile.phone": "Phone",
    "settings.profile.save": "Save Changes",
    "settings.instagram.title": "Instagram Connection",
    "settings.instagram.subtitle": "Connect your Instagram account for automations",
    "settings.appearance.title": "Appearance",
    "settings.appearance.subtitle": "Toggle dark mode to reverse the app colors for low-light environments.",
    "settings.appearance.light": "Light",
    "settings.appearance.dark": "Dark",
    "settings.language.title": "Language",
    "settings.language.subtitle": "Switch the app between English and Spanish.",
    "settings.language.english": "English",
    "settings.language.spanish": "Spanish",

    "funnel.cannotDeleteColumn.title": "Cannot delete column",
    "funnel.cannotDeleteColumn.description":
      "Move or update all leads in this status before deleting the column.",

    "dashboard.table.name": "Name",
    "dashboard.table.car": "Interested Car",
    "dashboard.table.source": "Source",
    "dashboard.table.status": "Status",
    "dashboard.table.date": "Date",

    "cars.title": "Cars",
    "cars.subtitle": "Manage your inventory and client vehicles.",
    "cars.searchPlaceholder": "Search cars...",
    "cars.filters": "Filters",
    "cars.visibleColumns": "Visible columns",
    "cars.addCar": "Add Car",

    // Cars table columns
    "cars.column.image": "Image",
    "cars.column.make": "Make/Model",
    "cars.column.year": "Year",
    "cars.column.price": "Price",
    "cars.column.owner": "Owner Type",
    "cars.column.status": "Status",
    "cars.column.source": "Source",
    "cars.column.actions": "Actions",

    // Cars actions
    "cars.actions.edit": "Edit car",
    "cars.actions.delete": "Delete car",

    // Car delete confirmations
    "cars.deleteTitle": "Delete car",
    "cars.deleteDescription": "Are you sure you want to delete this car? This cannot be undone.",
    "cars.deleteConfirmTitle": "Remove car?",
    "cars.deleteConfirmDescription":
      "Are you sure you want to remove this car? This action cannot be undone and will permanently remove this car from the database.",
    "cars.deleteConfirm": "Delete",
    "cars.deleteCancel": "Cancel",

    // Car source dialog
    "cars.sourceDetailsTitle": "Source details",
    "cars.sourceLeadName": "Lead",
    "cars.sourceWebsite": "Website",
    "cars.sourceRequestedAt": "Requested at",

    "ai.title": "AI Assistant",
    "ai.subtitle": "Ask questions about your cars, leads, and sales.",
    "ai.greeting":
      "Hi! I'm your AI assistant. I can help you with questions about your cars, leads, and sales data. What would you like to know?",
    "ai.suggestedLabel": "Suggested Questions",
    "ai.suggested.1": "How many leads did I get this week?",
    "ai.suggested.2": "Which cars are most popular?",
    "ai.suggested.3": "Show me uncontacted leads",
    "ai.suggested.4": "What's my conversion rate?",
    "ai.inputPlaceholder": "Ask me anything...",
    "ai.send": "Send",

    "automations.title": "Automations",
    "automations.subtitle": "Manage your automated workflows and bots.",
    "automations.card.dmTitle": "Instagram DM Auto-Responder",
    "automations.card.dmDescription": "Automatically responds to incoming DMs with car availability",
    "automations.card.qualTitle": "Lead Qualification Bot",
    "automations.card.qualDescription": "Qualifies leads by asking pre-screening questions",
    "automations.card.priceTitle": "Price Alert Automation",
    "automations.card.priceDescription": "Sends price drop alerts to interested leads",
    "automations.card.followupTitle": "Follow-up Sequence",
    "automations.card.followupDescription": "Automated follow-up messages for inactive leads",
    "automations.status.active": "Active",
    "automations.status.paused": "Paused",
    "automations.metrics.messages": "Messages",
    "automations.metrics.leads": "Leads",
    "automations.metrics.lastActive": "Last Active",
    "automations.configure": "Configure",

    "notFound.title": "Oops! Page not found",
    "notFound.back": "Return to Home",

    "index.title": "Welcome to Your Blank App",
    "index.subtitle": "Start building your amazing project here!",

    // Generic statuses / owners
    "status.new": "New",
    "status.contacted": "Contacted",
    "status.qualified": "Qualified",
    "status.available": "Available",
    "status.pending": "Pending",
    "status.sold": "Sold",
    "status.active": "Active",
    "status.paused": "Paused",

    "owner.owned": "Owned",
    "owner.client": "Client",
    "owner.advisory": "Advisory",

    // Leads table columns
    "leads.column.name": "Name",
    "leads.column.instagram": "Instagram",
    "leads.column.phone": "Phone",
    "leads.column.car": "Interested Car",
    "leads.column.status": "Status",
    "leads.column.source": "Source",
    "leads.column.date": "Date",
    "leads.column.actions": "Actions",

    // Lead actions
    "leads.actions.edit": "Edit lead",
    "leads.actions.delete": "Delete lead",

    // Funnel UI
    "funnel.remove": "Remove",
    "funnel.addColumn": "Add column",
    "leads.statusCurrent": "(current)",
  },
  es: {
    "nav.dashboard": "Panel",
    "nav.cars": "Autos",
    "nav.leads": "Leads",
    "nav.automations": "Automatizaciones",
    "nav.aiAssistant": "Asistente de IA",
    "nav.settings": "Configuración",
    "nav.cookies": "Gestionar cookies o darse de baja",

    "dashboard.title": "Panel",
    "dashboard.subtitle": "¡Bienvenido de nuevo! Aquí tienes tu resumen.",
    "dashboard.recentLeads": "Leads recientes",
    "dashboard.metrics.activeCars": "Autos activos",
    "dashboard.metrics.newLeadsToday": "Nuevos leads hoy",
    "dashboard.metrics.totalLeads": "Leads totales",
    "dashboard.metrics.automationsActive": "Automatizaciones activas",

    "leads.title": "Leads",
    "leads.subtitle": "Supervisa y gestiona tus oportunidades de venta.",
    "leads.tableTab": "Tabla",
    "leads.funnelTab": "Embudo",
    "leads.generateLead": "Generar lead",
    "leads.searchPlaceholder": "Buscar leads...",
    "leads.filters": "Filtros",
    "leads.visibleColumns": "Columnas visibles",
    "leads.leadDetails": "Detalles del lead",
    "leads.leadEdit": "Editar lead",
    "leads.status": "Estado",
    "leads.source": "Origen",
    "leads.date": "Fecha",
    "leads.deleteTitle": "Eliminar lead",
    "leads.deleteDescription": "¿Seguro que quieres eliminar a {name}? Esta acción no se puede deshacer.",
    "leads.deleteConfirm": "Eliminar",
    "leads.deleteCancel": "Cancelar",
    "leads.deleteConfirmTitle": "¿Eliminar lead?",
    "leads.deleteConfirmDescription":
      "¿Seguro que quieres eliminar a {name}? Esta acción no se puede deshacer y eliminará este lead de la base de datos de forma permanente.",

    "leads.notesLabel": "Notas",
    "leads.notesPlaceholder": "Agrega contexto adicional o notas para este lead (opcional)...",
    "leads.saveChanges": "Guardar cambios",

    "settings.title": "Configuración",
    "settings.subtitle": "Administra tu cuenta y preferencias.",
    "settings.profile.title": "Perfil",
    "settings.profile.subtitle": "Administra tu información personal",
    "settings.profile.fullName": "Nombre completo",
    "settings.profile.email": "Correo electrónico",
    "settings.profile.phone": "Teléfono",
    "settings.profile.save": "Guardar cambios",
    "settings.instagram.title": "Conexión con Instagram",
    "settings.instagram.subtitle": "Conecta tu cuenta de Instagram para automatizaciones",
    "settings.appearance.title": "Apariencia",
    "settings.appearance.subtitle":
      "Activa el modo oscuro para invertir los colores de la app en entornos con poca luz.",
    "settings.appearance.light": "Claro",
    "settings.appearance.dark": "Oscuro",
    "settings.language.title": "Idioma",
    "settings.language.subtitle": "Cambia la app entre inglés y español.",
    "settings.language.english": "Inglés",
    "settings.language.spanish": "Español",

    "funnel.cannotDeleteColumn.title": "No se puede eliminar la columna",
    "funnel.cannotDeleteColumn.description":
      "Mueve o actualiza todos los leads en este estado antes de eliminar la columna.",

    "dashboard.table.name": "Nombre",
    "dashboard.table.car": "Auto de interés",
    "dashboard.table.source": "Origen",
    "dashboard.table.status": "Estado",
    "dashboard.table.date": "Fecha",

    "cars.title": "Autos",
    "cars.subtitle": "Administra tu inventario y los vehículos de tus clientes.",
    "cars.searchPlaceholder": "Buscar autos...",
    "cars.filters": "Filtros",
    "cars.visibleColumns": "Columnas visibles",
    "cars.addCar": "Agregar auto",

    // Cars table columns
    "cars.column.image": "Imagen",
    "cars.column.make": "Marca/Modelo",
    "cars.column.year": "Año",
    "cars.column.price": "Precio",
    "cars.column.owner": "Tipo de propietario",
    "cars.column.status": "Estado",
    "cars.column.source": "Origen",
    "cars.column.actions": "Acciones",

    // Cars actions
    "cars.actions.edit": "Editar auto",
    "cars.actions.delete": "Eliminar auto",

    // Car delete confirmations
    "cars.deleteTitle": "Eliminar auto",
    "cars.deleteDescription": "¿Seguro que quieres eliminar este auto? Esta acción no se puede deshacer.",
    "cars.deleteConfirmTitle": "¿Eliminar auto?",
    "cars.deleteConfirmDescription":
      "¿Seguro que quieres eliminar este auto? Esta acción no se puede deshacer y eliminará este auto de la base de datos de forma permanente.",
    "cars.deleteConfirm": "Eliminar",
    "cars.deleteCancel": "Cancelar",

    // Car source dialog
    "cars.sourceDetailsTitle": "Detalles del origen",
    "cars.sourceLeadName": "Lead",
    "cars.sourceWebsite": "Sitio web",
    "cars.sourceRequestedAt": "Solicitado el",

    "ai.title": "Asistente de IA",
    "ai.subtitle": "Haz preguntas sobre tus autos, leads y ventas.",
    "ai.greeting":
      "Hola, soy tu asistente de IA. Puedo ayudarte con preguntas sobre tus autos, leads y datos de ventas. ¿Qué te gustaría saber?",
    "ai.suggestedLabel": "Preguntas sugeridas",
    "ai.suggested.1": "¿Cuántos leads obtuve esta semana?",
    "ai.suggested.2": "¿Qué autos son los más populares?",
    "ai.suggested.3": "Muéstrame los leads sin contactar",
    "ai.suggested.4": "¿Cuál es mi tasa de conversión?",
    "ai.inputPlaceholder": "Pregúntame lo que quieras...",
    "ai.send": "Enviar",

    "automations.title": "Automatizaciones",
    "automations.subtitle": "Administra tus flujos de trabajo y bots automatizados.",
    "automations.card.dmTitle": "Auto-respuesta de DM en Instagram",
    "automations.card.dmDescription":
      "Responde automáticamente a los DM entrantes con la disponibilidad de autos",
    "automations.card.qualTitle": "Bot de calificación de leads",
    "automations.card.qualDescription":
      "Califica leads haciendo preguntas de preselección",
    "automations.card.priceTitle": "Automatización de alertas de precio",
    "automations.card.priceDescription":
      "Envía alertas de bajada de precio a leads interesados",
    "automations.card.followupTitle": "Secuencia de seguimiento",
    "automations.card.followupDescription":
      "Mensajes de seguimiento automatizados para leads inactivos",
    "automations.status.active": "Activa",
    "automations.status.paused": "Pausada",
    "automations.metrics.messages": "Mensajes",
    "automations.metrics.leads": "Leads",
    "automations.metrics.lastActive": "Última actividad",
    "automations.configure": "Configurar",

    "notFound.title": "¡Ups! Página no encontrada",
    "notFound.back": "Volver al inicio",

    "index.title": "Bienvenido a tu app en blanco",
    "index.subtitle": "Empieza a construir tu proyecto increíble aquí.",

    // Generic statuses / owners
    "status.new": "Nuevo",
    "status.contacted": "Contactado",
    "status.qualified": "Calificado",
    "status.available": "Disponible",
    "status.pending": "Pendiente",
    "status.sold": "Vendido",
    "status.active": "Activa",
    "status.paused": "Pausada",

    "owner.owned": "Propio",
    "owner.client": "Cliente",
    "owner.advisory": "Asesoría",

    // Leads table columns
    "leads.column.name": "Nombre",
    "leads.column.instagram": "Instagram",
    "leads.column.phone": "Teléfono",
    "leads.column.car": "Auto de interés",
    "leads.column.status": "Estado",
    "leads.column.source": "Origen",
    "leads.column.date": "Fecha",
    "leads.column.actions": "Acciones",

    // Lead actions
    "leads.actions.edit": "Editar lead",
    "leads.actions.delete": "Eliminar lead",

    // Funnel UI
    "funnel.remove": "Eliminar",
    "funnel.addColumn": "Agregar columna",
    "leads.statusCurrent": "(actual)",
  },
};

export function formatMessage(template: string, params?: Record<string, string>) {
  if (!params) return template;
  return Object.keys(params).reduce(
    (acc, key) => acc.replace(new RegExp(`{${key}}`, "g"), params[key]),
    template,
  );
}

