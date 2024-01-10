import { Group, Pagination, Select, Text } from "@mantine/core";
import styles from "./styles.module.css";

const countOptions = ["10", "20", "40", "50"];
interface Props {
  page: number;
  count: number;
  total: number;
  changePage: (page: number) => void;
  changeCount: (count: number) => void;
}
const CustomTableFooter = ({
  page,
  count,
  total,
  changePage,
  changeCount,
}: Props) => {
  return (
    <Group className={styles.footer_options} justify="space-between">
      <div>
        <p>
          {count * (page - 1) + 1} a{" "}
          {total < count * page ? total : count * page} de {total}
        </p>
      </div>
      {Math.ceil((total || 0) / count) > 1 && (
        <Pagination
          value={page}
          onChange={changePage}
          total={Math.ceil((total || 0) / count)}
        />
      )}
      <Group>
        Items Por página
        <Select
          value={`${count}`}
          onChange={(val: string | null) => changeCount(parseInt(val || "10"))}
          data={countOptions}
          className={styles.select_count}
        />{" "}
      </Group>
    </Group>
  );
};

export default CustomTableFooter;
