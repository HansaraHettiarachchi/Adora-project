export type User = {
    id: number;
    fname: string;
    lname: string;
    address: string;
    nic: string;
    email: string;
    password: string;
    mobile: string;
    user_role_id: number;
    gender_id: number;
    city_id: number;
    status_id: number;
    p_img?: string | null;
};

export type Gender = {
    id: number;
    name: string;
};

export type Status = {
    id: number;
    name: string;
};

export type UserRole = {
    id: number;
    name: string;
};

export type City = {
    id: number;
    name: string;
};