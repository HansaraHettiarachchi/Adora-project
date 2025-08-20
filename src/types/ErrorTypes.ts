
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

export type UserErr = {
    id?: string;
    fname?: string;
    lname?: string;
    address?: string;
    nic?: string;
    email?: string;
    password?: string;
    mobile?: string;
    user_role_id?: string;
    gender_id?: string;
    city_id?: string;
    status_id?: string;
    p_img?: string | null;
};
