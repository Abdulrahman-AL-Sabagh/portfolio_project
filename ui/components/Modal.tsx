import styles from "./Modal.module.scss";
const Modal = ({
  open,
  children,
  title,
}: {
  title: string;
  open: boolean;
  children: JSX.Element[];
}) => {
  console.log(open);
  return open ? (
    <div className={styles.Modal}>
      <h1>{title}</h1> {children}
    </div>
  ) : null;
};

export default Modal;
