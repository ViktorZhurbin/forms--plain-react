import { Textarea } from "@mantine/core";
import { clx } from "~/utils/classNames";
import styles from "./EditableButtonOld.module.css";
import { variantsMap } from "./constants";
import type { EditableButtonOldProps } from "./types";

export const EditableButtonOld = ({
	variant = "outline",
	readOnly,
	buttonText,
	classNames,
	onClick,
	onChange,
}: EditableButtonOldProps) => {
	const handleClickButton = () => {
		if (readOnly) {
			onClick?.();
		}
	};

	const { inputVariant } = variantsMap[variant];

	return (
		<Textarea
			autosize
			pointer={readOnly}
			readOnly={readOnly}
			value={buttonText}
			variant={inputVariant}
			classNames={{
				input: clx(styles.textInput, styles[variant], classNames?.textInput),
			}}
			onChange={(event) => {
				onChange?.(event.currentTarget.value);
			}}
			onClick={handleClickButton}
		/>
	);
};
