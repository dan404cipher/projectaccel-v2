import mongoose, { Schema } from 'mongoose';
import { ICounter } from '@/types';

/**
 * Counter schema for generating sequential IDs (e.g., WS0001, WS0002)
 */
const counterSchema = new Schema<ICounter>({
  _id: {
    type: String,
    required: true
  },
  sequence: {
    type: Number,
    default: 0,
    required: true
  }
}, {
  collection: 'counters'
});

// Static method to get next sequence number
counterSchema.statics.getNextSequence = async function(name: string): Promise<number> {
  const counter = await this.findByIdAndUpdate(
    name,
    { $inc: { sequence: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequence;
};

// Static method to generate workspace ID
counterSchema.statics.generateWorkspaceId = async function(): Promise<string> {
  const sequence = await this.getNextSequence('workspace');
  return `WS${sequence.toString().padStart(4, '0')}`;
};

const Counter = mongoose.model<ICounter>('Counter', counterSchema);

export default Counter;
