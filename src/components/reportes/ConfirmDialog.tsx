import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren, useRef } from "react";

interface ConfirmDialogProps {
  disclosure: { isOpen: any; onOpen: any; onClose: any };
  title: string;
  description: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  confirmAction: any;
}

const ConfirmDialog: FunctionComponent<
  PropsWithChildren<ConfirmDialogProps>
> = (props) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={props.disclosure.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.disclosure.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {props.title}
          </AlertDialogHeader>

          <AlertDialogBody>{props.description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.disclosure.onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme={props.confirmButtonColor || "red"}
              onClick={props.confirmAction}
              ml={3}
            >
              {props.confirmButtonText || "Eliminar"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDialog;
