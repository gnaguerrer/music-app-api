import { Schema, model } from 'mongoose';
import mongoosePagination from 'mongoose-paginate-v2';

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  image: {
    type: String,
    default: 'default.png'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

ArtistSchema.plugin(mongoosePagination);

export default model('Artist', ArtistSchema, 'artists');
