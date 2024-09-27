import React, { Dispatch, FC, useState } from 'react'

import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { BALANCE_SCHEMA } from './validation'
import TextInputControlled from '../../TextInput/TextInputControlled'
import { useWallet, WalletName } from '@aptos-labs/wallet-adapter-react'
import { AptosClient } from 'aptos'
import { InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk'
import { CustomButton } from '../../Button'
import { useEditReplenishBalanceMutation } from 'services/aptos/api'
import { enqueueSnackbar } from 'notistack'

interface IProps {
  setCheckedItem: Dispatch<React.SetStateAction<string>>
  balance: number
  currentRate: number
}

interface FormValues {
  reconnect: number
}

const Balance: FC<IProps> = ({ setCheckedItem, balance, currentRate }) => {
  const { connect, connected, network, isLoading, signAndSubmitTransaction } = useWallet()
  const [editBalance] = useEditReplenishBalanceMutation()
  const client = new AptosClient(network?.url || 'https://testnet.aptoslabs.com/v1')
  const [isActiveOperation, setIsActiveOperation] = useState<boolean>(false)
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(BALANCE_SCHEMA),
    mode: 'onBlur',
    defaultValues: {
      reconnect: 0,
    },
  })
  const onSubmit = async (data: FormValues) => {
    try {
      if (!connected) {
        await connect('Petra' as WalletName<'Petra'>)
      }
      setIsActiveOperation(true)
      const transaction: InputGenerateTransactionPayloadData = {
        function: '0x1::coin::transfer',
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
        functionArguments: ['0xc67044854aaa3a0f63f6ee3fa727330702856194d9a6bfcdd65d1c72b0516198', data.reconnect / currentRate * 100000000],
      }
      const response = await signAndSubmitTransaction({
        data: transaction,
        options: {
          expireTimestamp: 1727427705,
        },
      })
      const resp = await client.waitForTransaction(response.hash)
      editBalance(response.hash).unwrap()
        .then(() => {
          enqueueSnackbar('The balance has been replenish', {
            variant: 'success',
            autoHideDuration: 3000,
          })
        })
        .catch(() => {
          enqueueSnackbar('Something went wrong. Try again later', {
            variant: 'error',
            autoHideDuration: 3000,
          })
        })
      setIsActiveOperation(false)
      setCheckedItem('')
    } catch (e) {
      setIsActiveOperation(false)
    }
  }
  const reconnect = watch('reconnect')
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}
    >

      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
      >
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '20px',
            textAlign: 'left',
          }}
        >
          Your current balance:
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 700,
            lineHeight: '20px',
            textAlign: 'left',
            mb: '20px',
          }}
        >
          {balance} REC
        </Typography>
        <TextInputControlled
          name="reconnect"
          label="Reconnect"
          type="number"
          errors={errors}
          control={control}
          sx={{
            '& input[type=number]': {
              '-moz-appearance': 'textfield',
              '&::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
              },
              '&::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
              },
            },
          }}
        />
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '20px',
            textAlign: 'left',
            mt: '20px',
          }}
        >
          Current rate:
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 700,
            lineHeight: '20px',
            textAlign: 'left',
            mb: '20px',

          }}
        >1 REC = {1 / currentRate} APT
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '20px',
            textAlign: 'left',
          }}
        >
          Aptos:
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 700,
            lineHeight: '20px',
            textAlign: 'left',

          }}
        >{reconnect / currentRate}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'end', gap: '20px' }}>
        <CustomButton sx={{ px: '40px' }} type="submit" disabled={isLoading || isActiveOperation}>
          Send
        </CustomButton>
        <CustomButton sx={{ px: '40px' }}
                      onClick={() => {
                        setCheckedItem('')
                      }}
                      color="warning">
          Cancel
        </CustomButton>
      </Box>
    </Box>)
}
export default Balance
