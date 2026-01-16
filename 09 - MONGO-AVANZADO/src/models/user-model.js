import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//modelo de usuario ↓↓↓
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    index: true,
  },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  mascotas: [
    {
      type: Schema.Types.ObjectId,
      ref: "pets",
      default: [],
    }
  ]
});

UserSchema.pre('find', function(){ //middleware aplicado al método find
  this.populate('mascotas'); //el this apunta al esquema de usuario y aplico el método 'populate' a mascotas
})

UserSchema.plugin(mongoosePaginate);

export const UserModel = model("users", UserSchema);