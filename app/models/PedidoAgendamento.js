import mongoose from "mongoose";
const PedidoAgendamentoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telefone: {
      type: String,
      required: true,
    },
    servico: {
      type: String,
      required: true,
    },
    mensagem: {
      type: String,
      required: true,
    },
    data: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PedidoAgendamento ||
  mongoose.model("PedidoAgendamento", PedidoAgendamentoSchema);
