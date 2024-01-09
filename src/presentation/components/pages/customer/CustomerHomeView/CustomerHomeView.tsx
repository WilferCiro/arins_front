"use client";
import { useRouter } from "next/navigation";

import { getCompaniesFormAdd } from "@/data/forms/companies.form";
import {
  addCompanyService,
  getAccessCompanyService,
} from "@/data/services/companies.services";
import { CompanyAccessSchema } from "@/domain/schemas/CompanySchema";
import FormModal from "@/presentation/components/organisms/FormModal";
import { useAuth } from "@/presentation/context/ContextAuth";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { Alert, Space } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import { useMemo } from "react";
import { useMutation } from "react-query";
import { refetchTokenService } from "@/data/services/auth.services";
import { useAccess } from "@/presentation/context/ContextAccess";

const CustomerHomeView = () => {
  const { tokenData, login } = useAuth();
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
    <>
      {!tokenData?.companies || (tokenData?.companies || [])?.length === 0 ? (
        <div>
          <FormModal
            opened={true}
            onClose={() => {}}
            onAccept={onAccept}
            fields={fieldsForm}
            form={form}
            title={"Agregar empresa"}
            aditionalComponentTop={
              <>
                <Alert
                  color="yellow"
                  title="¡Nueva empresa!"
                  icon={<IconPlus />}
                >
                  Aún no has creado una empresa, crea una y disfruta de nuestros
                  grandes beneficios, tendrás 7 días de demostración
                </Alert>
                <Space m="lg" />
              </>
            }
          />
        </div>
      ) : (
        <Image
          src={"/images/explain.svg"}
          alt={"Flujo de arins"}
          width={"921"}
          height={"525"}
          style={{
            display: "block",
            margin: "auto",
            maxWidth: "100%",
            height: "auto",
          }}
        />
      )}
    </>
  );
};

export default CustomerHomeView;
