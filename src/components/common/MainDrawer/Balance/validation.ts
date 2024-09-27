import { requiredMessage } from 'validation'
import * as yup from 'yup'

export const BALANCE_SCHEMA = yup.object().shape({
  reconnect: yup.number().typeError('Must be a number').min(1, 'Min 1 rec').required(requiredMessage),
 })

