import dayjs from 'dayjs'

const getFullDate = (date: string | number | Date | dayjs.Dayjs | null | undefined) => dayjs(date).format('DD/MM/YYYY HH:mm')

export default getFullDate
