export const sendEmail = async (formData) => {
  // Muestra en la consola de F12 todo el objeto de datos recibido
  console.log("Datos listos para enviar:", formData);

  // Simula la respuesta de red 
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Retorna un objeto indicando que todo salió bien
  return { status: 200, text: "OK" };
};