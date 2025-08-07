import type { ReactNode } from "react";

export type User = {
    id?: number;
    name: string;
    nic: string;
    email: string;
    password: string;
    userCode: string;
    mobile: string;
    address: string;
    isActive: boolean;
    statusId: number;
    userRolesId: number;
    genderId: number;
    dob?: string;
    occupation?: string;
    profileImage?: string;
    userRoles: CommonIdName;
    status: CommonIdName;
    gender: CommonIdName;
};

export type CommonIdName = {
    id: number;
    name: string
};

export interface DecodedUserData {
    userId: string;
    email: string;
    roleId: number;
    username: string;
    status: number;
    exp?: number;
}


export interface AuthProps {
    children?: ReactNode;
}

export interface SignInProps {
    onSignUpClick?: () => void,
    afterSignUp?: () => void,
    navigationPath?: string
}

export type PaginatedData = {
    page: number;
    count: number;
    totalCount: number;
    filteredCount: number;
    draw: number;
    searchText: string
    data: User[];
}


export type Membership = {
    id?: number,
    name: string,
    price: number,
    content: string | React.ReactNode,
    duration: number,
    isActive?: boolean,
    status_id?: number,
    status?: CommonIdName
}

export type UsersHasPackages = {
    id?: number;
    dueDate?: string;
    paidDate?: string;
    isFree?: boolean;

    statusId?: number;
    packagesId?: number;
    usersId?: number;
    discountId?: number;

    status?: CommonIdName;
    packages?: Membership;
    users?: User;
    disocunt?: Discount;
}

export type Discount = {
    id: number;
    price: number;
    name: string;
}

export type PaymentData = {
    id?: number;
    desc: string;
    price: number;
    dueDate: string;
    discount: number;
    discount_id: number;
}