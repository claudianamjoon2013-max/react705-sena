import { useForm, Controller } from "react-hook-form";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextArea from "./components/FormTextArea";
import FormFile from "./components/FormFile";
import paises from "./paises";
import ciudades from "./ciudades";

function ContactoForm() {
  const [enviando, setEnviando] = useState(false);
  const fileRef = useRef();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Función para disparar la alerta cuando la validación falla
  const onError = (errors) => {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor diligencia todos los campos obligatorios.",
      confirmButtonColor: "#0ea5e9",
    });
  };

  const onSubmit = async (data) => {
    setEnviando(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "archivo" && value) {
        if (Array.isArray(value)) {
          value.forEach((archObj) => {
            const fileObj = archObj.file || archObj;
            formData.append("archivo", fileObj);
          });
        } else {
          const fileObj = value.file || value;
          formData.append("archivo", fileObj);
        }
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Mensaje enviado!",
          text: "Tu mensaje fue enviado correctamente",
          confirmButtonColor: "#0ea5e9",
        });

        reset();
        fileRef.current?.limpiarArchivos();
      } else {
        const resultado = await response.json();
        const mensajeError = resultado.errors
          ? resultado.errors.map((e) => e.message).join(", ")
          : "Ocurrió un error al enviar el formulario";

        Swal.fire({
          icon: "error",
          title: "No se pudo enviar",
          text: mensajeError,
          confirmButtonColor: "#0ea5e9",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "No se pudo conectar con el servidor. Inténtalo de nuevo.",
        confirmButtonColor: "#0ea5e9",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="bg-white p-8 rounded-xl shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Primer Nombre"
          name="primerNombre"
          placeholder="Escribe tu primer nombre"
          register={(name) =>
            register(name, { required: "El primer nombre es obligatorio" })
          }
          error={errors.primerNombre?.message}
        />
        <FormInput
          label="Segundo Nombre"
          name="segundoNombre"
          placeholder="Escribe tu segundo nombre"
          register={register}
          error={errors.segundoNombre?.message}
        />
        <FormInput
          label="Primer Apellido"
          name="primerApellido"
          placeholder="Escribe tu primer apellido"
          register={(name) =>
            register(name, { required: "El primer apellido es obligatorio" })
          }
          error={errors.primerApellido?.message}
        />
        <FormInput
          label="Segundo Apellido"
          name="segundoApellido"
          placeholder="Escribe tu segundo apellido"
          register={register}
          error={errors.segundoApellido?.message}
        />
        <FormSelect
          label="Género"
          name="genero"
          options={["Femenino", "Masculino", "Otro"]}
          register={(name) =>
            register(name, { required: "Selecciona un género" })
          }
          error={errors.genero?.message}
        />
        <FormSelect
          label="País"
          name="pais"
          options={paises}
          register={(name) =>
            register(name, { required: "Selecciona un país" })
          }
          error={errors.pais?.message}
        />
        <FormSelect
          label="Ciudad"
          name="ciudad"
          options={ciudades}
          register={(name) =>
            register(name, { required: "Selecciona una ciudad" })
          }
          error={errors.ciudad?.message}
        />
        <FormInput
          label="Correo"
          name="correo"
          type="email"
          placeholder="ejemplo@correo.com"
          register={(name) =>
            register(name, {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Ingresa un correo válido",
              },
            })
          }
          error={errors.correo?.message}
        />
        <FormInput
          label="Teléfono"
          name="telefono"
          type="tel"
          placeholder="300 000 0000"
          register={(name) =>
            register(name, { required: "El teléfono es obligatorio" })
          }
          error={errors.telefono?.message}
        />
      </div>

      <div className="mt-6">
        <FormTextArea
          label="Mensaje"
          name="mensaje"
          placeholder="Escribe tu mensaje..."
          register={(name) =>
            register(name, { required: "El mensaje es obligatorio" })
          }
          error={errors.mensaje?.message}
        />
      </div>

      <div className="mt-6">
        <Controller
          name="archivo"
          control={control}
          render={({ field }) => (
            <FormFile
              ref={fileRef}
              label="Adjuntar archivo"
              onFilesChange={field.onChange}
              error={errors.archivo?.message}
            />
          )}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={enviando}
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg transition disabled:bg-slate-400"
        >
          {enviando ? "Enviando..." : "Enviar mensaje"}
        </button>
      </div>
    </form>
  );
}

export default ContactoForm;