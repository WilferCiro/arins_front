import { refetchTokenService } from "@/data/services/auth.services";
import { useAuth } from "@/presentation/context/ContextAuth";
import { Button, Combobox, Group, useCombobox } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import FormAddCompany from "../../organisms/FormAddCompany";
import { useDisclosure } from "@mantine/hooks";

const CompanySelector = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { currentCompany, tokenData, login } = useAuth();
  const router = useRouter();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const mutation = useMutation({
    mutationFn: refetchTokenService,
    onSuccess: (result: { token: string } | null) => {
      if (result?.token) {
        login(result.token);
        router.push("/customer");
      }
    },
  });

  return (
    <>
      <FormAddCompany opened={opened} onClose={close} />
      <Combobox
        store={combobox}
        width={250}
        position="bottom-start"
        withArrow
        onOptionSubmit={async (val) => {
          await mutation.mutateAsync(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <Button onClick={() => combobox.toggleDropdown()} variant="light">
            {currentCompany?.name}
          </Button>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {(tokenData?.companies || []).map((company) => {
              return (
                <Combobox.Option
                  value={company._id}
                  key={company._id}
                  active={company.active}
                >
                  {company.name}
                </Combobox.Option>
              );
            })}
          </Combobox.Options>
          <Combobox.Footer>
            <Button variant="light" color="green" onClick={open}>
              <Group>
                <IconPlus /> Agregar compañía
              </Group>
            </Button>
          </Combobox.Footer>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};

export default CompanySelector;
