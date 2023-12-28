import { refetchTokenService } from "@/data/services/auth.services";
import { ContextAuth } from "@/presentation/context/ContextAuth";
import { Button, Combobox, Group, useCombobox } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";

const CompanySelector = () => {
  const { currentCompany, tokenData, login } = useContext(ContextAuth);
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
          <Button variant="light" color="green">
            <Group>
              <IconPlus /> Agregar compañía
            </Group>
          </Button>
        </Combobox.Footer>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default CompanySelector;
