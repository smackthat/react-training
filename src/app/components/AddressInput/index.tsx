import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Address } from 'types/User';

interface Props {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
}
export function AddressInput({ address, setAddress }: Props) {
  const { t } = useTranslation();

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, street: e.target.value });
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, zipCode: e.target.value });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, city: e.target.value });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          value={address?.street}
          onChange={handleStreetChange}
          label={t('address.address')}
        ></TextField>
      </Grid>
      <Grid item xs={6} md={2}>
        <TextField
          value={address.zipCode ?? ''}
          type="number"
          InputProps={{
            inputProps: {
              max: 10000,
            },
          }}
          onChange={handleZipCodeChange}
          label={t('address.zipCode')}
        ></TextField>
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          value={address?.city}
          onChange={handleCityChange}
          label={t('address.city')}
        ></TextField>
      </Grid>
    </Grid>
  );
}
