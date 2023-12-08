import mongoose from "mongoose";

const ServicoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["servico", "exame"],
    },
    departamento: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Servico ||
  mongoose.model("Servico", ServicoSchema);
