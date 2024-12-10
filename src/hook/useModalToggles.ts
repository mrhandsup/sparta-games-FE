import { useState, SetStateAction } from "react";
import useMouseClickClose from "./useMouseClickClose";

type TModalToggles = Record<string, boolean>;
type TModalRefs = Record<string, React.RefObject<HTMLDivElement>>;
type TModalToggleHandlers = Record<string, () => void>;

interface UseModalTogglesReturn {
  modalToggles: TModalToggles;
  modalRefs: TModalRefs;
  onClickModalToggleHandlers: TModalToggleHandlers;
}

const useModalToggles = (modalServices: string[]): UseModalTogglesReturn => {
  const [modalToggles, setModalToggles] = useState<TModalToggles>(
    modalServices.reduce(
      (acc, modalService) => ({
        ...acc,
        [modalService]: false,
      }),
      {} as TModalToggles,
    ),
  );

  const modalRefs = modalServices.reduce<TModalRefs>(
    (acc, modalService) => ({
      ...acc,
      [modalService]: useMouseClickClose(modalToggles[modalService], (newState: SetStateAction<boolean>) => {
        setModalToggles(
          (prev: TModalToggles): TModalToggles => ({
            ...prev,
            [modalService]:
              typeof newState === "function"
                ? (newState as (prevState: boolean) => boolean)(prev[modalService])
                : newState,
          }),
        );
      }).modalRef,
    }),
    {},
  );

  const onClickModalToggleHandlers = modalServices.reduce<TModalToggleHandlers>(
    (acc, modalService) => ({
      ...acc,
      [modalService]: () => {
        setModalToggles(
          (prev: TModalToggles): TModalToggles => ({
            ...prev,
            [modalService]: !prev[modalService],
          }),
        );
      },
    }),
    {},
  );

  return { modalToggles, modalRefs, onClickModalToggleHandlers };
};

export default useModalToggles;
