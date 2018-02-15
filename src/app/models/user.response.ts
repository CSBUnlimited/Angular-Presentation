import { UserVM } from './user.vm';

export interface UserResponse
 {
        userVM: UserVM[];
        isSuccess: boolean;
        status: number;
 }