import { v2 } from 'cloudinary';
import { CLOUDINARY } from '@config/cloudinary';
import configuration from '@config/configuration';

export const CloudinaryProvider = {
    provide: CLOUDINARY,
    useFactory: () => {
        return v2.config({
            cloud_name: configuration().cloudinary.cloudName,
            api_key: configuration().cloudinary.apiKey,
            api_secret: configuration().cloudinary.apiSecret,
        });
    },
};
