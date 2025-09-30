import mongoose from 'mongoose';
import { IInvite } from '@/types';
declare const Invite: mongoose.Model<IInvite, {}, {}, {}, mongoose.Document<unknown, {}, IInvite, {}, {}> & IInvite & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Invite;
//# sourceMappingURL=Invite.d.ts.map