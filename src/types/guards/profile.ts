import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';

export type Profile = {
    id: string,
    name: string,
    age: number,
    profile: ImageSourcePropType
}