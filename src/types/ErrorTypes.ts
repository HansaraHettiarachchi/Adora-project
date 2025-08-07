
export type UserErrors = {
    name: string;
    nic: string;
    email: string;
    password: string;
    userCode: string;
    mobile: string;
    address: string;
    isActive: string;
    statusId: string;
    userRolesId: string;
    genderId: string;
    gender: string;
    dob?: string;
    occupation?: string;
    userRole: string;
};

export type MembershipErr = {
    id?: string,
    name: string,
    price: string,
    content: string,
    duration: string,
    isActive?: boolean,
    status_id?: number,
}         