const mongoose = require("mongoose");
const { Schema } = mongoose;
//https://github.com/mllumiquinga194/api/blob/master/controllers/album.js
const CommentSchema = new Schema(
  {
    id_Omdb: { type: String, required: true },
    user: {
      //va a guardar un ID de un objeto o un documento de la base de datos y ese objeto va a ser de tipo User
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" //el va a reconocer que es de User y relacionara un objeto con otro
    },
    comment: { type: String, required: true },
    post: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
