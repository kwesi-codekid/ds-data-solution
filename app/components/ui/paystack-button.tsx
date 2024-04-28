import { PaystackConsumer } from "react-paystack";
import { Button } from "@nextui-org/react";
import { useSubmit } from "@remix-run/react";
import { useState } from "react";
import { PaystackButtonProps } from "~/types";

const PaystackButton = ({ formData }: PaystackButtonProps) => {
  const [loading, setLoading] = useState(false);
  const submit = useSubmit();

  // you can call this function anything
  const handleSuccess = async () => {
    try {
      submit(
        {
          ...formData,
          path: location.pathname + location.search,
          intent: "checkout",
        },
        {
          method: "POST",
          replace: true,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // setLoading(false);
    // console.log("closed");
    try {
      submit(
        {
          ...formData,
          path: location.pathname + location.search,
          intent: "checkout",
        },
        {
          method: "POST",
          replace: true,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: formData.amount * 100,
    currency: "GHS",
    publicKey: "pk_live_ba594bba168142d7f38456c1c36f1055d58a6326",
  };

  const componentProps = {
    ...config,
    text: "Checkout",
    onSuccess: () => handleSuccess(),
    onClose: handleClose,
  };

  return (
    <PaystackConsumer {...componentProps}>
      {({ initializePayment }) => (
        <Button
          variant="solid"
          radius="lg"
          color="primary"
          className="font-semibold font-montserrat text-lg"
          isLoading={loading}
          onPress={() => {
            setLoading(true);
            initializePayment(handleSuccess, handleClose);
          }}
        >
          Checkout
        </Button>
      )}
    </PaystackConsumer>
  );
};

export default PaystackButton;
