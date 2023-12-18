import mongoose from "mongoose";

const ProfissionalSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    cargo: {
      type: String,
      required: true,
    },
    imagem: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    curriculo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExperienciaProfissional",
        required: true,
      },
    ],
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telefone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Profissional ||
  mongoose.model("Profissional", ProfissionalSchema);