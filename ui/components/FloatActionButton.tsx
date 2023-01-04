import Button from "./Button";
import { Plus } from "phosphor-react";
import styles from "./FloatActionButton.module.scss";
interface Props {
  handler: VoidFunction;
}
const FloatActionButton = ({ handler }: Props) => {
  return (
    <aside>
      <Button handler={handler} className={styles.FloatActionButton}>
        <Plus size={32} color={"#fff"} />
      </Button>
    </aside>
  );
};
export default FloatActionButton;
