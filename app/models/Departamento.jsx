import mongoose from "mongoose";

const DepartamentoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Departamento ||
  mongoose.model("Departamento", DepartamentoSchema);
