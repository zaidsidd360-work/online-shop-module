export const dummyData = [
	{
		id: 1,
		name: "Honeywell FC100A1011",
		price: 33.62,
		brand: "Honeywell",
		size: "20x20x4",
		imageUrl:
			"https://core-catalog.s3.us-west-2.amazonaws.com/primary_image5KdoFn90qNHwe8VLQ2g40PBNFK3Kelwr7juF91rI.jpg",
	},
	{
		id: 2,
		name: "Honeywell FC100A1003",
		price: 33.41,
		brand: "Honeywell",
		size: "16x20x4",
		imageUrl:
			"https://core-catalog.s3.us-west-2.amazonaws.com/primary_imagelkHGxGlsoitZffRIsTzQisO7drapCWb4AYBZ0tZK.jpg",
	},
	{
		id: 3,
		name: "Honeywell FC100A1029",
		price: 33.41,
		brand: "Honeywell",
		size: "16x25x4",
		imageUrl:
			"https://d2h0dcnbiyul9d.cloudfront.net/primary_image/primary-image-HONEYWELLFC100A1029.jpg",
	},
	{
		id: 4,
		name: "3M Filtrete Basic",
		price: 20.75,
		brand: "3M",
		size: "14x14x1",
		imageUrl:
			"https://core-catalog.s3.us-west-2.amazonaws.com/primary_image73DGNG40uVyNXYSJZNJz68uADOTIkWYdnwusxHTr.jpg",
	},
	{
		id: 5,
		name: "3M Filtrete Advanced",
		price: 29.99,
		brand: "3M",
		size: "16x20x1",
		imageUrl:
			"https://d2h0dcnbiyul9d.cloudfront.net/primary_image/primary-image-HONEYWELLFC200E1003.jpeg",
	},
	{
		id: 6,
		name: "Nordic Pure MERV 12",
		price: 40.5,
		brand: "Nordic Pure",
		size: "20x25x1",
		imageUrl:
			"https://d2h0dcnbiyul9d.cloudfront.net/primary_image/primary-image-HONEYWELLFC200E1011.jpeg",
	},
	{
		id: 7,
		name: "Lennox X6664",
		price: 25.49,
		brand: "Lennox",
		size: "14x25x1",
		imageUrl:
			"https://d2h0dcnbiyul9d.cloudfront.net/primary_image/primary-image-X6672.jpeg",
	},
	{
		id: 8,
		name: "Lennox Y6606",
		price: 35.99,
		brand: "FilterBuy",
		size: "20x30x1",
		imageUrl:
			"https://d2h0dcnbiyul9d.cloudfront.net/primary_image/primary-image-X6672.jpeg",
	},
	{
		id: 9,
		name: "FilterBuy Platinum",
		price: 45.5,
		brand: "FilterBuy",
		size: "24x24x1",
		imageUrl: "https://picsum.photos/200?random=9",
	},
	{
		id: 10,
		name: "Aerostar Pleated Filter",
		price: 15.99,
		brand: "Aerostar",
		size: "20x20x1",
		imageUrl: "https://picsum.photos/200?random=10",
	},
];

export const dummyDataMembership = [
	{
		id: 1,
		name: "Comfort+ Membership",
		price: 24.95,
		brand: "Honeywell",
		size: "20x20x4",
		imageUrl:
			"https://s3.amazonaws.com/hvaccom-contractor/company_4169_21c81bcc3359f43c507e60a2b517f23e/4871202.png/JjSjc80L7rtWDzROZyfmRmoGaYk7P4xhGINpKw50.png?1715704431",
	},
	{
		id: 2,
		name: "Generator+ Membership",
		price: 899,
		brand: "Honeywell",
		size: "16x20x4",
		imageUrl:
			"https://s3.amazonaws.com/hvaccom-contractor/company_4169_21c81bcc3359f43c507e60a2b517f23e/5279866.png/r58L9y8qrZ3DFcEJIV0ICuoPdFxZIh1wYNYumu23.png?1731110636",
	},
	{
		id: 3,
		name: "$94 HVAC PTU",
		price: 94.0,
		brand: "Honeywell",
		size: "16x25x4",
		imageUrl:
			"https://s3.amazonaws.com/hvaccom-contractor/company_4169_21c81bcc3359f43c507e60a2b517f23e/5214959.jpg/0B4kVrVne9301TONBQJhEfAJaebEwLYtzXzYEeBb.jpg?1727737806",
	},
];

export interface CartItem {
	item: {
		id: number;
		name: string;
		price: number;
		brand: string;
		size: string;
		imageUrl: string;
	};
	quantity: number;
}

export type Option = {
	title: string;
	subtext: string;
	nextStep: string;
};

type Field = {
	fieldname: string;
	type: "text" | "phone" | "email" | "number" | "textarea" | "select";
	required: boolean;
	options?: string[];
};

type FormStep = {
	question: string;
	options?: Option[];
	fields?: Field[];
	nextStep?: string;
};

export type FormSteps = {
	[stepname: string]: FormStep;
};

export const steps: FormSteps = {
	start: {
		question: "Please provide your details",
		fields: [
			{ fieldname: "Full Name", type: "text", required: true },
			{ fieldname: "Address", type: "text", required: true },
			{ fieldname: "Zip Code", type: "text", required: true },
			{
				fieldname: "HVAC Model",
				type: "select",
				options: ["Model A", "Model B", "Model C", "Model D"],
				required: true,
			},
			{
				fieldname: "Additional Comments",
				type: "textarea",
				required: false,
			},
		],
		nextStep: "contactPreferenceStep",
	},
	contactPreferenceStep: {
		question: "How do you prefer to be contacted?",
		options: [
			{
				title: "Phone",
				subtext: "We will call you",
				nextStep: "phoneStep",
			},
			{
				title: "Email",
				subtext: "We will email you",
				nextStep: "emailStep",
			},
		],
	},
	phoneStep: {
		question: "Please enter your phone number",
		fields: [{ fieldname: "Phone Number", type: "phone", required: true }],
		nextStep: "confirmStep",
	},
	emailStep: {
		question: "Please enter your email address",
		fields: [{ fieldname: "Email Address", type: "email", required: true }],
		nextStep: "confirmStep",
	},
	confirmStep: {
		question: "Do you want to subscribe to our newsletter?",
		options: [
			{ title: "Yes", subtext: "Subscribe me", nextStep: "thanksStep" },
			{ title: "No", subtext: "No thanks", nextStep: "thanksStep" },
		],
	},
	thanksStep: {
		question: "Thank you for completing the form!",
	},
};
