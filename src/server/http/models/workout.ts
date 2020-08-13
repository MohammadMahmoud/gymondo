import { Schema, Document, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { v4 } from 'uuid';

export interface IWorkout extends Document {
  name: string;
  description: string;
  startDate: Date;
  category: string;
  image: string;
}

const WorkoutSchema: Schema = new Schema({
  _id: {
    type: String,
    default: () => v4(),
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

WorkoutSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

WorkoutSchema.plugin(mongoosePaginate);

export default model<IWorkout & Document>('Workout', WorkoutSchema, 'workouts');
