import { parseISO, format, isValid } from 'date-fns'

export const localDateTime = (createdAt: string) => {
  const date = parseISO(createdAt + 'Z')

  if (!isValid(date)) {
    return '--.--.---- --.--'
  }
  return format(date, 'dd.MM.yyyy HH:mm')
}
