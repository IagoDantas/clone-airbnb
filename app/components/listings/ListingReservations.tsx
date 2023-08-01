'use client'

import { Range } from 'react-date-range'
import { Calendar } from '../inputs/Calendar';
import { Button } from '../Button';

interface ListingReservationsProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}
export function ListingReservations({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}: ListingReservationsProps) {
  return (
    <div
      className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'
    >
      <div
        className='flex flex-row items-center gap-1 p-4'
      >
        <div
          className='text-2xl font-semibold'
        >
          $ {price}
        </div>
        <div
          className='text-neutral-600 font-light'
        >
          / night
        </div>
      </div>
      <hr />
      <div>
        <div className='p-4'>
          <Button
            disabled={disabled}
            label='Reserve'
            onClick={onSubmit}
          />
        </div>
      </div>
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div
        className='flex flex-row items-center justify-between p-4 font-semibold text-lg'
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  )
}