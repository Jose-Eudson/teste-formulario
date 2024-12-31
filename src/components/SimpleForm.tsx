import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../components/SimpleForm.css";

type FormData = {
  name: string;
  email: string;
  age?: number; 
};

function SimpleForm() {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
   
    setSubmittedData({
      ...data,
      age: data.age || undefined,
    });
  };

  return (
    <div className="container">
      <h1>Formulário Simples</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            {...register("name", { required: "O nome é obrigatório" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "O email é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Digite um email válido",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div>
          <label>Idade:</label>
          <input
            type="number"
            {...register("age", {
              valueAsNumber: true,
            })}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>

      {submittedData && (
        <div className="result">
          <h2>Dados Enviados:</h2>
          <p>
            <strong>Nome:</strong> {submittedData.name}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Idade:</strong>{" "}
            {submittedData.age !== undefined ? submittedData.age : "Não informado"}
          </p>
        </div>
      )}
    </div>
  );
}

export default SimpleForm;
