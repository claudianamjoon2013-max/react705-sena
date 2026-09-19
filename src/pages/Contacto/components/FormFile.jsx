import { useDropzone } from "react-dropzone"; // Importamos el hook que nos da toda la funcionalidad de arrastrar y soltar archivos
import { useState, forwardRef, useImperativeHandle } from "react"; // Traemos useState, forwardRef y useImperativeHandle para exponer métodos al componente padre
import Swal from "sweetalert2"; // Importamos SweetAlert2 para mostrar alertas bonitas y mensajes emergentes tipo Toast

const FormFile = forwardRef(({
  label = "Adjuntar archivo...", // Texto que aparece sobre la zona de carga (por defecto "Adjuntar archivo...")
  maxFiles = 3, // Cantidad máxima de archivos que el usuario puede subir
  onFilesChange, // Función que comunica la lista de archivos a React Hook Form (desde el Controller)
  setValue, // Forma alternativa de guardar los datos en React Hook Form si no se usa Controller
  name = "archivo", // Nombre identificador del campo dentro del formulario
  error, // Mensaje de error de validación en caso de existir
  accept = {} // Tipos de archivo permitidos (por defecto acepta cualquiera)
}, ref) => {
  // Estado local para almacenar el listado de archivos procesados con sus previews e IDs
  const [archivos, setArchivos] = useState([]);

  // Expone la función limpiarArchivos hacia el componente padre mediante una ref
  useImperativeHandle(ref, () => ({
    limpiarArchivos: () => {
      // Liberar la memoria usada por las URLs de vista previa de las imágenes
      archivos.forEach((arch) => {
        if (arch.preview) URL.revokeObjectURL(arch.preview);
      });
      // Resetea el estado local de archivos a un arreglo vacío
      setArchivos([]);
    }
  }));

  // Calculamos cuántos cupos quedan disponibles para subir archivos
  const espacioDisponible = maxFiles - archivos.length;
  // Booleano que indica si ya no se pueden agregar más archivos
  const limiteAlcanzado = espacioDisponible <= 0;

  // Genera una huella única para cada archivo usando su nombre, fecha de modificación y tamaño
  const generarId = (file) => `${file.name}-${file.lastModified}-${file.size}`;

  // Configuración base de SweetAlert2 para mostrar mensajes flotantes (Toast) en la esquina superior derecha
  const Toast = Swal.mixin({
    toast: true, // Modo notificación pequeña tipo notificación flotante
    position: "top-end", // Posición en pantalla: esquina superior derecha
    showConfirmButton: false, // Oculta el botón de aceptar para que se cierre sola
    timer: 3000, // Duración de 3 segundos en pantalla
    timerProgressBar: true, // Muestra la barra de tiempo agotándose
  });

  // Función encargada de enviar la lista de archivos hacia React Hook Form según la prop recibida
  const actualizarFormulario = (listaActualizada) => {
    if (onFilesChange) {
      onFilesChange(listaActualizada); // Envía los archivos si usamos Controller
    } else if (setValue) {
      setValue(name, listaActualizada, { shouldValidate: true }); // Envía los archivos usando setValue directo
    }
  };

  // Función que se ejecuta cuando el usuario suelta o selecciona archivos en la zona de carga
  const onDrop = (acceptedFiles) => {
    // Si ya alcanzamos el límite de archivos, mostramos alerta y no dejamos procesar nada más
    if (espacioDisponible <= 0) {
      Toast.fire({
        icon: "warning",
        title: `Límite alcanzado (${maxFiles} de ${maxFiles} archivos)`,
      });
      return;
    }

    // Si intenta subir más de los cupos disponibles, notificamos que solo se procesarán algunos
    if (acceptedFiles.length > espacioDisponible) {
      Toast.fire({
        icon: "info",
        title: `Solo se agregaron ${espacioDisponible} archivo(s). El resto superó el límite.`,
      });
    }

    // Tomamos únicamente los archivos que caben en el espacio disponible
    const archivosAceptar = acceptedFiles.slice(0, espacioDisponible);

    // Transformamos cada archivo agregándole su ID único y la miniatura si es imagen
    const nuevosArchivos = archivosAceptar.map((file) => {
      const esImagen = file.type.startsWith("image/"); // Verifica si el archivo es una imagen
      return {
        id: generarId(file), // Genera su ID
        file: file, // Guarda el objeto File original
        preview: esImagen ? URL.createObjectURL(file) : null, // Crea una URL temporal para previsualizar imágenes
      };
    });

    // Unimos los archivos que ya teníamos con los nuevos que acaban de subir
    const listaFinal = [...archivos, ...nuevosArchivos];

    // 1. Actualizamos el estado local para renderizar las tarjetas y miniaturas
    setArchivos(listaFinal);

    // 2. Notificamos la nueva lista a React Hook Form
    actualizarFormulario(listaFinal);

    // Mostramos mensaje flotante de éxito indicando cuántos se agregaron
    Toast.fire({
      icon: "success",
      title: `${archivosAceptar.length} archivo(s) agregado(s)`,
    });
  };

  // Función que gestiona los archivos rechazados por formato incorrecto o tamaño excesivo
  const onDropRejected = (fileRejections) => {
    if (fileRejections.length > 0) {
      const errorType = fileRejections[0].errors[0]?.code; // Obtenemos el código de error
      let mensaje = "El archivo no pudo ser procesado.";

      // Personalizamos el mensaje según la causa del rechazo
      if (errorType === "file-invalid-type") {
        mensaje = "Formato de archivo no permitido.";
      } else if (errorType === "file-too-large") {
        mensaje = "El archivo supera el tamaño máximo permitido.";
      }

      // Mostramos una alerta modal explicando el rechazo
      Swal.fire({
        title: "Archivo rechazado",
        text: mensaje,
        icon: "error",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#0284c7",
      });
    }
  };

  // Función para abrir modal de confirmación antes de borrar un archivo
  const eliminarArchivo = (id) => {
    // Buscamos el archivo exacto por su ID dentro del estado
    const archivoAEliminar = archivos.find((arch) => arch.id === id);

    // Mostramos ventana emergente de confirmación
    Swal.fire({
      title: "¿Eliminar archivo?",
      text: `¿Estás seguro de quitar "${archivoAEliminar?.file.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48", // Botón rojo para eliminar
      cancelButtonColor: "#64748b", // Botón gris para cancelar
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      // Si el usuario da clic en "Sí, eliminar"
      if (result.isConfirmed) {
        // Liberamos la memoria del navegador usada por la vista previa de la imagen
        if (archivoAEliminar?.preview) {
          URL.revokeObjectURL(archivoAEliminar.preview);
        }

        // Filtramos la lista eliminando el archivo que coincide con el ID
        const listaFiltrada = archivos.filter((arch) => arch.id !== id);

        // 1. Actualizamos el estado local
        setArchivos(listaFiltrada);

        // 2. Notificamos a React Hook Form del cambio
        actualizarFormulario(listaFiltrada);

        // Confirmamos la eliminación con una alerta emergente corta
        Toast.fire({
          icon: "success",
          title: "Archivo eliminado correctamente",
        });
      }
    });
  };

  // Extraemos las utilidades de react-dropzone pasándole la configuración del componente
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, // Función a ejecutar al soltar archivos válidos
    onDropRejected, // Función a ejecutar al soltar archivos no válidos
    multiple: true, // Permite seleccionar varios archivos
    maxFiles: maxFiles, // Límite de archivos
    disabled: limiteAlcanzado, // Deshabilita la zona de carga si se llegó al límite
    accept, // Tipos de archivo aceptados
  });

  return (
    // Contenedor principal con diseño vertical en columna
    <div className="flex flex-col gap-4 max-w-xl mx-auto w-full">
      {/* Etiqueta superior del campo */}
      <label className="font-semibold text-slate-700">{label}</label>

      {/* Zona desplegable (Dropzone) interactiva con estilos según el estado */}
      <div
        {...getRootProps()} // Aplica las propiedades de arrastre necesarias
        className={`border-2 border-dashed rounded-xl p-8 text-center transition ${
          limiteAlcanzado
            ? "border-slate-200 bg-slate-100 cursor-not-allowed opacity-60" // Estilo deshabilitado
            : isDragActive
            ? "border-sky-500 bg-sky-50 cursor-pointer" // Estilo al arrastrar un archivo encima
            : "border-sky-400 cursor-pointer hover:bg-sky-50/30" // Estilo por defecto reposo
        }`}
      >
        <input {...getInputProps()} /> {/* Input oculto para abrir el explorador de archivos */}
        <div className="text-3xl mb-2">📄</div>

        {/* Renderizado condicional de mensajes según el estado de la zona de carga */}
        {limiteAlcanzado ? (
          <p className="text-slate-500 font-medium">
            Límite alcanzado ({maxFiles} de {maxFiles} archivos)
          </p>
        ) : isDragActive ? (
          <p className="text-sky-600 font-medium">Suelta los archivos aquí...</p>
        ) : (
          <>
            <p className="font-medium text-slate-700">Arrastra tus archivos aquí</p>
            <p className="text-xs text-slate-400 mt-1">
              Disponibles: {espacioDisponible} de {maxFiles} espacio(s)
            </p>
          </>
        )}
      </div>

      {/* Muestra mensaje de error en rojo si React Hook Form detecta un fallo */}
      {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}

      {/* Lista detallada de archivos adjuntados actualmente */}
      {archivos.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-700 text-sm">
            Archivos seleccionados ({archivos.length}/{maxFiles}):
          </h4>

          {/* Mapeamos el arreglo de archivos para mostrar cada uno en una tarjeta */}
          {archivos.map((archivo) => (
            <div
              key={archivo.id} // Identificador único requerido por React para renderizado eficiente
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 gap-4 overflow-hidden"
            >
              {/* Información detallada del archivo (Nombre, tipo y tamaño) */}
              <div className="text-sm text-slate-700 space-y-0.5 flex-1 min-w-0 pr-2">
                <p className="break-all font-medium">
                  <strong>Nombre:</strong> {archivo.file.name}
                </p>
                <p>
                  <strong>Tipo:</strong> {archivo.file.type || "Desconocido"}
                </p>
                <p>
                  <strong>Tamaño:</strong> {(archivo.file.size / 1024).toFixed(2)} KB
                </p>
              </div>

              {/* Vista previa y botón de eliminación */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                {/* Si tiene miniatura la renderiza como imagen, si no muestra icono genérico */}
                {archivo.preview ? (
                  <img
                    src={archivo.preview}
                    alt={archivo.file.name}
                    className="w-16 h-16 object-cover rounded-lg border border-slate-300 shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-500 font-medium">
                    PDF 📄
                  </div>
                )}

                {/* Botón para activar el modal de borrado */}
                <button
                  type="button" // Evita que al hacer clic se envíe el formulario principal
                  onClick={() => eliminarArchivo(archivo.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-700 hover:bg-slate-800 rounded-md transition cursor-pointer"
                >
                  Eliminar 🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default FormFile;