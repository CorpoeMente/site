import mongoose from "mongoose";

const ValorServicoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ValorServico ||
  mongoose.model("ValorServico", ValorServicoSchema);
