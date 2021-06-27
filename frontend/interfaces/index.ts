import { ReactNode } from "react";

export interface IChildren {
	children: ReactNode;
}

export interface IAddToCartProps {
	id: string;
}
export interface IPageProps {
	query: string;
}

export interface IImage {
	image: {
		publicUrlTransformed: string
	}
}

export interface IProduct {
	name: string;
	description: string;
	price: number;
	status: 'DRAFT' | 'AVAILABLE' | 'UNAVAILABLE';
	photo: IImage;
	id: string;
}