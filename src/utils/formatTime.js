import { format, getTime, formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy', { locale: vi })
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm', { locale: vi })
}

export function fTimestamp(date) {
  return getTime(new Date(date), { locale: vi })
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p', { locale: vi })
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: vi,
  })
}
