import styled from "@emotion/styled";
import {
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useMutationCreateCustomer } from "../hooks/useMutationCreateCustomer";

const CreateCustomerWrapper = styled.div`
  h2 {
    margin-top: var(--space-5);
    margin-bottom: var(--space-5);
  }
`;

const FormControllWrapper = styled.div`
  display: flex;
  column-gap: var(--space-4);

  span {
    align-self: center;
  }
`;

function CreateCustomerForm({ onSuccess }: { onSuccess: () => void }) {
  const { customerCreated, loading, error, connectionError, createCustomer } =
    useMutationCreateCustomer();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [taxId, setTaxId] = useState<string>("");
  const [infos, setInfos] = useState<string>("");

  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);

  useEffect(() => {
    setOpenSuccess(customerCreated);
    if (customerCreated) {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerCreated]);

  useEffect(() => {
    setOpenError(connectionError);
  }, [connectionError]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    createCustomer({ firstName, lastName, taxId, infos });
  };

  const hasFieldError = useCallback(
    (fieldName: string): boolean => {
      if (!error) return false;

      return fieldName in error.errors;
    },
    [error]
  );

  const getErrortext = useCallback(
    (fieldName: string): string => {
      if (!error) return "";

      return error.errors[fieldName] ?? "";
    },
    [error]
  );

  return (
    <CreateCustomerWrapper>
      <h2>Jetzt Registrieren!</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            error={hasFieldError("firstName")}
            helperText={getErrortext("firstName")}
            type="text"
            variant="outlined"
            label="Vorname"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
            required
          />
          <TextField
            error={hasFieldError("lastName")}
            helperText={getErrortext("lastName")}
            type="text"
            variant="outlined"
            label="Nachname"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            fullWidth
            required
          />
        </Stack>
        <TextField
          error={hasFieldError("taxId")}
          helperText={getErrortext("taxId")}
          type="text"
          variant="outlined"
          label="Umsatzsteuer"
          onChange={(e) => setTaxId(e.target.value)}
          value={taxId}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          error={hasFieldError("infos")}
          helperText={getErrortext("infos")}
          type="text"
          variant="outlined"
          label="Zusätzliche Informationen"
          onChange={(e) => setInfos(e.target.value)}
          value={infos}
          multiline
          fullWidth
          inputProps={{ maxLength: 100 }}
          sx={{ mb: 4 }}
        />
        <FormControllWrapper>
          <Button variant="outlined" type="submit">
            Register
          </Button>
          {loading && <CircularProgress size="var(--icon-size-2)" />}
        </FormControllWrapper>
      </form>
      <Snackbar
        ContentProps={{
          sx: {
            background: "green",
          },
        }}
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        autoHideDuration={5000}
        message="Kunde wurde erfolgreich erstellt!"
      />
      <Snackbar
        ContentProps={{
          sx: {
            background: "red",
          },
        }}
        open={openError}
        onClose={() => setOpenError(false)}
        autoHideDuration={5000}
        message="Es konnte keine Verbindung zum Server hergestellt werden!"
      />
    </CreateCustomerWrapper>
  );
}

export default CreateCustomerForm;
