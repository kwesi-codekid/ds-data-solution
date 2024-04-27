import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Form, useNavigation, useSubmit } from "@remix-run/react";
import { useEffect } from "react";

const CreateRecordModal = ({
  isOpen,
  onOpenChange,
  onCloseModal,
  title,
  actionText,
  children,
  size,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCloseModal: () => void;
  title: string;
  actionText: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}) => {
  const submit = useSubmit();

  // state to handle loading
  const navigation = useNavigation();
  const isLoading =
    navigation.state === "submitting" || navigation.state === "loading";

  // function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formValues: { [key: string]: string } = {};

      for (const [key, value] of formData.entries()) {
        formValues[key] = value as string;
      }

      submit(
        {
          path: location.pathname + location.search,
          intent: "create",
          ...formValues,
        },
        {
          method: "POST",
          replace: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (navigation.state === "idle") {
      onCloseModal();
    }
  }, [navigation, onCloseModal]);

  return (
    <Modal
      size={size}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onCloseModal}
      backdrop="opaque"
      motionProps={{
        variants: {
          enter: {
            scale: [1, 0.9],
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            scale: [0.9, 1],
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <Form
                method={"POST"}
                id="create-record-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                {children}
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onCloseModal}>
                Cancel
              </Button>
              <Button
                color="primary"
                isLoading={isLoading}
                type="submit"
                form="create-record-form"
                className="font-montserrat font-medium"
              >
                {actionText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateRecordModal;
