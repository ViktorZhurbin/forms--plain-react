import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useParams } from "wouter";
import { FormFields } from "~/components/FormFields/FormFields";
import { NavButtons } from "~/components/NavButtons/NavButtons";
import { db } from "~/models/db";
import styles from "./Preview.module.css";
import { FetchError } from "~/components/FetchError/FetchError";

type PreviewProps = {
	onClose: () => void;
};

export const Preview = ({ onClose }: PreviewProps) => {
	const [step, setStep] = useState(0);
	const formId = useParams()?.id ?? "440f17cc-35ba-4ed2-8a0e-46ffa8b0e3d5";

	const { isLoading, error, data } = db.useQuery({
		questions: {
			$: { where: { formId } },
		},
	});

	if (isLoading) {
		return <div>Fetching data...</div>;
	}

	if (error) {
		return <FetchError message={error.message} />;
	}

	const isFirstStep = step === 0;
	const isLastStep = step === data.questions.length - 1;

	const goToPreviousStep = () => {
		if (isFirstStep) return;

		setStep((step) => step - 1);
	};

	const goToNextStep = () => {
		if (isLastStep) return;

		setStep((step) => step + 1);
	};

	const handleSubmit = () => {
		console.log("submit");
	};

	return (
		<div className={styles.root}>
			<FormFields
				step={step}
				questions={data.questions}
				onSubmit={handleSubmit}
				goToNextStep={goToNextStep}
			/>

			<Button
				color="rgb(31, 41, 55)"
				leftSection={<IconX />}
				className={styles.exitButton}
				onClick={onClose}
			>
				Exit preview
			</Button>

			<NavButtons
				className={styles.navigation}
				isPrevDisabled={isFirstStep}
				isNextDisabled={isLastStep}
				onClickPrev={goToPreviousStep}
				onClickNext={goToNextStep}
			/>
		</div>
	);
};
