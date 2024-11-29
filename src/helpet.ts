export const dummyData = [
	{
		id: 1,
		name: "Honeywell FC100A1011",
		price: 33.62,
		brand: "Honeywell",
		size: "20x20x4",
		imageUrl: "https://picsum.photos/200?random=1",
	},
	{
		id: 2,
		name: "Honeywell FC100A1003",
		price: 33.41,
		brand: "Honeywell",
		size: "16x20x4",
		imageUrl: "https://picsum.photos/200?random=2",
	},
	{
		id: 3,
		name: "Honeywell FC100A1029",
		price: 33.41,
		brand: "Honeywell",
		size: "16x25x4",
		imageUrl: "https://picsum.photos/200?random=3",
	},
	{
		id: 4,
		name: "3M Filtrete Basic",
		price: 20.75,
		brand: "3M",
		size: "14x14x1",
		imageUrl: "https://picsum.photos/200?random=4",
	},
	{
		id: 5,
		name: "3M Filtrete Advanced",
		price: 29.99,
		brand: "3M",
		size: "16x20x1",
		imageUrl: "https://picsum.photos/200?random=5",
	},
	{
		id: 6,
		name: "Nordic Pure MERV 12",
		price: 40.5,
		brand: "Nordic Pure",
		size: "20x25x1",
		imageUrl: "https://picsum.photos/200?random=6",
	},
	{
		id: 7,
		name: "Nordic Pure MERV 8",
		price: 25.49,
		brand: "Nordic Pure",
		size: "14x25x1",
		imageUrl: "https://picsum.photos/200?random=7",
	},
	{
		id: 8,
		name: "FilterBuy Gold",
		price: 35.99,
		brand: "FilterBuy",
		size: "20x30x1",
		imageUrl: "https://picsum.photos/200?random=8",
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
