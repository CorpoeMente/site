import mongoose from "mongoose";

const ExperienciaProfissionalSchema = new mongoose.Schema(
  {
    title: {
      type: "String",
      required: true,
    },
    date: {
      type: "String",
      required: true,
    },
    text: {
      type: "String",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ExperienciaProfissional ||
  mongoose.model("ExperienciaProfissional", ExperienciaProfissionalSchema);
