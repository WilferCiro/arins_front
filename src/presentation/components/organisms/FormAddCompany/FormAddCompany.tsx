import { Alert, Space } from "@mantine/core";
import FormModal from "../FormModal";
import { IconPlus } from "@tabler/icons-react";
import { useAuth } from "@/presentation/context/ContextAuth";
import { useAccess } from "@/presentation/context/ContextAccess";
import { useMemo } from "react";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { useRouter } from "next/navigation";
import { getCompaniesFormAdd } from "@/data/forms/companies.form";
import { useMutation } from "react-query";
import {
  addCompanyService,
  getAccessCompanyService,
} from "@/data/services/companies.services";
import { refetchTokenService } from "@/data/services/auth.services";
import { notifications } from "@mantine/notifications";
import { CompanyAccessSchema } from "@/domain/schemas/CompanySchema";

interface Props {
  showMessage?: boolean;
  opened: boolean;
  onClose: () => void;
}

const FormAddCompany = ({ showMessage, opened, onClose }: Props) => {
  const { login } = useAuth();
  const { setAccess } = useAccess();
  const fieldsForm = useMemo(() => getCompaniesFormAdd(), []);
  const { form } = useCustomForm(fieldsForm);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: addCompanyService,
  });

  const mutationToken = useMutation({
    mutationFn: refetchTokenService,
    onSuccess: (result: { token: string } | null) => {
      if (result?.token) {
        notifications.show({
          color: "green",
          title: "Acción exitosa",
          message: `Se han agregado la empresa exitosamente`,
        });
        login(result.token);
      }
    },
  });

  const mutationAccess = useMutation({
    mutationFn: getAccessCompanyService,
    onSuccess: (result: CompanyAccessSchema | null) => {
      setAccess(result);
      router.push("/customer/");
    },
  });

  const onAccept = async (): Promise<boolean> => {
    await form.trigger();
    const valid = form.formState.isValid;
    if (!valid) {
      return false;
    }
    const values = form.getValues();

    const final = await mutation.mutateAsync(values);
    if (final) {
      const token = await mutationToken.mutateAsync(final._id);
      if (token) {
        await mutationAccess.mutateAsync();
      }
    }
    return !!final;
  };

  return (
    <FormModal
      opened={opened}
      onClose={onClose}
      onAccept={onAccept}
      fields={fieldsForm}
      form={form}
      title={"Agregar empresa"}
      aditionalComponentTop={
        showMessage ? (
          <>
            <Alert color="yellow" title="¡Nueva empresa!" icon={<IconPlus />}>
              Aún no has creado una empresa, crea una y disfruta de nuestros
              grandes beneficios, tendrás 7 días de demostración
            </Alert>
            <Space m="lg" />
          </>
        ) : (
          <></>
        )
      }
    />
  );
};

export default FormAddCompany;
