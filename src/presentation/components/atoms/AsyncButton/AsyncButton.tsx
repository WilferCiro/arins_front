// Nextjs and react
import { ReactElement, useState } from "react";

// Mantine
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

// Web3

// Custom

interface Props {
  label: string;
  onClick: () => Promise<boolean | void>;
  leftIcon?: ReactElement;
  disabled?: boolean;
  color?: string;
  fullWidth?: boolean;
  showError?: boolean;
  variant?: string;
}

const AsyncButton = ({
  label,
  onClick,
  leftIcon,
  disabled,
  color,
  fullWidth,
  showError,
  ...props
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const buttonClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } catch (e) {
      console.log(e);
      if (showError) {
        notifications.show({
          color: "red",
          title: `Error al ejecutar la acción`,
          message: `${e}`,
        });
      }
    }
    setLoading(false);
  };

  return (
    <Button
      onClick={buttonClick}
      leftSection={leftIcon}
      loading={loading}
      disabled={disabled}
      color={color}
      fullWidth={fullWidth || false}
      {...props}
    >
      {label}
    </Button>
  );
};

export default AsyncButton;
