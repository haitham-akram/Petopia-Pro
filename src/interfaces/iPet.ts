interface IPet {
    ownerId: string;
    petName: string;
    type: number;
    petImage?: string;
    dob: string;
    gender: number;
    healthStatus: string;
    adoptionStatus: string;
}
// this interface for update
interface PetData {
    ownerId: string;
    petName?: string;
    type?: number;
    petImage?: string;
    dob?: string;
    gender?: number;
    healthStatus?: string;
    adoptionStatus?: string;
}
export { IPet, PetData }