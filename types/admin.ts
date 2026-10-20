export type AdminLoginResponse = {
  success: boolean;
  message: string;
  token?: string;
};

export type BookingItem = {
  id: number;
  bookingCode: string;
  passengerName: string;
  passengerPhone: string;
  routeName?: string;
  departureTime?: string;
  seatCount: number;
  totalFare: number;
  status?: string;
};

export type BookingListResponse = {
  success: boolean;
  message?: string;
  data?: {
    items: BookingItem[];
    total?: number;
  };
};

export type BookingDetail = {
  id: number;
  bookingCode: string;
  passengerName: string;
  passengerPhone: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  serviceType?: string;
  seatCount: number;
  totalFare: number;
  status?: string;
  routeName?: string;
  departureTime?: string;
};

export type BookingDetailResponse = {
  success: boolean;
  message?: string;
  data?: BookingDetail;
};

export type CreateBookingPayload = {
  fixedScheduleId: number;
  passengerName: string;
  passengerPhone: string;
  seatCount: number;
  serviceType: string;
  pickupAddress: string;
  dropoffAddress: string;
  isHighway: boolean;
  paymentMethod: string;
  customerNote: string;
};

export type CreateBookingResponse = {
  success: boolean;
  message: string;
  data?: {
    id: number;
    bookingCode: string;
    totalFare: number;
    availableSeatsLeft?: number;
  };
};

export type CancelBookingPayload = {
  cancelReason: string;
  isDriverFault: boolean;
};

export type CancelBookingResponse = {
  success: boolean;
  message: string;
  data?: {
    id: number;
    status: string;
    cancellationFee?: number;
  };
};