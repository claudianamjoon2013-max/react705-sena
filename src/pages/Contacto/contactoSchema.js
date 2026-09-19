import { z } from "zod";

export const contactoSchema = z.object({
  primerNombre: z.string().min(1, "El primer nombre es obligatorio"),
  segundoNombre: z.string().optional(),
  primerApellido: z.string().min(1, "El primer apellido es obligatorio"),
  segundoApellido: z.string().optional(),
  genero: z.string().min(1, "Selecciona un género"),
  pais: z.string().min(1, "Selecciona un país"),
  ciudad: z.string().min(1, "Selecciona una ciudad"),
  correo: z.string().email("Ingresa un correo electrónico válido"),
  telefono: z.string().min(7, "Ingresa un número de teléfono válido"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  archivo: z.any().optional(),
});