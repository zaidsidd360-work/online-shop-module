import React, { createContext, useEffect, useState } from "react";
import { Pool, Tile } from "../helpers/helper";

export interface FormState {
	selectedPool?: Pool;
	package?: "silver" | "gold";
	bioShield?: boolean;
	intelliChem?: boolean;
	selectedTile?: Tile;
	installTimeline?: string;
	builtInSpa?: boolean;
	fiberglassKnowledge?: "yes" | "no";
	sitePlan?: boolean;
	financing?: "yes" | "no";
	comment?: string;
	phoneCode?: string;
	customerInfo?: {
		name: string;
		email: string;
		phone: string;
		address: string;
		city: string;
		state: string;
		zip: string;
	};
}

interface FormStateContext {
	formState: FormState | undefined;
	setFormState: React.Dispatch<React.SetStateAction<FormState | undefined>>;
	currStep: number;
	setCurrStep: React.Dispatch<React.SetStateAction<number>>;
}

const defaultContextValue: FormStateContext = {
	formState: {},
	setFormState: () => {},
	currStep: 1,
	setCurrStep: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const formStateContext = createContext(defaultContextValue);

const FormStateContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [formState, setFormState] = useState<FormState>();
	const [currStep, setCurrStep] = useState<number>(1);

	useEffect(() => {
		console.log(formState);
	}, [currStep]);

	console.log(formState);
	return (
		<formStateContext.Provider
			value={{ formState, setFormState, currStep, setCurrStep }}
		>
			{children}
		</formStateContext.Provider>
	);
};

export default FormStateContextProvider;
