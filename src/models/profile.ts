import { model, Schema, Model } from "mongoose";
import { IProfile } from './interfaces/profile'

const ProfileSchema: Schema = new Schema(
    {
        uuid: { type: String },
        created_by: { type: Object },
        slug: { type: String },
        address: { type: String },
        card_number: { type: String },
        province_uuid: { type: String },
        city_uuid: { type: String },
        district_uuid: { type: String },
        phone: { type: String },
        email: { type: String },
        image: { type: String },
        roles: { type: Array },
        created_at: { type: Date },
        updated_at: { type: Date },
        deleted_at: { type: Date },
    }
);

ProfileSchema.index('user_uuid')
ProfileSchema.index('uuid')

const ProfileModel: Model<IProfile> = model(
    "profiles",
    ProfileSchema
);

export default ProfileModel;
